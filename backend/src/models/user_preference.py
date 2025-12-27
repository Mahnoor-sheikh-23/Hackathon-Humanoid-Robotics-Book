import sqlalchemy
from sqlalchemy import Column, Integer, ForeignKey, JSON, Text, String
from sqlalchemy.orm import relationship
from .base import Base

class UserPreference(Base):
    __tablename__ = "user_preferences"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, unique=True)
    personalization_settings = Column(JSON, default={})
    language_preference = Column(String, default="en")

    # Define relationship with User using string reference to avoid circular imports
    user = relationship("User", back_populates="user_preference")

# Add back_populates to User model if not already present
# In user.py, under class User(Base):
#    user_preference = relationship("UserPreference", uselist=False, back_populates="user")
