"""
Personalization routes for adapting content to user background
"""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from ..db import get_db
from ..models import User
from ..auth import utils
from ..services.personalization_service import personalize_content

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    """Dependency to get current authenticated user"""
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

    return user

router = APIRouter(prefix="/personalize", tags=["personalization"])

class PersonalizeRequest(BaseModel):
    content: str
    user_profile: dict  # Contains user's background information

class PersonalizeResponse(BaseModel):
    personalized_content: str
    original_content: str

@router.post("/", response_model=PersonalizeResponse)
async def personalize_content_endpoint(
    request: PersonalizeRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Personalize content based on user profile
    """
    try:
        personalized_content = await personalize_content(
            original_content=request.content,
            user_profile=request.user_profile
        )

        return PersonalizeResponse(
            personalized_content=personalized_content,
            original_content=request.content
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error personalizing content: {str(e)}"
        )