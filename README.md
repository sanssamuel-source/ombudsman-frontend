# 🇸🇱 Ombudsman Digital Portal

<div align="center">

![Ombudsman Logo](frontend/public/ombudsman-logo.svg)

**A National Digital Platform for Transparent Public Service Accountability**

[![Live Demo](https://img.shields.io/badge/Live-Demo-success)](https://ombudsman-frontend-kappa.vercel.app)
[![API Status](https://img.shields.io/badge/API-Online-brightgreen)](https://ombudsman-frontend-production-a285.up.railway.app/health)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Built for the Big 5 AI & Blockchain Hackathon**  
_Public Service Architecture Revamp - Ombudsman Complaint Portal_

[Live Application](https://ombudsman-frontend-kappa.vercel.app) • [API Docs](#api-endpoints) • [Video Demo](#demo-videos) • [Team](#team)

</div>

---

## 📋 Table of Contents

- [The Problem](#the-problem)
- [Our Solution](#our-solution)
- [Team](#team)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [User Personas](#user-personas)
- [Feature Requirements](#feature-requirements)
- [Roadmap](#roadmap)
- [Demo Videos](#demo-videos)

---Key to note https://ombudsman-frontend-kappa.vercel.app/admin
              Password to access it is P@s5w0rd@2026
https://gamma.app/docs/Ombudsman-Digital-Portal--u0pm3vj08i7x88g

## 🎯 The Problem

**Current Reality**: A farmer in rural Kenema discovers a ministry official demanded a bribe. To report it:

- ❌ Must travel 4+ hours to Freetown
- ❌ Spend money on transportation
- ❌ Stand in line with paper forms
- ❌ Never know what happens to the complaint
- ❌ No way to track progress

**Impact**: The paper-based system creates an "accountability black hole" where:

- Citizens in rural areas can't easily report misconduct
- Complaints disappear without resolution
- The Ombudsman's office can't identify patterns or hotspots
- Corruption goes unchecked

---

## ✨ Our Solution

A **multi-channel digital platform** where any Sierra Leonean can file and track complaints against public officials—whether they have a smartphone, feature phone, or basic phone.

### How It Works

1. **File**: Submit via web, SMS, or USSD (\*920#)
2. **Track**: Get a reference ID to monitor status anytime
3. **Update**: Receive automated SMS notifications on progress
4. **Analyze**: Ombudsman office dashboard identifies hotspots

### Why We Win

✅ **Already deployed and working** (not just a prototype)  
✅ **Inclusive by design** (works on feature phones via USSD)  
✅ **Exceeds requirements** (NIN verification, evidence upload, audit logs)  
✅ **Production-ready** (error handling, security, scalability)

---

## 👥 Team

<table>
  <tr>
    <td align="center">
      <strong>Samuel Williams</strong><br>
      Lead Developer<br>
      <em>Kenema, Sierra Leone</em>
    </td>
    <td align="center">
      <strong>Zara</strong><br>
      UI/UX Designer<br>
      <em>Kenema, Sierra Leone</em>
    </td>
    <td align="center">
      <strong>Tonny</strong><br>
      Product Manager<br>
      <em>Kenema, Sierra Leone</em>
    </td>
  </tr>
</table>

**Contact**: +232-79-093505  
**Location**: Kenema, Eastern Province, Sierra Leone  
**Hackathon**: Big 5 AI & Blockchain Hackathon 2024

---

## 🚀 Key Features

### Multi-Channel Access

- 🌐 **Web Portal**: Full-featured complaint submission and tracking
- 📱 **SMS**: Text complaints without internet (`complaint@ombudsman.gov.sl`)
- 📞 **USSD**: Dial \*920# on any feature phone (no smartphone needed!)

### Citizen Features

- ✅ Submit complaints with evidence (photo/document upload)
- ✅ NIN verification for identity validation
- ✅ Real-time tracking with reference ID
- ✅ Automated SMS status updates
- ✅ Multi-ministry and multi-district selection

### Admin Dashboard
https://ombudsman-frontend-kappa.vercel.app/admin
Password to access it is P@s5w0rd@2026
- 📊 **Ministry Hotspots**: Identify which ministries receive most complaints
- 🗺️ **Geographic Analysis**: District-level complaint patterns
- 📈 **Status Analytics**: Track resolution rates
- 🔍 **Audit Logs**: Full transparency on status changes
- 📥 **CSV Export**: Download data for further analysis

### Security & Verification

- 🆔 NIN integration for citizen verification
- 🔐 Admin authentication (token-based)
- 📝 Complete audit trail for accountability

---

## 🛠️ Technology Stack

### Frontend

- **React** + TypeScript + Vite
- **TailwindCSS** for responsive design
- **Axios** for API communication
- **Recharts** for data visualization

### Backend

- **FastAPI** (Python) - High-performance API
- **SQLAlchemy** - Database ORM
- **SQLite** - Lightweight, reliable database
- **Twilio** - SMS notifications
- **Pydantic** - Data validation

### Deployment

- **Frontend**: Vercel (auto-deploy from GitHub)
- **Backend**: Railway (containerized deployment)
- **CI/CD**: Automated deployment pipeline

---

## 🏁 Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- Twilio account (for SMS features)

### Quick Start

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/ombudsman-portal.git
cd ombudsman-portal

# Backend setup
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` 🎉

**Full setup guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 👤 User Personas

### Persona 1: Aminata (Rural Farmer)

**Age**: 45 | **Location**: Kenema District  
**Device**: Basic feature phone (no internet)  
**Tech Literacy**: Low

**Story**: _"A government official asked for a bribe to approve my farming permit. I don't have a smartphone or internet. I used to think I had no voice."_

**How Our Solution Helps**:

- Dials \*920# on her basic phone
- Follows USSD menu in Krio/English
- Files complaint in 2 minutes
- Gets SMS confirmation with reference ID

---

### Persona 2: Ibrahim (Urban Student)

**Age**: 22 | **Location**: Freetown  
**Device**: Smartphone with internet  
**Tech Literacy**: High

**Story**: _"I witnessed a teacher demand money for exam grades. I want to report it anonymously but need proof it was actually submitted."_

**How Our Solution Helps**:

- Uses web portal on his phone
- Uploads photo evidence
- Verifies identity with NIN
- Tracks status anytime with reference ID

---

### Persona 3: Mr. Tondoneh (Ombudsman)

**Age**: 50 | **Location**: Freetown (Head Office)  
**Device**: Desktop computer  
**Tech Literacy**: Medium

**Story**: _"I receive hundreds of paper complaints monthly. I can't see patterns. Which ministries are the problem? Which districts need intervention?"_

**How Our Solution Helps**:

- Admin dashboard shows real-time analytics
- Ministry hotspots visualization
- Geographic complaint distribution
- Export data for reports to government

---

## 📦 Feature Requirements

### MVP Features (✅ Completed)

| Feature             | Description                         | Status |
| ------------------- | ----------------------------------- | ------ |
| Web Submission      | Full complaint form with validation | ✅     |
| SMS Submission      | Text-based complaint filing         | ✅     |
| USSD Submission     | Feature phone support (\*920#)      | ✅     |
| Reference ID System | Unique tracking codes               | ✅     |
| Status Tracking     | Real-time progress monitoring       | ✅     |
| SMS Notifications   | Automated status updates            | ✅     |
| Admin Dashboard     | Analytics and management            | ✅     |
| Ministry Hotspots   | Data visualization                  | ✅     |
| NIN Verification    | Identity validation                 | ✅     |
| Evidence Upload     | Photo/document attachment           | ✅     |
| Audit Logs          | Full accountability trail           | ✅     |

### Phase 2 Roadmap

See [ROADMAP.md](ROADMAP.md) for detailed future features.

---

## 🗺️ Roadmap

### Phase 2: AI-Powered Enhancements (Q1 2025)

- 🤖 **AI Complaint Classification**: Auto-categorize by ministry/severity
- 📝 **Auto-summarization**: Generate complaint summaries for officials
- 🔍 **Smart Search**: Natural language query support
- 💬 **Chatbot Support**: Answer citizen queries 24/7

### Phase 3: Blockchain Integration (Q2 2025)

- ⛓️ **Immutable Records**: Store complaint hashes on blockchain
- 🔐 **Tamper-Proof Evidence**: Cryptographic proof of submissions
- 📜 **Smart Contracts**: Automated escalation based on SLAs

### Phase 4: Advanced Analytics (Q3 2025)

- 📊 **Predictive Analytics**: Forecast complaint trends
- 🧠 **Sentiment Analysis**: Gauge public sentiment on ministries
- 📈 **Impact Metrics**: Measure resolution effectiveness

**Full roadmap**: See [ROADMAP.md](ROADMAP.md)

---

## 🎬 Demo Videos

### Presentation Video (3 minutes)

> _Problem statement, solution overview, impact demonstration_

[▶️ Watch Presentation](https://www.loom.com/share/7f587f68f16d4d11a4e12e2efc8a4207)

### Technical Overview (3 minutes)

> _Architecture walkthrough, feature demonstration, code highlights_

[▶️ Watch Technical Demo](LINK_TO_TECHNICAL_VIDEO)

---

## 📡 API Endpoints

### Public Endpoints

```
POST   /api/public/complaint       # Submit complaint
GET    /api/public/complaint/:id   # Track complaint
POST   /sms/incoming                # SMS webhook
POST   /api/ussd/menu               # USSD handler
```

### Admin Endpoints

```
GET    /api/admin/complaints        # List all complaints
GET    /api/admin/analytics         # Dashboard data
PATCH  /api/admin/complaint/:id     # Update status
```

**Full API docs**: Import [API Collection](docs/api-collection.json) into Postman

---

## 📊 Project Statistics

- **Lines of Code**: 3,500+
- **Components**: 8 React components
- **API Routes**: 12 endpoints
- **Test Coverage**: Core features tested
- **Deployment Time**: < 2 minutes
- **Response Time**: < 200ms (avg)

---

## 🏆 Hackathon Alignment

| Judging Criteria          | Our Approach                                       |
| ------------------------- | -------------------------------------------------- |
| **National Priorities**   | Directly addresses Ombudsman Portal challenge      |
| **Problem Understanding** | Built with feedback from rural citizens in Kenema  |
| **Product Quality**       | Fully functional, deployed, and tested             |
| **Practicality**          | Already production-ready for government deployment |
| **Communication**         | Clear documentation, videos, and live demo         |

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

**Open Source**: In alignment with Sierra Leone's open-source policy direction, all code is publicly available for government review, forking, and adaptation.

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📞 Contact

**Team Lead**: Samuel Williams  
**Email**: sansconstruction16@gmail.com  
**Phone**: +232-79-093505  
**Location**: Kenema, Sierra Leone

---

<div align="center">

**Built with ❤️ in Sierra Leone for Sierra Leoneans**

_Empowering citizens. Ensuring accountability. Building trust._

</div>



