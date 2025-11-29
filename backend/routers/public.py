from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, database

router = APIRouter()

@router.post("/complaint", response_model=schemas.ComplaintResponse)
def submit_complaint(complaint: schemas.ComplaintCreate, db: Session = Depends(database.get_db)):
    complaint_data = complaint.dict()
    
    # Handle Evidence (Map 'evidence' to 'evidence_data')
    evidence = complaint_data.pop('evidence', None)
    if evidence:
        complaint_data['evidence_data'] = evidence
    
    # Remove GPS coordinates from complaint_data if they're None (avoid validation issues)
    # They'll be set to None by default in the model
    if complaint_data.get('latitude') is None:
        complaint_data.pop('latitude', None)
    if complaint_data.get('longitude') is None:
        complaint_data.pop('longitude', None)
    
    # Mock NIN Verification
    nin = complaint_data.get('nin')
    if nin and len(nin) == 11 and nin.isdigit():
        complaint_data['is_verified'] = True
    
    # AI-Powered Analytics (Safe - will set defaults if analysis fails)
    try:
        from ai_analytics import analyze_complaint
        ai_insights = analyze_complaint(
            complaint_data.get('details', ''),
            complaint_data.get('ministry', '')
        )
        complaint_data.update(ai_insights)
    except Exception as e:
        print(f"[AI ANALYSIS WARNING] {str(e)} - Using defaults")
        # Set safe defaults if AI fails
        complaint_data['ai_category'] = 'general'
        complaint_data['urgency_score'] = 5
        complaint_data['sentiment'] = 'neutral'
    
    db_complaint = models.Complaint(**complaint_data)
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
                    body=f"OmbudsPortal: Complaint Received. Ref ID: {db_complaint.reference_id}. Track at: https://ombudsman-frontend-theta.vercel.app/track",
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

# Test SMS endpoint (for debugging)
@router.get("/test-sms")
def test_sms(to: str = None):
    """Send a test SMS using Twilio credentials.
    Optional query param `to` overrides the default test number.
    """
    import os
    from twilio.rest import Client
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    from_number = os.getenv("TWILIO_PHONE_NUMBER")
    to_number = to or os.getenv("TWILIO_TEST_NUMBER")
    if not (account_sid and auth_token and from_number and to_number):
        raise HTTPException(status_code=500, detail="Twilio credentials or test number not configured")
    client = Client(account_sid, auth_token)
    try:
        message = client.messages.create(
            body="[Ombudsman] Test SMS successful.",
            from_=from_number,
            to=to_number
        )
        return {"sid": message.sid, "status": message.status}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


