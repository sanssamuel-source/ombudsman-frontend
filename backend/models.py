from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base
import uuid

def generate_reference_id():
    return str(uuid.uuid4())[:8].upper()

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    reference_id = Column(String, unique=True, index=True, default=generate_reference_id)
    ministry = Column(String, index=True)
    official_name = Column(String)
    details = Column(Text)
    phone_number = Column(String, nullable=True)
    nin = Column(String, nullable=True)
    evidence = Column(Text, nullable=True) # Base64 encoded string
    status = Column(String, default="submitted") # submitted, in_review, resolved, rejected
    created_at = Column(DateTime, default=datetime.utcnow)

    audit_logs = relationship("AuditLog", back_populates="complaint")

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    complaint_id = Column(Integer, ForeignKey("complaints.id"))
    previous_status = Column(String)
    new_status = Column(String)
    changed_by = Column(String) # "admin" or "system"
    timestamp = Column(DateTime, default=datetime.utcnow)

    complaint = relationship("Complaint", back_populates="audit_logs")
