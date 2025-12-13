import os
import asyncpg
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

async def connect_to_db():
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL environment variable is not set.")
    return await asyncpg.connect(DATABASE_URL)

async def disconnect_from_db(conn):
    await conn.close()
