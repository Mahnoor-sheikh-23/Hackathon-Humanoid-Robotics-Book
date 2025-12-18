#!/bin/bash
set -e
cd backend
export PYTHONPATH=.
uvicorn main:app --host 0.0.0.0 --port $PORT
