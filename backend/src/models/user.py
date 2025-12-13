import sqlalchemy
from sqlalchemy import Column, Integer, String, DateTime, Text, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    name = Column(String)
    profile_data = Column(JSON)
    created_at = Column(DateTime, server_default=func.now())

    from .conversation import Conversation
    conversations = relationship("Conversation", back_populates="user")

    from .user_preference import UserPreference
    user_preference = relationship("UserPreference", uselist=False, back_populates="user")

# Example of how to create tables (to be called from a migration script)
# from sqlalchemy import create_engine
# engine = create_engine(DATABASE_URL)
# Base.metadata.create_all(bind=engine)
