import os
from dotenv import load_dotenv
from fastapi import FastAPI

load_dotenv()

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Physical AI & Humanoid Robotics Textbook Backend!"}