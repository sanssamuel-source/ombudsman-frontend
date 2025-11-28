# Ombudsman Digital Complaint Portal 🏛️

> **Hackathon MVP**: A national portal to submit, track, and receive SMS updates for complaints against public officials.

![Admin Dashboard](admin_dashboard.png)

## 🚩 The Problem
Citizens, especially in rural areas, face significant barriers to reporting public official malpractice:
- **Cost & Travel**: Filing a complaint often requires traveling long distances to physical offices.
- **Lack of Transparency**: Paper-based systems lead to lost records and no way to track status.
- **No Accountability**: The Ombudsman's office lacks data to identify corruption hotspots.

## 💡 The Solution
We built a **Digital Complaint Portal** that democratizes access to justice:
1.  **Citizen Portal**: Submit complaints anonymously and track them via a Reference ID.
2.  **SMS Updates**: Automated notifications keep citizens informed without needing internet access (Mocked for MVP).
3.  **Ombudsman Dashboard**: A centralized view for officials to triage cases and view analytics.

## 🏗️ System Architecture

The project is built as a modern full-stack web application:

- **Backend**: Python **FastAPI**
    - High-performance async API.
    - **SQLite** for lightweight, file-based persistence (MVP).
    - **SQLAlchemy** ORM for database interactions.
- **Frontend**: **React** + **Vite**
    - **TailwindCSS** for a premium, responsive design.
    - **Recharts** for analytics visualization.
    - **Lucide React** for iconography.

### Directory Structure
```
ombudsman_portal/
├── backend/            # FastAPI Application
│   ├── routers/        # API Endpoints (Public & Admin)
│   ├── models.py       # Database Models
│   └── main.py         # Entry Point
└── frontend/           # React Application
    ├── src/
    │   ├── pages/      # Route Components
    │   └── components/ # Reusable UI
    └── tailwind.config.js
```

## 📸 Screenshots

| Submission Page | Tracking Page |
|:---:|:---:|
| ![Submission](complaint_submission_page.png) | ![Tracking](complaint_tracking_page.png) |

| Admin Dashboard | Analytics |
|:---:|:---:|
| ![Dashboard](admin_dashboard.png) | ![Analytics](analytics_panel.png) |

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
# Server running at http://127.0.0.1:8000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App running at http://localhost:5173
```

## ✨ Features

### 👤 Citizen Features
- **File Complaint**: Simple form capturing Ministry, Official, Details, and Phone.
- **Instant Reference ID**: Unique ID generated immediately upon submission.
- **Track Status**: Real-time status updates using the Reference ID.
- **Privacy First**: No PII leaked publicly.

### 🛡️ Admin Features
- **Secure Login**: Token-based authentication.
- **Case Management**: View list of complaints, filter by status.
- **Status Updates**: Change status (Submitted → In Review → Resolved).
- **Audit Log**: All status changes are recorded with timestamps.
- **Analytics**: Visual breakdown of complaints by status and volume.
- **SMS Mock**: Console logs simulate SMS delivery to citizens.

## 🔮 Future Roadmap
- [ ] **Authentication**: OAuth for citizens (optional) and robust Auth0/JWT for admins.
- **Database**: Migrate to PostgreSQL for production.
- **SMS Integration**: Connect Twilio API for real SMS.
- **File Uploads**: Allow citizens to attach evidence (photos/docs).
- **AI Triage**: Auto-categorize complaints using NLP.

---
*Built for the Public Service Hackathon 2025*
