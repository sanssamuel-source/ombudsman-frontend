from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from typing import List
import models, schemas, database

router = APIRouter()

ADMIN_TOKEN = "secret-admin-token"

def verify_admin(x_admin_token: str = Header(None)):
    if x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return True

@router.post("/login")
def admin_login(username: str, password: str):
    if username == "admin" and password == "admin123":
        return {"token": ADMIN_TOKEN}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.get("/complaints", response_model=List[schemas.ComplaintResponse])
def get_all_complaints(db: Session = Depends(database.get_db), _: bool = Depends(verify_admin)):
    return db.query(models.Complaint).all()

@router.get("/analytics")
def get_analytics(db: Session = Depends(database.get_db), _: bool = Depends(verify_admin)):
    complaints = db.query(models.Complaint).all()
    
    # Count by status
    by_status = {}
    for complaint in complaints:
        status = complaint.status
        by_status[status] = by_status.get(status, 0) + 1
    
    # Count by ministry
    by_ministry = {}
    for complaint in complaints:
        ministry = complaint.ministry
        by_ministry[ministry] = by_ministry.get(ministry, 0) + 1
    
    return {
        "total_complaints": len(complaints),
        "by_status": by_status,
        "by_ministry": by_ministry
    }

@router.patch("/complaint/{complaint_id}/status")
def update_complaint_status(
    complaint_id: int,
    status_update: schemas.ComplaintUpdateStatus,
    db: Session = Depends(database.get_db),
    _: bool = Depends(verify_admin)
):
    complaint = db.query(models.Complaint).filter(models.Complaint.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    
    audit_log = models.AuditLog(
        complaint_id=complaint_id,
        previous_status=complaint.status,
        new_status=status_update.status,
        changed_by="admin"
    )
    complaint.status = status_update.status
    db.add(audit_log)
    db.commit()
    db.refresh(complaint)
    return complaint
