#!/bin/bash
. /opt/venv/bin/activate
exec uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
