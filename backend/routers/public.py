from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, database

router = APIRouter()

@router.post("/complaint", response_model=schemas.ComplaintResponse)
def submit_complaint(complaint: schemas.ComplaintCreate, db: Session = Depends(database.get_db)):
    db_complaint = models.Complaint(**complaint.dict())
    db.add(db_complaint)
    db.commit()
    db.refresh(db_complaint)
    
    # Send Acknowledgement SMS
    if db_complaint.phone_number:
        try:
            import os
            from twilio.rest import Client
            
            account_sid = os.environ.get("TWILIO_ACCOUNT_SID")
            auth_token = os.environ.get("TWILIO_AUTH_TOKEN")
            from_number = os.environ.get("TWILIO_PHONE_NUMBER")
            
            if account_sid and auth_token and from_number:
                client = Client(account_sid, auth_token)
                message = client.messages.create(
                    body=f"OmbudsPortal: Complaint Received. Ref ID: {db_complaint.reference_id}. Track at: https://ombudsman-portal.netlify.app/track",
                    from_=from_number,
                    to=db_complaint.phone_number
                )
                print(f"[SMS SENT] SID: {message.sid}")
        except Exception as e:
            print(f"[SMS FAILED] {str(e)}")

    return db_complaint

@router.get("/complaint/{reference_id}", response_model=schemas.ComplaintResponse)
def track_complaint(reference_id: str, db: Session = Depends(database.get_db)):
    complaint = db.query(models.Complaint).filter(models.Complaint.reference_id == reference_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return complaint
