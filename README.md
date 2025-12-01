# OmbudsLink - Digital Complaint Portal

## 🎯 Project Overview

**OmbudsLink** is a modern, full-stack web application designed to digitize and streamline the complaint submission and tracking process for government ombudsman offices. Built for the **Big 5 AI and Blockchain Hackathon** under the Public Service Architecture Revamp category.

**Live Demo:** https://ombudsman-frontend-theta.vercel.app/

**Admin Access:** Token: `P@s5w0rd@2026`

--- Track complaint status in real-time
- Receive automated updates
- Enable the Ombudsman's office to analyze patterns and identify corruption hotspots

### Features

- 🚀 Beautiful, modern UI with dark mode
- 📱 Mobile-responsive design
- 🤖 AI-powered sentiment analysis
- 🔗 Blockchain-style immutability hashing
- 📊 Admin dashboard with data visualization
- 🗺️ GPS location tracking
- 📎 Evidence file uploads
- 🔍 Real-time complaint tracking

### Technology Stack

- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Node.js + Express + Prisma
- **Database:** SQLite (portable, zero-config)
- **AI:** Natural language processing for sentiment analysis
- **Blockchain:** SHA-256 cryptographic hashing


## 🏗️ Architecture

### Tech Stack

#### Frontend

- **React 18** with **TypeScript** - Component-based UI
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first styling
- **Axios** - HTTP client for API calls
- **Recharts** - Interactive analytics charts
- **Lucide React** - Icon library
- **React Router** - Client-side routing

#### Backend

- **FastAPI** (Python) - High-performance REST API
- **SQLAlchemy** - ORM for database operations
- **SQLite** - Lightweight database (production-ready for demo)
- **Pydantic** - Data validation and schema modeling
- **Twilio** - SMS notifications (real-time alerts)
- **Python-dotenv** - Environment variable management

#### Deployment

- **Vercel** - Frontend hosting (CDN-backed)
- **Railway** - Backend API hosting
- **GitHub** - Version control and CI/CD integration

---

## ✨ Key Features

### 1. **Public Complaint Submission**

- Multi-step form with validation
- **Photo Evidence Upload** - Base64 encoding for seamless storage
- **NIN Verification** - Mock verification system (11-digit validation)
- **Location Tracking** - District-based complaint mapping
- **SMS Acknowledgment** - Instant reference ID delivery via Twilio

### 2. **Complaint Tracking**

- Real-time status lookup by reference ID
- Status timeline visualization
- Ministry and location details
- Date-stamped records

### 3. **Admin Dashboard**

- Secure token-based authentication
- **Real-time Analytics:**
  - Total complaints counter
  - Status distribution chart (Bar chart)
  - Ministry hotspot analysis
  - District-based complaint mapping
- **Advanced Filtering:**
  - Status-based filters
  - Date range selection
  - Clear filter option
- **Pagination:** 10 items per page for optimal UX
- **Status Management:** Update complaint status with audit trail
- **CSV Export:** Download filtered data for reporting
- **Evidence Viewer:** View uploaded photo evidence in modal
- **NIN Display:** Show verified NIN with badge

### 4. **SMS Integration**

- **Submission Confirmation:** Auto-sent with reference ID and tracking link
- **Status Updates:** SMS alerts when admin changes complaint status
- Live Twilio integration (production-ready)

### 5. **Data Visualization**

- Interactive bar charts for analytics
- Responsive design for mobile and desktop
- Color-coded status indicators

---

## 📂 Project Structure

```
ombudsman_portal/
├── backend/
│   ├── main.py              # FastAPI application entry point
│   ├── database.py          # SQLAlchemy setup + Vercel /tmp fix
│   ├── models.py            # Database models (Complaint, AuditLog)
│   ├── schemas.py           # Pydantic schemas for validation
│   ├── routers/
│   │   ├── public.py        # Public API (submit, track complaints)
│   │   ├── admin.py         # Admin API (analytics, status updates)
│   │   └── sms.py           # SMS testing endpoint
│   └── requirements.txt     # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx              # Landing page
│   │   │   ├── SubmitComplaint.tsx   # Complaint submission form
│   │   │   ├── TrackComplaint.tsx    # Track status page
│   │   │   ├── AdminLogin.tsx        # Admin authentication
│   │   │   └── AdminDashboard.tsx    # Admin panel
│   │   ├── assets/
│   │   │   └── LogoBase64.ts         # Embedded logo (no CDN dependency)
│   │   ├── App.tsx           # React Router setup
│   │   └── main.tsx          # React entry point
│   ├── public/
│   │   └── _redirects        # Netlify routing config
│   ├── package.json          # Node dependencies
│   └── vite.config.ts        # Vite configuration + proxy
│
├── vercel.json               # Vercel rewrites + API routing
└── LICENSE                   # MIT License
```

---

## 🔧 API Endpoints

### Public Routes (`/api/public`)

#### POST `/complaint`

Submit a new complaint.

**Body:**

