"""
Translation routes for Urdu translation functionality
"""
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional
import requests
import os

router = APIRouter(prefix="/translation", tags=["translation"])

# Request models
class TranslationRequest(BaseModel):
    text: str
    source_lang: str = "en"
    target_lang: str = "ur"

class ToggleTranslationRequest(BaseModel):
    content_id: str
    target_lang: str = "ur"

# Response models
class TranslationResponse(BaseModel):
    original_text: str
    translated_text: str
    source_lang: str
    target_lang: str

class ToggleTranslationResponse(BaseModel):
    content_id: str
    is_translated: bool
    original_content: Optional[str] = None
    translated_content: Optional[str] = None

@router.post("/translate", response_model=TranslationResponse)
async def translate_text(request: TranslationRequest):
    """
    Translate text from source language to target language (Urdu)
    Uses Google Translate API via requests
    """
    try:
        # Using Google Translate API (free tier)
        # Alternative: You could use a different translation service
        url = "https://translate.googleapis.com/translate_a/single"

        params = {
            "client": "gtx",
            "sl": request.source_lang,
            "tl": request.target_lang,
            "dt": "t",
            "q": request.text
        }

        response = requests.get(url, params=params)

        if response.status_code == 200:
            # Parse the response - Google Translate returns nested arrays
            result = response.json()

            # Extract translated text from the response structure
            translated_text = ""
            if isinstance(result, list) and len(result) > 0 and isinstance(result[0], list):
                for item in result[0]:
                    if item and len(item) > 0:
                        translated_text += item[0] or ""

            if not translated_text:
                # Fallback: return original text with warning
                translated_text = request.text

            return TranslationResponse(
                original_text=request.text,
                translated_text=translated_text,
                source_lang=request.source_lang,
                target_lang=request.target_lang
            )
        else:
            # Fallback to original text if API fails
            return TranslationResponse(
                original_text=request.text,
                translated_text=request.text,
                source_lang=request.source_lang,
                target_lang=request.target_lang
            )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Translation error: {str(e)}"
        )

@router.post("/toggle", response_model=ToggleTranslationResponse)
async def toggle_translation(request: ToggleTranslationRequest):
    """
    Toggle content between English and Urdu
    """
    try:
        # In a real implementation, this would fetch content from a database
        # For now, returning a placeholder response
        return ToggleTranslationResponse(
            content_id=request.content_id,
            is_translated=(request.target_lang == "ur"),
            original_content=f"Original content for {request.content_id}",
            translated_content=f"اردو میں ترجمہ شدہ مواد برائے {request.content_id}" if request.target_lang == "ur" else None
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Toggle translation error: {str(e)}"
        )

@router.get("/supported-languages")
async def get_supported_languages():
    """
    Get list of supported languages for translation
    """
    return {
        "languages": [
            {"code": "en", "name": "English"},
            {"code": "ur", "name": "Urdu"},
            {"code": "hi", "name": "Hindi"},
            {"code": "ar", "name": "Arabic"},
            {"code": "es", "name": "Spanish"},
            {"code": "fr", "name": "French"},
            {"code": "de", "name": "German"},
            {"code": "zh", "name": "Chinese"},
            {"code": "ja", "name": "Japanese"},
            {"code": "ko", "name": "Korean"}
        ]
    }