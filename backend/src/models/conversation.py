import sqlalchemy
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .user import Base  # Import Base from user.py

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    chapter_context = Column(Text)
    created_at = Column(DateTime, server_default=func.now())

    # Define relationship with User
    user = relationship("User", back_populates="conversations")

    from .message import Message
    messages = relationship("Message", back_populates="conversation")

# Add back_populates to User model if not already present
# In user.py, under class User(Base):
#    conversations = relationship("Conversation", back_populates="user")
