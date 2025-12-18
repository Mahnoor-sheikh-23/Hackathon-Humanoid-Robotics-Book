#!/bin/bash
set -e
cd backend
export PYTHONPATH=.
python ingest_docs.py
uvicorn main:app --host 0.0.0.0 --port $PORT
