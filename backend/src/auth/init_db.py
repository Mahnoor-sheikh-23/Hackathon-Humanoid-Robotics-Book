"""
Database initialization for authentication tables
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from ..models import User, Conversation, Message, UserPreference  # Import all models to register them
from ..auth.database import Session  # Import session model
from ..models.base import Base  # Use the shared Base from models

def init_auth_db():
    """Create all authentication tables in the database"""
    # Get database URL from environment
    database_url = os.getenv("NEON_DATABASE_URL", os.getenv("DATABASE_URL"))

    if not database_url:
        raise ValueError("NEON_DATABASE_URL or DATABASE_URL environment variable is not set.")

    # Create engine
    engine = create_engine(database_url, pool_pre_ping=True)

    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("All tables created successfully!")

if __name__ == "__main__":
    init_auth_db()