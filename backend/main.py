import os
import secrets
from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from database import get_db, init_db, Complaint

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
init_db()

# Admin credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"
ADMIN_TOKEN = "admin_token_12345"

# Pydantic models
class ComplaintCreate(BaseModel):
    ministry: str
    details: str
    contact: str

class ComplaintUpdate(BaseModel):
    status: str

class AdminLogin(BaseModel):
    username: str
    password: str

# Helper functions
def generate_ref_id():
    return f"REF-{secrets.token_hex(4).upper()}"

def verify_admin_token(x_admin_token: Optional[str] = Header(None)):
    if x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid admin token")
    return x_admin_token

# Public endpoints
@app.post("/api/public/complaint")
def create_complaint(complaint: ComplaintCreate, db: Session = Depends(get_db)):
    ref_id = generate_ref_id()
    db_complaint = Complaint(
        reference_id=ref_id,
        ministry=complaint.ministry,
        details=complaint.details,
        contact=complaint.contact,
        status="submitted"
    )
    db.add(db_complaint)
    db.commit()
    db.refresh(db_complaint)
    
    # Optional: Send SMS notification
    try:
        from twilio.rest import Client
        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        twilio_number = os.getenv("TWILIO_PHONE_NUMBER")
        
        if all([account_sid, auth_token, twilio_number]):
            client = Client(account_sid, auth_token)
            client.messages.create(
                body=f"Your complaint has been submitted. Reference ID: {ref_id}",
                from_=twilio_number,
                to=complaint.contact
            )
    except:
        pass  # SMS is optional
    
    return {"reference_id": ref_id, "status": "submitted"}

@app.get("/api/public/complaint/{ref_id}")
def get_complaint(ref_id: str, db: Session = Depends(get_db)):
    complaint = db.query(Complaint).filter(Complaint.reference_id == ref_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return {
        "reference_id": complaint.reference_id,
        "ministry": complaint.ministry,
        "details": complaint.details,
        "status": complaint.status,
        "created_at": complaint.created_at.isoformat()
    }

# Admin endpoints
@app.post("/api/admin/login")
def admin_login(credentials: AdminLogin):
    if credentials.username == ADMIN_USERNAME and credentials.password == ADMIN_PASSWORD:
        return {"token": ADMIN_TOKEN}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/api/admin/complaints")
def get_all_complaints(db: Session = Depends(get_db), token: str = Depends(verify_admin_token)):
    complaints = db.query(Complaint).all()
    return [{
        "reference_id": c.reference_id,
        "ministry": c.ministry,
        "details": c.details,
        "contact": c.contact,
        "status": c.status,
        "created_at": c.created_at.isoformat()
    } for c in complaints]

@app.get("/api/admin/analytics")
def get_analytics(db: Session = Depends(get_db), token: str = Depends(verify_admin_token)):
    complaints = db.query(Complaint).all()
    
    # Status distribution
    status_counts = {}
    for c in complaints:
        status_counts[c.status] = status_counts.get(c.status, 0) + 1
    
    # Ministry distribution
    ministry_counts = {}
    for c in complaints:
        ministry_counts[c.ministry] = ministry_counts.get(c.ministry, 0) + 1
    
    return {
        "total_complaints": len(complaints),
        "by_status": status_counts,
        "by_ministry": ministry_counts
    }

@app.patch("/api/admin/complaint/{ref_id}/status")
def update_complaint_status(
    ref_id: str,
    update: ComplaintUpdate,
    db: Session = Depends(get_db),
    token: str = Depends(verify_admin_token)
):
    complaint = db.query(Complaint).filter(Complaint.reference_id == ref_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    
    complaint.status = update.status
    db.commit()
    
    # Optional: Send SMS notification
    try:
        from twilio.rest import Client
        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        twilio_number = os.getenv("TWILIO_PHONE_NUMBER")
        
        if all([account_sid, auth_token, twilio_number]):
            client = Client(account_sid, auth_token)
            client.messages.create(
                body=f"Your complaint {ref_id} status updated to: {update.status}",
                from_=twilio_number,
                to=complaint.contact
            )
    except:
        pass
    
    return {"message": "Status updated successfully"}

@app.get("/")
def root():
    return {"message": "Ombudsman Portal API"}
