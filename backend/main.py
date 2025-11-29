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

app.include_router(public.router, prefix="/api/public", tags=["Public"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])
app.include_router(sms.router, tags=["SMS"])
app.include_router(ussd.router, prefix="/api/ussd", tags=["USSD"])

@app.get("/")
def read_root():
    return {"message": "Ombudsman Portal API is running"}
