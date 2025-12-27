import sqlalchemy
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("conversations.id"), nullable=False)
    role = Column(String, nullable=False) # e.g., "user", "assistant"
    content = Column(Text, nullable=False)
    timestamp = Column(DateTime, server_default=func.now())

    # Define relationship with Conversation using string reference to avoid circular imports
    conversation = relationship("Conversation", back_populates="messages")

# Add back_populates to Conversation model if not already present
# In conversation.py, under class Conversation(Base):
#    messages = relationship("Message", back_populates="conversation")
