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
                # Default to 1536 for OpenAI embeddings (text-embedding-3-small)
                # For OpenAI text-embedding-3-small: 1536 dimensions
                # For OpenAI text-embedding-3-large: 3072 dimensions
                # For Google embeddings: typically 768 dimensions

                # Determine embedding size based on the model being used
                embedding_size = 1536  # Default for OpenAI text-embedding-3-small
                if hasattr(self.embeddings, 'model'):
                    model_name = getattr(self.embeddings, 'model', '').lower()
                    if 'text-embedding-3-large' in model_name:
                        embedding_size = 3072  # text-embedding-3-large
                    elif 'text-embedding-3-small' in model_name:
                        embedding_size = 1536  # text-embedding-3-small
                    elif 'text-embedding-ada-002' in model_name:
                        embedding_size = 1536  # text-embedding-ada-002
                    else:
                        embedding_size = 1536  # default for text-embedding-ada-002 or similar
                elif hasattr(self.embeddings, 'model_name'):
                    # For Google embeddings
                    model_name = getattr(self.embeddings, 'model_name', '').lower()
                    if '004' in model_name:
                        embedding_size = 768
                    elif '002' in model_name:
                        embedding_size = 768
                elif hasattr(self.embeddings, 'deployment'):
                    # For Azure OpenAI embeddings
                    deployment = getattr(self.embeddings, 'deployment', '').lower()
                    if 'large' in deployment:
                        embedding_size = 3072
                    else:
                        embedding_size = 1536

                self.client.create_collection(
                    collection_name=self.collection_name,
                    vectors_config=models.VectorParams(
                        size=embedding_size,
                        distance=models.Distance.COSINE
                    )
                )
                logger.info(f"Created collection: {self.collection_name} with vector size: {embedding_size}")
            else:
                # Check if the existing collection has the correct vector size
                collection_info = self.client.get_collection(self.collection_name)
                existing_size = collection_info.config.params.vectors.size

                # Determine expected embedding size based on the model being used
                expected_size = 1536  # Default for OpenAI text-embedding-3-small
                if hasattr(self.embeddings, 'model'):
                    model_name = getattr(self.embeddings, 'model', '').lower()
                    if 'text-embedding-3-large' in model_name:
                        expected_size = 3072  # text-embedding-3-large
                    elif 'text-embedding-3-small' in model_name:
                        expected_size = 1536  # text-embedding-3-small
                    elif 'text-embedding-ada-002' in model_name:
                        expected_size = 1536  # text-embedding-ada-002
                    else:
                        expected_size = 1536  # default for text-embedding-ada-002 or similar
                elif hasattr(self.embeddings, 'model_name'):
                    # For Google embeddings
                    model_name = getattr(self.embeddings, 'model_name', '').lower()
                    if '004' in model_name:
                        expected_size = 768
                    elif '002' in model_name:
                        expected_size = 768
                elif hasattr(self.embeddings, 'deployment'):
                    # For Azure OpenAI embeddings
                    deployment = getattr(self.embeddings, 'deployment', '').lower()
                    if 'large' in deployment:
                        expected_size = 3072
                    else:
                        expected_size = 1536

                if existing_size != expected_size:
                    logger.info(f"Collection {self.collection_name} exists with {existing_size} dimensions, but embeddings require {expected_size} dimensions. Recreating collection...")
                    # Delete the existing collection and create a new one
                    self.client.delete_collection(self.collection_name)

                    self.client.create_collection(
                        collection_name=self.collection_name,
                        vectors_config=models.VectorParams(
                            size=expected_size,
                            distance=models.Distance.COSINE
                        )
                    )
                    logger.info(f"Recreated collection: {self.collection_name} with vector size: {expected_size}")
                else:
                    logger.info(f"Collection {self.collection_name} already exists with correct vector size: {existing_size}")
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