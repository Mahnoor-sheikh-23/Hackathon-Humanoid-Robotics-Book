#!/bin/bash
set -e

# Move into backend folder
cd backend

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Ensure PYTHONPATH includes current directory
export PYTHONPATH=.

# Start FastAPI with Railway injected port
uvicorn main:app --host 0.0.0.0 --port $PORT
