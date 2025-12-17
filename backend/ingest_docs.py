import os
import sys
from dotenv import load_dotenv

# Add the backend directory to the path so we can import our modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from src.rag.document_processor import DocumentProcessor
from src.rag.qdrant_client import QdrantClient
from langchain_openai import OpenAIEmbeddings

def main():
    # Load environment variables
    load_dotenv()

    # Initialize components
    embeddings = OpenAIEmbeddings(
        model="text-embedding-3-small",  # OpenAI embedding model compatible with OpenRouter
        openai_api_key=os.getenv("OPENROUTER_API_KEY"),
        openai_api_base="https://openrouter.ai/api/v1"
    )

    qdrant_client = QdrantClient(
        url=os.getenv("QDRANT_URL"),
        api_key=os.getenv("QDRANT_API_KEY"),
        embeddings=embeddings
    )

    document_processor = DocumentProcessor(
        embeddings=embeddings,
        qdrant_client=qdrant_client
    )

    # Path to the documentation directory
    docs_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend", "docs")

    if not os.path.exists(docs_path):
        print(f"Documentation directory not found at: {docs_path}")
        print("Please make sure the docs directory exists with markdown files.")
        return

    print(f"Processing documents from: {docs_path}")

    try:
        # Process and store documents
        num_chunks = document_processor.process_and_store_documents(docs_path)
        print(f"Successfully processed and stored {num_chunks} document chunks in Qdrant.")
    except Exception as e:
        print(f"Error processing documents: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()