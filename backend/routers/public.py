from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, database

router = APIRouter()

@router.post("/complaint", response_model=schemas.ComplaintResponse)
def submit_complaint(complaint: schemas.ComplaintCreate, db: Session = Depends(database.get_db)):
    try:
        db_complaint = models.Complaint(**complaint.dict())
        db.add(db_complaint)
        db.commit()
        db.refresh(db_complaint)
        return db_complaint
    except Exception as e:
        print(f"Error submitting complaint: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.get("/complaint/{reference_id}", response_model=schemas.ComplaintResponse)
def track_complaint(reference_id: str, db: Session = Depends(database.get_db)):
    complaint = db.query(models.Complaint).filter(models.Complaint.reference_id == reference_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return complaint
