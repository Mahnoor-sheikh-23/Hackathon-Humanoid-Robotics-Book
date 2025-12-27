import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from .models import Base  # Import Base from models package

load_dotenv()

DATABASE_URL = os.getenv("NEON_DATABASE_URL", os.getenv("DATABASE_URL"))

if not DATABASE_URL:
    raise ValueError("DATABASE_URL or NEON_DATABASE_URL environment variable is not set.")

# Create engine
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """Dependency to get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
