"""
Authentication routes for signup and login
"""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from typing import Optional
from src.db import get_db
from . import service, utils
from src.models import User  # Import the User model from main models
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class UserRegister(BaseModel):
    email: str
    username: str
    password: str
    programming_experience: Optional[str] = None
    robotics_knowledge: Optional[str] = None
    hardware_availability: Optional[str] = None

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserProfileUpdate(BaseModel):
    programming_experience: Optional[str] = None
    robotics_knowledge: Optional[str] = None
    hardware_availability: Optional[str] = None

@router.post("/register", response_model=Token)
def register_user(user_data: UserRegister, db: Session = Depends(get_db)):
    """Register a new user"""
    # Check if user already exists
    existing_user = service.get_user_by_email(db, user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    existing_user = service.get_user_by_username(db, user_data.username)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )

    # Create new user
    user = service.create_user(
        db=db,
        email=user_data.email,
        username=user_data.username,
        password=user_data.password,
        programming_experience=user_data.programming_experience,
        robotics_knowledge=user_data.robotics_knowledge,
        hardware_availability=user_data.hardware_availability
    )

    # Create access token
    access_token = utils.create_access_token(
        data={"sub": user.username, "user_id": user.id}
    )

    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
def login_user(login_data: UserLogin, db: Session = Depends(get_db)):
    """Login an existing user"""
    user = service.authenticate_user(
        db=db,
        username=login_data.username,
        password=login_data.password
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create access token
    access_token = utils.create_access_token(
        data={"sub": user.username, "user_id": user.id}
    )

    return {"access_token": access_token, "token_type": "bearer"}

@router.put("/profile")
def update_profile(
    profile_data: UserProfileUpdate,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    """Update user profile information"""
    payload = utils.verify_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_id = payload.get("user_id")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Update user profile
    updated_user = service.update_user_profile(
        db=db,
        user_id=user_id,
        programming_experience=profile_data.programming_experience,
        robotics_knowledge=profile_data.robotics_knowledge,
        hardware_availability=profile_data.hardware_availability
    )

    return {"message": "Profile updated successfully", "user": updated_user}

@router.get("/profile")
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    """Get current user profile information"""
    payload = utils.verify_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_id = payload.get("user_id")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return {
        "id": user.id,
        "email": user.email,
        "username": user.username,
        "programming_experience": user.programming_experience,
        "robotics_knowledge": user.robotics_knowledge,
        "hardware_availability": user.hardware_availability,
        "profile_completed": user.profile_completed
    }