```json
{
  "ministry": "Health",
  "location": "Abuja",
  "official_name": "Dr. John Doe",
  "details": "Complaint details here...",
  "phone_number": "+234XXXXXXXXXX",
  "nin": "12345678901",
  "evidence": "data:image/jpeg;base64,..."
}
```

**Response:**

```json
{
  "reference_id": "REF-ABC123",
  "ministry": "Health",
  "status": "submitted",
  "created_at": "2025-11-29T12:00:00",
  "is_verified": true
}
```

#### GET `/complaint/{reference_id}`

Track complaint by reference ID.

**Response:**

```json
{
  "reference_id": "REF-ABC123",
  "ministry": "Health",
  "location": "Abuja",
  "status": "in_review",
  "details": "Complaint details...",
  "created_at": "2025-11-29T12:00:00"
}
```

### Admin Routes (`/api/admin`)

_Requires `x-admin-token` header_

#### GET `/complaints`

List all complaints with full details.

#### GET `/analytics`

Get complaint statistics.

**Response:**

```json
{
  "total_complaints": 42,
  "by_status": {
    "submitted": 15,
    "in_review": 10,
    "resolved": 12,
    "rejected": 5
  }
}
```

#### PATCH `/complaint/{reference_id}/status`

Update complaint status (triggers SMS notification).

**Body:**

```json
{
  "status": "resolved"
}
```

---

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.9+
- **Twilio Account** (for SMS - optional for local dev)

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
# Create .env file:
# TWILIO_ACCOUNT_SID=your_sid
# TWILIO_AUTH_TOKEN=your_token
# TWILIO_PHONE_NUMBER=your_number

# Run server
uvicorn main:app --reload --port 8000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment (for production)
# Create .env file:
# VITE_BACKEND_URL=https://your-backend-url/api

# Run dev server
npm run dev

# Build for production
npm run build
```

---

## 🌐 Deployment

### Vercel (Frontend + Backend Monorepo)

1. Push code to GitHub
2. Import repository in Vercel
3. Set environment variables:
   - `VITE_BACKEND_URL`: `https://ombudsman-frontend-production-6c5b.up.railway.app/api`
   - `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`
4. Deploy

### Railway (Backend Only)

1. Connect GitHub repository
2. Set root directory to `backend/`
3. Configure environment variables
4. Deploy

---

## 🔐 Security Features

- **Token-based Admin Authentication** - Hardcoded for MVP (production would use JWT)
- **Input Validation** - Pydantic schemas enforce data integrity
- **SQL Injection Protection** - SQLAlchemy ORM prevents injection attacks
- **CORS Configuration** - Controlled origin access
- **Environment Variables** - Secrets stored securely

---

## 📊 Data Models

### Complaint

```python
class Complaint(Base):
    id: int (PK)
    reference_id: str (unique)
    ministry: str
    location: str (nullable)
    official_name: str (nullable)
    details: str
    phone_number: str (nullable)
    nin: str (nullable)
    evidence_data: str (Base64, nullable)
    status: str (submitted|in_review|resolved|rejected)
    is_verified: bool
    created_at: datetime
```

### AuditLog

```python
class AuditLog(Base):
    id: int (PK)
    complaint_id: int (FK)
    previous_status: str
    new_status: str
    changed_by: str
    timestamp: datetime
```

---

## 🚀 Future Roadmap

### Phase 2: Universal Access Features

#### 1. **USSD Integration** ⭐ Priority Feature

**Problem Statement:** In Sierra Leone, ~60% of mobile users own feature phones without internet access. Currently, these citizens cannot access OmbudsLink.

**Solution:** USSD (Unstructured Supplementary Service Data) menu system accessible by dialing `*920#` on any phone.

**User Flow:**

```
User dials: *920#

→ Welcome to OmbudsLink
  1. File Complaint
  2. Track Complaint
  3. Help

User presses: 1

→ Select Ministry:
  1. Health
  2. Education
  3. Agriculture
  4. Energy
  5. More...

User presses: 1

→ Enter your phone number:
User enters: 76543210

→ Enter location (district):
User types: Western Urban

→ Describe complaint (max 160 chars):
User types: Hospital fees too high, no receipt given

→ ✓ Complaint filed!
   Ref: ABC-123
   SMS sent to 76543210
```

**Technical Implementation:**

- **Partner:** Africell, Orange SL, or Sierratel
- **Gateway:** AfricasTalking or Twilio USSD API
- **Backend:** New `/ussd/menu` endpoint with session management
- **Cost:** ~$50-100/month for 1,000 sessions
- **Timeline:** 2-3 weeks development + 1 week pilot testing

**Impact:**

- ✅ **Zero internet** required
- ✅ Works on **any mobile phone** (including old Nokia models)
- ✅ **Instant feedback** (real-time menu navigation)
- ✅ **Low cost** for citizens (often free on telco networks)

---

#### 2. **IVR Voice Complaint System**

