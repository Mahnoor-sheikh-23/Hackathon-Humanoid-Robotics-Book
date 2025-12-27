import sqlalchemy
from sqlalchemy import Column, Integer, String, DateTime, Text, JSON, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)

    # Username field - this will be added by the migration
    username = Column(String, unique=True, index=True, nullable=False)

    # Password field - will be renamed from hashed_password to password_hash by migration
    password_hash = Column(String, nullable=False)

    # Additional fields that will be added by migration
    name = Column(String, nullable=True)
    profile_data = Column(JSON, nullable=True)
    created_at = Column(DateTime, server_default=func.now(), nullable=True)
    updated_at = Column(DateTime, nullable=True)
    is_active = Column(Boolean, default=True, nullable=True)

    # Profile fields
    programming_experience = Column(Text, nullable=True)
    robotics_knowledge = Column(Text, nullable=True)
    hardware_availability = Column(Text, nullable=True)
    profile_completed = Column(Boolean, default=False, nullable=True)

    # Relationships using string references to avoid circular imports
    conversations = relationship("Conversation", back_populates="user")
    user_preference = relationship("UserPreference", uselist=False, back_populates="user")