import sqlalchemy
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    chapter_context = Column(Text)
    created_at = Column(DateTime, server_default=func.now())

    # Define relationship with User using string reference to avoid circular imports
    user = relationship("User", back_populates="conversations")

    # Define relationship with Message using string reference to avoid circular imports
    messages = relationship("Message", back_populates="conversation")

# Add back_populates to User model if not already present
# In user.py, under class User(Base):
#    conversations = relationship("Conversation", back_populates="user")
