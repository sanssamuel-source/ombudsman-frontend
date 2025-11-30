from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, database

router = APIRouter()

# from ..services.sms import send_sms

@router.post("/complaint", response_model=schemas.ComplaintResponse)
def submit_complaint(complaint: schemas.ComplaintCreate, db: Session = Depends(database.get_db)):
    db_complaint = models.Complaint(**complaint.dict())
    db.add(db_complaint)
    db.commit()
    db.refresh(db_complaint)
    
    # Send SMS Notification (Disabled for Build Stability)
    # if db_complaint.phone_number:
    #     send_sms(
    #         db_complaint.phone_number, 
    #         f"Ombudsman Portal: Complaint Received. Ref ID: {db_complaint.reference_id}. We will notify you of updates."
    #     )
        
    return db_complaint

@router.get("/complaint/{reference_id}", response_model=schemas.ComplaintResponse)
def track_complaint(reference_id: str, db: Session = Depends(database.get_db)):
    complaint = db.query(models.Complaint).filter(models.Complaint.reference_id == reference_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return complaint
