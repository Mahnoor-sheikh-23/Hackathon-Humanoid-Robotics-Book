#!/bin/bash
# Start the FastAPI application with the PORT environment variable
uvicorn main:app --host 0.0.0.0 --port $PORT