#!/bin/bash
# Start the FastAPI application with the PORT environment variable
#!/bin/bash
cd backend  # go into backend folder
pip install -r requirements.txt
export PYTHONPATH=.
uvicorn main:app --host 0.0.0.0 --port $PORT