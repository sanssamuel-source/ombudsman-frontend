from twilio.rest import Client
import logging

# Hardcoded credentials for Hackathon MVP
ACCOUNT_SID = "AC1bca241c6731032f3978f686c29be1f5"
AUTH_TOKEN = "af53101ba11bdd603df364e624627d5a"
FROM_NUMBER = "+14323484928"

logger = logging.getLogger(__name__)

def send_sms(to_number: str, body: str):
    try:
        client = Client(ACCOUNT_SID, AUTH_TOKEN)
        message = client.messages.create(
            body=body,
            from_=FROM_NUMBER,
            to=to_number
        )
        logger.info(f"SMS sent to {to_number}: {message.sid}")
        return True
    except Exception as e:
        logger.error(f"Failed to send SMS: {str(e)}")
        return False
