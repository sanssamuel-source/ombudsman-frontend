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
    
    # SMS Notification
    if complaint.phone_number:
        try:
            # Try Real SMS if Env Vars exist
            import os
            from twilio.rest import Client
            
            account_sid = os.environ.get("TWILIO_ACCOUNT_SID")
            auth_token = os.environ.get("TWILIO_AUTH_TOKEN")
            from_number = os.environ.get("TWILIO_PHONE_NUMBER")
            
            if account_sid and auth_token and from_number:
                client = Client(account_sid, auth_token)
                message = client.messages.create(
                    body=f"OmbudsPortal: Your complaint {complaint.reference_id} status is now {complaint.status.replace('_', ' ').upper()}.",
                    from_=from_number,
                    to=complaint.phone_number
                )
                print(f"[SMS SENT] SID: {message.sid}")
            else:
                raise Exception("Twilio credentials not found")
        except Exception as e:
            # Fallback to Mock
            print(f"[SMS MOCK] To: {complaint.phone_number} | Msg: Your complaint {complaint.reference_id} status is now {complaint.status}")
            print(f"[SMS LOG] Error sending real SMS: {str(e)}")
            
    return complaint

@router.get("/analytics")
def get_analytics(db: Session = Depends(database.get_db), _: str = Depends(verify_admin)):
    total = db.query(models.Complaint).count()
    by_status = {}
    for status in ["submitted", "in_review", "resolved", "rejected"]:
        count = db.query(models.Complaint).filter(models.Complaint.status == status).count()
        by_status[status] = count

    # Group by Ministry (Hotspots)
    # SQLite doesn't have a clean "group by" in ORM without func, doing python-side aggregation for MVP simplicity
    all_complaints = db.query(models.Complaint).all()
    by_ministry = {}
    for c in all_complaints:
        ministry = c.ministry.strip().title() if c.ministry else "Unknown"
        by_ministry[ministry] = by_ministry.get(ministry, 0) + 1
        
    return {
        "total_complaints": total,
        "by_status": by_status,
        "by_ministry": dict(sorted(by_ministry.items(), key=lambda item: item[1], reverse=True)[:5]) # Top 5
    }
