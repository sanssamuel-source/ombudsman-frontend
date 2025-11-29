from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models, database
from routers import public, admin, sms, ussd

# Create tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Ombudsman Digital Complaint Portal")

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
