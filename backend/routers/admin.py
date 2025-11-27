from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
import models, schemas, database
from typing import List

router = APIRouter()

ADMIN_TOKEN = "secret-admin-token" # Hardcoded for MVP

def verify_admin(x_admin_token: str = Header(...)):
    if x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid admin token")

@router.get("/complaints", response_model=List[schemas.ComplaintResponse])
def list_complaints(db: Session = Depends(database.get_db), _: str = Depends(verify_admin)):
    return db.query(models.Complaint).all()

@router.patch("/complaint/{reference_id}/status", response_model=schemas.ComplaintResponse)
def update_status(reference_id: str, status_update: schemas.ComplaintUpdateStatus, db: Session = Depends(database.get_db), _: str = Depends(verify_admin)):
    complaint = db.query(models.Complaint).filter(models.Complaint.reference_id == reference_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    
    # Audit Log
    audit = models.AuditLog(
        complaint_id=complaint.id,
        previous_status=complaint.status,
        new_status=status_update.status,
        changed_by="admin"
    )
    db.add(audit)
    
    # Update Status
    complaint.status = status_update.status
    db.commit()
    db.refresh(complaint)
    
    # Mock SMS
    if complaint.phone_number:
        print(f"[SMS MOCK] To: {complaint.phone_number} | Msg: Your complaint {complaint.reference_id} status is now {complaint.status}")
        
    return complaint

@router.get("/analytics")
def get_analytics(db: Session = Depends(database.get_db), _: str = Depends(verify_admin)):
    total = db.query(models.Complaint).count()
    by_status = {}
    for status in ["submitted", "in_review", "resolved", "rejected"]:
        count = db.query(models.Complaint).filter(models.Complaint.status == status).count()
        by_status[status] = count
        
    return {
        "total_complaints": total,
        "by_status": by_status
    }
