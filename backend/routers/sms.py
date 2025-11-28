from fastapi import APIRouter, Form, Depends, Request, Response
from sqlalchemy.orm import Session
import models, database
from twilio.twiml.messaging_response import MessagingResponse
import uuid
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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
    logger.info(f"Received SMS from {From}: {Body}")

    # 1. Create Complaint
    reference_id = str(uuid.uuid4())[:8].upper()
    
    db_complaint = models.Complaint(
        reference_id=reference_id,
        ministry="Unspecified (SMS)", # Default for SMS
        location="SMS (Unknown)", # Default for SMS
        details=Body, # Fixed: Model uses 'details', not 'description'
        phone_number=From,
        status="submitted"
    )
    
    db.add(db_complaint)
    db.commit()
from fastapi import APIRouter, Form, Depends, Request, Response
from sqlalchemy.orm import Session
import models, database
from twilio.twiml.messaging_response import MessagingResponse
import uuid
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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
    logger.info(f"Received SMS from {From}: {Body}")

    # 1. Create Complaint
    reference_id = str(uuid.uuid4())[:8].upper()
    
    db_complaint = models.Complaint(
        reference_id=reference_id,
        ministry="Unspecified (SMS)", # Default for SMS
        location="SMS (Unknown)", # Default for SMS
        details=Body, # Fixed: Model uses 'details', not 'description'
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

# ------------------------------------------------------------
# Two‑way SMS: handle replies from users (e.g., status updates)
# ------------------------------------------------------------
@router.post("/sms/reply")
async def incoming_reply(
    From: str = Form(...),
    Body: str = Form(...),
    db: Session = Depends(database.get_db),
):
    """Process a reply SMS.
    Expected format: `<REF_ID> <ACTION>`
    Example: `AB12CD34 RESOLVE` or `AB12CD34 STATUS`.
    Supported actions:
      - STATUS: returns the current status of the complaint.
      - RESOLVE / IN_REVIEW / REJECTED: updates the complaint status.
    """
    logger.info(f"Received reply SMS from {From}: {Body}")

    parts = Body.strip().split()
    if len(parts) < 2:
        # Not enough info – just echo help message
        resp = MessagingResponse()
        resp.message("Please send: <REF_ID> <ACTION>. E.g., AB12CD34 STATUS")
        return Response(content=str(resp), media_type="application/xml")

    ref_id, action = parts[0].upper(), parts[1].lower()
    complaint = db.query(models.Complaint).filter(models.Complaint.reference_id == ref_id).first()
    if not complaint:
        resp = MessagingResponse()
        resp.message(f"Complaint {ref_id} not found.")
        return Response(content=str(resp), media_type="application/xml")

    if action == "status":
        resp = MessagingResponse()
        resp.message(f"Complaint {ref_id} status: {complaint.status}")
        return Response(content=str(resp), media_type="application/xml")

    # Update status if action is a known status value
    valid_statuses = {"submitted", "in_review", "resolved", "rejected"}
    if action in valid_statuses:
        complaint.status = action
        db.commit()
        resp = MessagingResponse()
        resp.message(f"Complaint {ref_id} status updated to {action}.")
        return Response(content=str(resp), media_type="application/xml")

    # Unknown action
    resp = MessagingResponse()
    resp.message("Unknown action. Use STATUS or one of: submitted, in_review, resolved, rejected.")
    return Response(content=str(resp), media_type="application/xml")

# ------------------------------------------------------------
# End of SMS routes
# ------------------------------------------------------------
