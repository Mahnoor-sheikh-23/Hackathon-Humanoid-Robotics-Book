#!/bin/bash
set -e   # exit on any error

# Move into backend folder
cd backend

# Install dependencies
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

# Ensure PYTHONPATH includes current directory
export PYTHONPATH=.

# Start FastAPI with the Railway injected port
python3 -m uvicorn main:app --host 0.0.0.0 --port $PORT
