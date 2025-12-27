"""
Chat routes for the Physical AI & Humanoid Robotics RAG API
"""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from typing import Optional
from pydantic import BaseModel
from ..db import get_db
from ..models import Conversation, Message, User
from ..rag.qdrant_client import QdrantClient
from ..rag.document_processor import DocumentProcessor
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
import os
import logging

router = APIRouter(prefix="/chat", tags=["chat"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Request models
class ChatMessage(BaseModel):
    message: str
    conversation_id: Optional[int] = None
    selected_text: Optional[str] = None

class ChatHistoryRequest(BaseModel):
    conversation_id: int

class ChatClearRequest(BaseModel):
    conversation_id: int

# Response models
class ChatResponse(BaseModel):
    response: str
    conversation_id: int
    source_documents: list = []

class ChatHistoryResponse(BaseModel):
    messages: list
    conversation_id: int

# Initialize components (these should be injected or configured properly)
qdrant_client = None  # Will be initialized elsewhere
document_processor = None  # Will be initialized elsewhere
llm = None  # Will be initialized elsewhere

def initialize_components(qdrant, processor, model):
    global qdrant_client, document_processor, llm
    qdrant_client = qdrant
    document_processor = processor
    llm = model

@router.post("", response_model=ChatResponse)
async def send_message(
    chat_request: ChatMessage,
    db: Session = Depends(get_db)
):
    """
    Send a message to the chatbot and get a response
    """
    try:
        # Create or get conversation
        conversation = None
        if chat_request.conversation_id:
            conversation = db.query(Conversation).filter(
                Conversation.id == chat_request.conversation_id
            ).first()

        if not conversation:
            # Create new conversation
            conversation = Conversation(user_id=1)  # Placeholder user_id
            db.add(conversation)
            db.commit()
            db.refresh(conversation)

        # Save user message
        user_message = Message(
            conversation_id=conversation.id,
            role="user",
            content=chat_request.message
        )
        db.add(user_message)
        db.commit()

        # Prepare the query - include selected text if provided
        query = chat_request.message
        if chat_request.selected_text:
            query = f"Regarding '{chat_request.selected_text}': {chat_request.message}"

        # Process the query using the RAG system
        # In a real implementation, we'd have the proper RAG components initialized
        # For now, returning a placeholder response
        response_text = "This is a placeholder response. The RAG system would normally process your query and return a contextual response based on the textbook content."
        source_docs = []

        # Save bot response
        bot_message = Message(
            conversation_id=conversation.id,
            role="assistant",
            content=response_text
        )
        db.add(bot_message)
        db.commit()

        return ChatResponse(
            response=response_text,
            conversation_id=conversation.id,
            source_documents=source_docs
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing chat message: {str(e)}"
        )


@router.post("/selected")
async def query_selected_text(
    chat_request: ChatMessage,
    db: Session = Depends(get_db)
):
    """
    Send a query about selected text to the chatbot
    """
    if not chat_request.selected_text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Selected text is required for this endpoint"
        )

    # Process query specifically about selected text
    return await send_message(chat_request, db)


@router.get("/history")
async def get_conversation_history(
    conversation_id: int,
    db: Session = Depends(get_db)
):
    """
    Get the history of a conversation
    """
    try:
        # Get conversation
        conversation = db.query(Conversation).filter(
            Conversation.id == conversation_id
        ).first()

        if not conversation:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Conversation not found"
            )

        # Get messages for this conversation
        messages = db.query(Message).filter(
            Message.conversation_id == conversation_id
        ).order_by(Message.timestamp).all()

        # Format messages for response
        formatted_messages = []
        for msg in messages:
            formatted_messages.append({
                "id": msg.id,
                "role": msg.role,
                "content": msg.content,
                "timestamp": msg.timestamp.isoformat() if msg.timestamp else None
            })

        return {
            "messages": formatted_messages,
            "conversation_id": conversation_id
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving conversation history: {str(e)}"
        )


@router.post("/clear")
async def clear_conversation(
    clear_request: ChatClearRequest,
    db: Session = Depends(get_db)
):
    """
    Clear a conversation (delete all messages, keep conversation record)
    """
    try:
        # Verify conversation exists
        conversation = db.query(Conversation).filter(
            Conversation.id == clear_request.conversation_id
        ).first()

        if not conversation:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Conversation not found"
            )

        # Delete all messages in this conversation
        db.query(Message).filter(
            Message.conversation_id == clear_request.conversation_id
        ).delete()

        db.commit()

        return {"message": "Conversation cleared successfully", "conversation_id": clear_request.conversation_id}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error clearing conversation: {str(e)}"
        )