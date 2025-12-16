import os
import logging
from typing import List
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_core.documents import Document

logger = logging.getLogger(__name__)

class DocumentProcessor:
    def __init__(self, embeddings, qdrant_client, collection_name="humanoid_robotics_docs"):
        self.embeddings = embeddings
        self.qdrant_client = qdrant_client
        self.collection_name = collection_name

        # Initialize text splitter
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len,
        )

    def load_documents(self, directory_path: str) -> List[Document]:
        """
        Load documents from a directory
        """
        try:
            loader = DirectoryLoader(
                path=directory_path,
                glob="**/*.md",
                loader_cls=TextLoader,
                loader_kwargs={'encoding': 'utf-8'}
            )
            documents = loader.load()
            logger.info(f"Loaded {len(documents)} documents from {directory_path}")
            return documents
        except Exception as e:
            logger.error(f"Error loading documents: {str(e)}")
            raise

    def split_documents(self, documents: List[Document]) -> List[Document]:
        """
        Split documents into chunks
        """
        try:
            split_docs = self.text_splitter.split_documents(documents)
            logger.info(f"Split documents into {len(split_docs)} chunks")
            return split_docs
        except Exception as e:
            logger.error(f"Error splitting documents: {str(e)}")
            raise

    def add_documents_to_vector_store(self, documents: List[Document]):
        """
        Add documents to the vector store
        """
        try:
            # Add documents to Qdrant via the client
            self.qdrant_client.add_documents(documents)
            logger.info(f"Added documents to vector store")
        except Exception as e:
            logger.error(f"Error adding documents to vector store: {str(e)}")
            raise

    def process_and_store_documents(self, directory_path: str):
        """
        Complete pipeline: load, split, and store documents
        """
        try:
            # Load documents
            documents = self.load_documents(directory_path)

            # Split documents
            split_docs = self.split_documents(documents)

            # Add to vector store
            self.add_documents_to_vector_store(split_docs)

            logger.info("Document processing pipeline completed successfully")
            return len(split_docs)
        except Exception as e:
            logger.error(f"Error in document processing pipeline: {str(e)}")
            raise

    def similarity_search(self, query: str, k: int = 5) -> List[Document]:
        """
        Perform similarity search in the vector store
        """
        try:
            results = self.qdrant_client.similarity_search(query, k=k)
            logger.info(f"Found {len(results)} similar documents for query: {query[:50]}...")
            return results
        except Exception as e:
            logger.error(f"Error in similarity search: {str(e)}")
            raise