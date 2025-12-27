import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging
from src.rag.document_processor import DocumentProcessor
from src.rag.qdrant_client import QdrantClient
from src.auth.routes import router as auth_router
from src.routers.chat import router as chat_router
from src.routers.translation import router as translation_router
from src.routers.personalization import router as personalization_router
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableParallel
from operator import itemgetter
from langchain_core.prompts import PromptTemplate

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Physical AI & Humanoid Robotics RAG API",
    description="RAG API for Physical AI & Humanoid Robotics textbook",
    version="1.0.0"
)

# Include authentication routes
app.include_router(auth_router)

# Include chat routes
app.include_router(chat_router)

# Include translation routes
app.include_router(translation_router)

# Include personalization routes
app.include_router(personalization_router)

# Initialize database tables on startup
from src.auth.init_db import init_auth_db

# Import models to ensure they are registered with the Base
from src.models import User, Conversation, Message, UserPreference, Base
from src.auth.database import Session

# Import all models to ensure they're registered with SQLAlchemy before startup
import src.models.user
import src.models.conversation
import src.models.message
import src.models.user_preference

@app.on_event("startup")
def startup_event():
    """Initialize database tables on startup"""
    init_auth_db()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize components
try:
    # Initialize embeddings - using OpenAI compatible embeddings for OpenRouter
    from langchain_openai import OpenAIEmbeddings
    embeddings = OpenAIEmbeddings(
        model="text-embedding-3-small",  # OpenAI embedding model compatible with OpenRouter
        openai_api_key=os.getenv("OPENROUTER_API_KEY"),
        openai_api_base="https://openrouter.ai/api/v1"
    )

    # Initialize Qdrant client
    qdrant_client = QdrantClient(
        url=os.getenv("QDRANT_URL"),
        api_key=os.getenv("QDRANT_API_KEY"),
        embeddings=embeddings
    )

    # Initialize document processor
    document_processor = DocumentProcessor(
        embeddings=embeddings,
        qdrant_client=qdrant_client
    )

    # Initialize the language model with OpenRouter
    from langchain_openai import ChatOpenAI
    llm = ChatOpenAI(
        model="openai/gpt-3.5-turbo",  # Using a more cost-effective model
        openai_api_key=os.getenv("OPENROUTER_API_KEY"),
        openai_api_base="https://openrouter.ai/api/v1",
        temperature=0.7,
        max_tokens=1024  # Limit the response tokens to control costs
    )

    logger.info("RAG components initialized successfully")

    # Initialize QA chain lazily
    def get_qa_chain():
        # Create the prompt
        template = """You are an expert assistant for the Physical AI & Humanoid Robotics textbook. Use the following context to answer the question. If you don't know the answer, say 'I don't know based on the provided context.' Be concise and accurate.\n\nContext: {context}\n\nQuestion: {question}\n\nAnswer:"""
        prompt = ChatPromptTemplate.from_template(template)

        # Create the output parser
        output_parser = StrOutputParser()

        # Create the RAG chain
        retriever = qdrant_client.as_retriever()

        # Create the chain using the newer langchain approach
        setup_and_retrieval = RunnableParallel(
            {"context": itemgetter("question") | retriever, "question": itemgetter("question")}
        )

        chain = setup_and_retrieval | prompt | llm | output_parser

        return chain

except Exception as e:
    logger.error(f"Error initializing RAG components: {str(e)}")
    raise

# Request models
class QueryRequest(BaseModel):
    query: str

class ChatResponse(BaseModel):
    response: str
    source_documents: list = []

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Physical AI & Humanoid Robotics RAG API!"}

@app.post("/query", response_model=ChatResponse)
async def query_endpoint(request: QueryRequest):
    """
    Process a query against the RAG system and return the response
    """
    try:
        logger.info(f"Processing query: {request.query}")

        # Get the QA chain (this will initialize it when first called)
        qa_chain = get_qa_chain()

        # Get the retriever separately to access source documents
        retriever = qdrant_client.as_retriever()

        # Get relevant documents using the correct method for VectorStoreRetriever
        source_docs = retriever.invoke(request.query)

        # Process the query with the chain
        response_text = qa_chain.invoke({"question": request.query})

        # Extract source information
        sources = []
        for doc in source_docs:
            sources.append({
                "content": doc.page_content[:200] + "..." if len(doc.page_content) > 200 else doc.page_content,
                "metadata": doc.metadata
            })

        logger.info("Query processed successfully")

        return ChatResponse(
            response=response_text,
            source_documents=sources
        )

    except Exception as e:
        logger.error(f"Error processing query: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")

@app.get("/ping")
async def ping():
    """
    Simple ping endpoint to verify the API is running
    """
    return {"status": "ok"}

@app.post("/health")
async def health_check():
    """
    Health check endpoint to verify the API is running
    """
    return {"status": "healthy", "message": "RAG API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)