from fastapi import APIRouter, Request, Response
from sqlalchemy.orm import Session
import models, schemas, database

router = APIRouter()

# In-memory session storage for MVP (production would use Redis)
ussd_sessions = {}

MINISTRY_OPTIONS = [
    "1. Health",
    "2. Education", 
    "3. Agriculture",
    "4. Energy",
    "5. Water Resources",
    "6. Lands",
    "7. Finance",
    "8. Justice",
    "9. Other"
]

MINISTRY_MAP = {
    "1": "Health",
    "2": "Education",
    "3": "Agriculture", 
    "4": "Energy",
    "5": "Water Resources",
    "6": "Lands",
    "7": "Finance",
    "8": "Justice",
    "9": "Other Ministry"
}

@router.post("/ussd/menu")
async def handle_ussd(request: Request, db: Session = database.get_db):
    """
    USSD Menu Handler (AfricasTalking/Twilio compatible)
    
    Expected payload format:
    {
        "sessionId": "unique_session_id",
        "serviceCode": "*920#",
        "phoneNumber": "+23276543210",
        "text": "user_input"
    }
    """
    data = await request.json()
    
    session_id = data.get("sessionId")
    phone_number = data.get("phoneNumber")
    text = data.get("text", "")
    
    # Split user input by asterisks (represents menu navigation)
    user_inputs = text.split("*") if text else []
    
    # Initialize session if new
    if session_id not in ussd_sessions:
        ussd_sessions[session_id] = {
            "phone": phone_number,
            "stage": "menu",
            "data": {}
        }
    
    session = ussd_sessions[session_id]
    stage = session["stage"]
    
    # Main Menu
    if len(user_inputs) == 0 or text == "":
        response = "CON Welcome to OmbudsLink\n"
        response += "1. File New Complaint\n"
        response += "2. Track Complaint\n"
        response += "3. Help"
        return Response(content=response, media_type="text/plain")
    
    # User selected option from main menu
    if len(user_inputs) == 1:
        choice = user_inputs[0]
        
        if choice == "1":
            # File Complaint - Show ministry options
            session["stage"] = "select_ministry"
            response = "CON Select Ministry:\n"
            response += "\n".join(MINISTRY_OPTIONS)
            return Response(content=response, media_type="text/plain")
            
        elif choice == "2":
            # Track Complaint
            session["stage"] = "enter_ref_id"
            response = "CON Enter your Reference ID:"
            return Response(content=response, media_type="text/plain")
            
        elif choice == "3":
            # Help
            response = "END OmbudsLink helps you file complaints against government offices.\n\n"
            response += "Dial *920# anytime.\n"
            response += "SMS support: +232-XXX-XXXX"
            return Response(content=response, media_type="text/plain")
        else:
            response = "END Invalid option. Please try again."
            return Response(content=response, media_type="text/plain")
    
    # Ministry selection
    if len(user_inputs) == 2 and session["stage"] == "select_ministry":
        ministry_choice = user_inputs[1]
        
        if ministry_choice in MINISTRY_MAP:
            session["data"]["ministry"] = MINISTRY_MAP[ministry_choice]
            session["stage"] = "enter_location"
            response = "CON Enter your district (e.g., Western Urban):"
            return Response(content=response, media_type="text/plain")
        else:
            response = "END Invalid ministry. Please try again."
            return Response(content=response, media_type="text/plain")
    
    # Location entry
    if len(user_inputs) == 3 and session["stage"] == "enter_location":
        location = user_inputs[2]
        session["data"]["location"] = location
        session["stage"] = "enter_details"
        response = "CON Describe your complaint (max 160 chars):"
        return Response(content=response, media_type="text/plain")
    
    # Complaint details entry - FINAL STEP
    if len(user_inputs) == 4 and session["stage"] == "enter_details":
        details = user_inputs[3]
        session["data"]["details"] = details
        
        # Create complaint in database
        try:
            complaint_data = {
                "ministry": session["data"]["ministry"],
                "location": session["data"]["location"],
                "details": details,
                "phone_number": phone_number,
                "nin": None,  # USSD users won't provide NIN
                "evidence_data": None,  # No photo upload via USSD
                "official_name": None
            }
            
            db_complaint = models.Complaint(**complaint_data)
            db.add(db_complaint)
            db.commit()
            db.refresh(db_complaint)
            
            # Send acknowledgment SMS (reuse existing Twilio logic)
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
                            body=f"OmbudsLink: Complaint filed via USSD. Ref ID: {db_complaint.reference_id}. Track at: https://ombudsman-frontend-theta.vercel.app/track",
                            from_=from_number,
                            to=db_complaint.phone_number
                        )
                        print(f"[USSD SMS SENT] SID: {message.sid}")
                except Exception as e:
                    print(f"[USSD SMS FAILED] {str(e)}")
            
            # Clear session
            del ussd_sessions[session_id]
            
            response = f"END Complaint filed successfully!\n\n"
            response += f"Ref ID: {db_complaint.reference_id}\n"
            response += f"Ministry: {db_complaint.ministry}\n\n"
            response += "SMS sent with tracking link."
            return Response(content=response, media_type="text/plain")
            
        except Exception as e:
            print(f"[USSD ERROR] {str(e)}")
            response = "END Error filing complaint. Please try again or use web portal."
            return Response(content=response, media_type="text/plain")
    
    # Track complaint flow
    if len(user_inputs) == 2 and session["stage"] == "enter_ref_id":
        ref_id = user_inputs[1].upper()
        
        # Query complaint
        complaint = db.query(models.Complaint).filter(
            models.Complaint.reference_id == ref_id
        ).first()
        
        # Clear session
        del ussd_sessions[session_id]
        
        if complaint:
            response = f"END Complaint Status:\n\n"
            response += f"Ref ID: {complaint.reference_id}\n"
            response += f"Ministry: {complaint.ministry}\n"
            response += f"Status: {complaint.status.replace('_', ' ').upper()}\n"
            response += f"Filed: {complaint.created_at.strftime('%Y-%m-%d')}"
            return Response(content=response, media_type="text/plain")
        else:
            response = "END Complaint not found. Please check your Reference ID."
            return Response(content=response, media_type="text/plain")
    
    # Fallback
    response = "END Session error. Please dial *920# again."
    return Response(content=response, media_type="text/plain")


@router.get("/ussd/status")
async def ussd_status():
    """Health check for USSD service"""
    return {
        "status": "active",
        "active_sessions": len(ussd_sessions),
        "service_code": "*920#",
        "endpoints": {
            "menu": "/api/ussd/menu",
            "status": "/api/ussd/status"
        }
    }
