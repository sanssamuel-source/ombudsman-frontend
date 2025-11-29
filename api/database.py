from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import os

# Robust check for writable directory
if os.name == 'nt': # Windows (Local Development)
    SQLALCHEMY_DATABASE_URL = "sqlite:///./ombudsman.db"
else: # Linux (Vercel / Production)
    # Vercel file system is read-only except for /tmp
    SQLALCHEMY_DATABASE_URL = "sqlite:////tmp/ombudsman.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
