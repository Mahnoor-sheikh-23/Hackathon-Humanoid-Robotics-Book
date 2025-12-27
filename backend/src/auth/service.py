"""
Authentication service layer
"""
from sqlalchemy.orm import Session
from typing import Optional
from ..models import User  # Use unified User model
from .utils import hash_password, verify_password

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    """Get a user by email"""
    return db.query(User).filter(User.email == email).first()

def get_user_by_username(db: Session, username: str) -> Optional[User]:
    """Get a user by username"""
    return db.query(User).filter(User.username == username).first()

def create_user(
    db: Session,
    email: str,
    username: str,
    password: str,
    programming_experience: str = None,
    robotics_knowledge: str = None,
    hardware_availability: str = None
) -> User:
    """Create a new user with the provided details"""
    hashed_pwd = hash_password(password)

    db_user = User(
        email=email,
        username=username,
        password_hash=hashed_pwd,  # Use the attribute name that matches the unified model
        programming_experience=programming_experience,
        robotics_knowledge=robotics_knowledge,
        hardware_availability=hardware_availability,
        profile_completed=bool(programming_experience or robotics_knowledge or hardware_availability)
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

def authenticate_user(db: Session, username: str, password: str) -> Optional[User]:
    """Authenticate a user by username/email and password"""
    user = get_user_by_username(db, username)
    if not user:
        # Also try email
        user = get_user_by_email(db, username)

    if not user or not verify_password(password, user.password_hash):
        return None

    return user

def update_user_profile(
    db: Session,
    user_id: int,
    programming_experience: str = None,
    robotics_knowledge: str = None,
    hardware_availability: str = None
) -> User:
    """Update user profile information"""
    user = db.query(User).filter(User.id == user_id).first()

    if programming_experience is not None:
        user.programming_experience = programming_experience
    if robotics_knowledge is not None:
        user.robotics_knowledge = robotics_knowledge
    if hardware_availability is not None:
        user.hardware_availability = hardware_availability

    user.profile_completed = True

    db.commit()
    db.refresh(user)

    return user