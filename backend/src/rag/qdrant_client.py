import os
import logging
from typing import Optional, List
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient as QdrantClientOriginal
from qdrant_client.http import models
from langchain_core.documents import Document

logger = logging.getLogger(__name__)

class QdrantClient:
    def __init__(self, url: str, api_key: Optional[str] = None, collection_name: str = "humanoid_robotics_docs", embeddings=None):
        self.collection_name = collection_name
        self.embeddings = embeddings
        self._vector_store = None  # Initialize lazily

        # Initialize Qdrant client
        if api_key:
            self.client = QdrantClientOriginal(
                url=url,
                api_key=api_key,
                prefer_grpc=True
            )
        else:
            self.client = QdrantClientOriginal(
                url=url,
                prefer_grpc=True
            )

        # Create collection if it doesn't exist
        self._create_collection()

    @property
    def vector_store(self):
        """Lazily initialize the vector store when first accessed"""
        if self._vector_store is None:
            if self.embeddings is None:
                raise ValueError("Embeddings must be provided to initialize vector store")
            self._vector_store = QdrantVectorStore(
                client=self.client,
                collection_name=self.collection_name,
                embedding=self.embeddings,
            )
        return self._vector_store

    def _create_collection(self):
        """
        Create a collection in Qdrant if it doesn't exist
        """
        try:
            # Check if collection exists
            collections = self.client.get_collections()
            collection_names = [collection.name for collection in collections.collections]

            if self.collection_name not in collection_names:
                # Create collection with vector configuration
                # The size will be determined by the embedding model (Google embeddings are 768-dim)
                self.client.create_collection(
                    collection_name=self.collection_name,
                    vectors_config=models.VectorParams(
                        size=768,  # Size for Google text-embedding-004 model
                        distance=models.Distance.COSINE
                    )
                )
                logger.info(f"Created collection: {self.collection_name}")
            else:
                logger.info(f"Collection {self.collection_name} already exists")
        except Exception as e:
            logger.error(f"Error creating collection: {str(e)}")
            raise

    def as_retriever(self):
        """
        Return a retriever compatible with LangChain
        """
        return self.vector_store.as_retriever()

    def similarity_search(self, query: str, k: int = 5) -> List[Document]:
        """
        Perform similarity search
        """
        try:
            return self.vector_store.similarity_search(query, k=k)
        except Exception as e:
            logger.error(f"Error in similarity search: {str(e)}")
            raise

    def add_documents(self, documents: List[Document]):
        """
        Add documents to the collection
        """
        try:
            # Add documents using the LangChain wrapper
            self.vector_store.add_documents(documents)
            logger.info(f"Added documents to collection {self.collection_name}")
        except Exception as e:
            logger.error(f"Error adding documents: {str(e)}")
            raise