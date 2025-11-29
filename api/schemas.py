from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class AuditLogResponse(BaseModel):
    previous_status: str
    new_status: str
    changed_by: str
    timestamp: datetime

    class Config:
        orm_mode = True

class ComplaintBase(BaseModel):
    ministry: str
    location: str
    official_name: str
    details: str
    phone_number: Optional[str] = None
    evidence: Optional[str] = None # Base64
    nin: Optional[str] = None
    latitude: Optional[str] = None
    longitude: Optional[str] = None

class ComplaintCreate(ComplaintBase):
    pass

class ComplaintResponse(ComplaintBase):
    reference_id: str
    status: str
    created_at: datetime
    is_verified: bool = False
    evidence_data: Optional[str] = None
    ai_category: Optional[str] = None
    urgency_score: int = 5
    sentiment: str = "neutral"
    audit_logs: List[AuditLogResponse] = []

    class Config:
        orm_mode = True

class ComplaintUpdateStatus(BaseModel):
    status: str
