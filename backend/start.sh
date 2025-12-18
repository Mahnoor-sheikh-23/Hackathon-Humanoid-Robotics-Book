#!/bin/bash
# Start the FastAPI application with the PORT environment variable
pip install -r requirements.txt
export PYTHONPATH=.
uvicorn main:app --host 0.0.0.0 --port $PORT
