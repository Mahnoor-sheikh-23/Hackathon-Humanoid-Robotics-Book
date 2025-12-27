"""
Service for content personalization based on user profile
"""
import asyncio
from typing import Dict, Any
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from operator import itemgetter
import os

async def personalize_content(original_content: str, user_profile: Dict[str, Any]) -> str:
    """
    Personalize content based on user profile using LLM
    """
    try:
        # Get the LLM from environment or use a default
        # Check if we have OpenRouter configuration
        api_key = os.getenv("OPENROUTER_API_KEY") or os.getenv("OPENAI_API_KEY")
        api_base = os.getenv("OPENROUTER_BASE_URL") or os.getenv("OPENAI_BASE_URL") or "https://openrouter.ai/api/v1"

        # Use OpenRouter model if we have OpenRouter configuration
        if os.getenv("OPENROUTER_API_KEY"):
            llm = ChatOpenAI(
                model="openai/gpt-3.5-turbo",  # OpenRouter format
                temperature=0.7,
                openai_api_key=api_key,
                openai_api_base=api_base
            )
        else:
            llm = ChatOpenAI(
                model="gpt-3.5-turbo",
                temperature=0.7,
                openai_api_key=api_key,
                openai_api_base=api_base
            )

        # Create a prompt that asks the LLM to personalize the content while preserving structure
        prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an educational content personalizer. Your job is to adapt technical content to match the user's background and experience level while PRESERVING ALL MARKDOWN STRUCTURE.
            When personalizing content:
            1. Keep ALL Markdown formatting intact (headings ##, lists -, code blocks ```, etc.)
            2. Simplify complex concepts for beginners while keeping the structure
            3. Add more depth and examples for intermediate/advanced users
            4. Use analogies that relate to the user's background
            5. Maintain technical accuracy while improving accessibility
            6. Preserve code examples and technical details but explain them appropriately
            7. Keep all headings, subheadings, lists, and code blocks in their original positions
            8. RETURN THE EXACT SAME MARKDOWN STRUCTURE WITH MODIFIED CONTENT INSIDE EACH SECTION"""),
            ("user", """Please personalize the following content based on this user profile while PRESERVING ALL MARKDOWN STRUCTURE:

User Profile:
Programming Experience: {programming_exp}
Robotics Knowledge: {robotics_knowledge}
Hardware Availability: {hardware_availability}

Content to Personalize:
{content}

INSTRUCTIONS: Return the same content with the EXACT SAME MARKDOWN STRUCTURE, but modify the explanations inside each section based on the user profile. Preserve ALL headings, lists, code blocks, and formatting exactly as they appear in the original content.

Personalized Content (preserve all Markdown formatting):""")
        ])

        # Create the chain and invoke it
        chain = prompt | llm | StrOutputParser()
        personalized_content = await chain.ainvoke({
            "programming_exp": user_profile.get('programming_experience', 'Not specified'),
            "robotics_knowledge": user_profile.get('robotics_knowledge', 'Not specified'),
            "hardware_availability": user_profile.get('hardware_availability', 'Not specified'),
            "content": original_content
        })

        return personalized_content

    except Exception as e:
        # If personalization fails, return the original content
        print(f"Error in personalization service: {e}")
        return original_content