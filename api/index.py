from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import models, database
from routers import public, admin, sms, ussd
import logging
import traceback

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Ombudsman Digital Complaint Portal")

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global error: {str(exc)}")
    traceback.print_exc()
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal Server Error: {str(exc)}", "trace": traceback.format_exc()},
    )

# Create tables (Safe Mode)
try:
    models.Base.metadata.create_all(bind=database.engine)
    logger.info("Database tables created successfully.")
except Exception as e:
    logger.error(f"Failed to create database tables: {e}")
    # We don't raise here so the app can still start and report the error via API


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Universal Routing Strategy
# 1. Full Path (e.g. /api/public/complaint)
app.include_router(public.router, prefix="/api/public", tags=["Public API"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin API"])
app.include_router(ussd.router, prefix="/api/ussd", tags=["USSD API"])

# 2. Short Path (e.g. /public/complaint)
app.include_router(public.router, prefix="/public", tags=["Public Short"])
app.include_router(admin.router, prefix="/admin", tags=["Admin Short"])
app.include_router(ussd.router, prefix="/ussd", tags=["USSD Short"])

# 3. Root Path (e.g. /complaint) - Fallback if everything is stripped
app.include_router(public.router, prefix="", tags=["Public Root"])
# Note: Admin and USSD might conflict at root, so we keep them prefixed or handle carefully.
# But for public complaint, this is critical.

app.include_router(sms.router, tags=["SMS"])

@app.get("/")
def read_root():
    return {"message": "Ombudsman Portal API is running"}
