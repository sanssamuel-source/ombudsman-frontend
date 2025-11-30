from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ComplaintBase(BaseModel):
    ministry: str
    official_name: str
    details: str
    phone_number: Optional[str] = None
    nin: Optional[str] = None
    evidence: Optional[str] = None

class ComplaintCreate(ComplaintBase):
    pass

class ComplaintResponse(ComplaintBase):
    reference_id: str
    status: str
    created_at: datetime

    class Config:
        orm_mode = True

class ComplaintUpdateStatus(BaseModel):
    status: str

class AuditLogResponse(BaseModel):
    previous_status: str
    new_status: str
    changed_by: str
    timestamp: datetime

    class Config:
        orm_mode = True