**Problem Statement:** ~30% of Sierra Leone's adult population is illiterate. Text-based systems exclude these citizens.

**Solution:** Interactive Voice Response (IVR) system accessible via toll-free hotline.

**User Flow:**

```
User calls: 1-800-OMBUDS

→ Audio: "Press 1 for English, 2 for Krio, 3 for Mende"
User presses: 2

→ Audio: "Press 1 to file complaint, 2 to track complaint"
User presses: 1

→ Audio: "After the beep, describe your complaint. You have 60 seconds."
User speaks: [Records voice message]

→ Audio: "Thank you. Your reference ID is Alpha-Bravo-1-2-3.
         You will receive an SMS confirmation."

→ SMS sent with reference ID and tracking instructions
```

**Technical Implementation:**

- **Provider:** Twilio Voice API (already integrated)
- **Backend Changes:**
  - Audio file storage (S3 or Cloudinary)
  - Speech-to-text transcription (optional, for analytics)
  - Admin dashboard audio player
- **Cost:** ~$0.01/minute per call
- **Timeline:** 2-3 weeks development

**Impact:**

- ✅ **Illiterate-friendly** (no reading required)
- ✅ **Emotional context** captured in voice tone
- ✅ **Multilingual support** (English, Krio, Mende, Temne)
- ✅ **Accessibility** for visually impaired citizens

---

#### 3. **Blockchain Audit Trail** 🔗

**Current State:** Complaint records stored in SQL database (mutable).

**Future Enhancement:** Hash complaint data and commit to immutable blockchain ledger.

**Technical Approach:**

```python
# When complaint is created:
complaint_hash = sha256(
    complaint.reference_id +
    complaint.ministry +
    complaint.details +
    complaint.created_at
).hexdigest()

# Commit to blockchain (e.g., Ethereum, Polygon)
transaction = blockchain.submit_hash(complaint_hash)
complaint.blockchain_tx_id = transaction.id
```

**Benefits:**

- ✅ **Tamper-proof records** (government accountability)
- ✅ **Public verification** (anyone can verify complaint integrity)
- ✅ **Transparency** (audit trail visible on blockchain explorer)

**Timeline:** 3-4 weeks development

---

#### 4. **Geolocation Enhancements**

**Current State:** Manual location entry (district dropdown).

**Future Enhancement:** Automatic GPS coordinates capture with map visualization.

**Features:**

- Real-time GPS coordinates on complaint submission (web users)
- **Admin Dashboard:** Interactive map showing complaint distribution
- **Hotspot Detection:** Algorithmic identification of geographic corruption clusters
- **Mobile Geofencing:** Auto-detect government offices and suggest relevant ministries

**Timeline:** 2 weeks development

---

#### 5. **AI-Powered Analytics**

**Problem:** Admins manually read every complaint to categorize and prioritize.

**Solution:** Natural Language Processing (NLP) for automatic:

- **Category Detection:** Auto-tag complaints (corruption, delays, fees, etc.)
- **Urgency Scoring:** Flag urgent cases (medical emergencies, safety threats)
- **Sentiment Analysis:** Detect angry/distressed complainants for priority handling
- **Duplicate Detection:** Identify related complaints for batch resolution

**Tech Stack:**

- **Model:** OpenAI GPT-4 API or local Hugging Face models
- **Languages:** English, Krio (fine-tuned model)

**Timeline:** 4-6 weeks development + training

---

### Implementation Priority

| Feature          | Impact                              | Cost   | Timeline  | Priority   |
| ---------------- | ----------------------------------- | ------ | --------- | ---------- |
| **USSD**         | 🔥 Very High (60% population reach) | Low    | 2-3 weeks | ⭐⭐⭐⭐⭐ |
| **IVR Voice**    | 🔥 High (30% illiterate citizens)   | Medium | 2-3 weeks | ⭐⭐⭐⭐   |
| **Geolocation**  | Medium (urban users)                | Low    | 2 weeks   | ⭐⭐⭐     |
| **Blockchain**   | Medium (transparency)               | Medium | 3-4 weeks | ⭐⭐⭐     |
| **AI Analytics** | High (admin efficiency)             | High   | 4-6 weeks | ⭐⭐⭐⭐   |

---

## 🎨 Design Philosophy

- **User-Centric:** Clean, intuitive interface for all users
- **Mobile-First:** Responsive design for accessibility
- **Performance:** Optimized builds with code splitting
- **Accessibility:** Semantic HTML and ARIA labels
- **Error Handling:** Graceful degradation with user-friendly messages

---

## 📝 License

MIT License - See `LICENSE` file for details.

---

## 👥 Contributors

Built for the **Big 5 AI and Blockchain Hackathon 2025**

---

## 🔗 Links

- **Live Application:** https://ombudsman-frontend-theta.vercel.app/
- **Backend API:** https://ombudsman-frontend-production-6c5b.up.railway.app/api
- **GitHub Repository:** [Upload your repo URL here]

---

## 📧 Contact

For technical questions or support, please reach out to the development team.

