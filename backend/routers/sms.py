from fastapi import APIRouter, Form, Depends, Request
from sqlalchemy.orm import Session
import models, database
from twilio.twiml.messaging_response import MessagingResponse
import uuid

router = APIRouter()

@router.post("/sms/incoming")
async def incoming_sms(
    From: str = Form(...),
    Body: str = Form(...),
    db: Session = Depends(database.get_db)
):
    """
    Handle incoming SMS from Twilio.
    Creates a complaint and replies with the Reference ID.
    """
    # 1. Create Complaint
    reference_id = str(uuid.uuid4())[:8].upper()
    
    db_complaint = models.Complaint(
        reference_id=reference_id,
        ministry="Unspecified (SMS)", # Default for SMS
        description=Body,
        phone_number=From,
        status="submitted"
    )
    
    db.add(db_complaint)
    db.commit()
    db.refresh(db_complaint)
    
    # 2. Generate TwiML Reply
    resp = MessagingResponse()
    msg = resp.message()
    msg.body(f"OmbudsPortal: Report Received. Ref ID: {reference_id}. We will investigate.")
    
    # Return XML response for Twilio
    return Response(content=str(resp), media_type="application/xml")

from fastapi import Response
