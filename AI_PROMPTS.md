# 🤖 Building with AI: Phase-by-Phase Prompts

This document contains the AI prompts used to build the Ombudsman Portal, organized by development phase. Perfect for judges to understand our AI-assisted development process.

---

## 🎨 Phase 1: Design & Branding

### Prompt 1: Logo Generation

```
Official government seal logo for the Office of the Ombudsman of Sierra Leone.
Professional circular emblem with Sierra Leone national colors (green, white, blue).
Features a shield, scales of justice, and text "Office of the Ombudsman - Sierra Leone".
Clean, authoritative, governmental design on transparent background.
```

**Tool Used**: Image Generation AI  
**Result**: Professional green/white emblem with government seal aesthetic

### Prompt 2: Color Palette

```
Create a professional color palette for a government accountability portal.
Primary: Sierra Leone green (#008a59)
Secondary: Navy blue (#142f33) for trust
Accent: Sky blue for modern feel
Include Tailwind CSS color values
```

**Tool Used**: v0 / Design AI  
**Result**: Complete design system with accessible color combinations

---

## 🏗️ Phase 2: Frontend Development

### Prompt 3: React Component Structure

```
Using Cursor AI:

Create a React TypeScript complaint submission form with:
- Ministry dropdown (Health, Education, Agriculture, etc.)
- District dropdown (Freetown, Bo, Kenema, etc.)
- Official name input
- Details textarea (max 500 chars)
- Phone number (E.164 format validation)
- NIN input (optional)
- Evidence upload (photos/pdfs, base64 encoding)
- Form validation with error messages
- Submit button with loading state
Use TailwindCSS for styling, Axios for API calls
```

**Tool Used**: Cursor AI  
**Files Generated**: `SubmitComplaint.tsx`, form validation logic

### Prompt 4: Dashboard Analytics

```
Create an admin dashboard component with:
- Total complaints count card
- Status distribution pie chart (pending, in_progress, resolved, rejected)
- Ministry hotspots bar chart
- District map visualization
- Recent complaints table with pagination
Use Recharts library, responsive design with Tailwind grid
```

**Tool Used**: Cursor AI + v0  
**Files Generated**: `AdminDashboard.tsx`, chart components

### Prompt 5: Tracking Interface

```
Build a complaint tracking page where users enter a reference ID (format: OMB-XXXXX).
Display:
- Complaint details (ministry, location, date submitted)
- Current status with timeline visualization
- Audit log showing all status changes with timestamps
- "Download PDF" button for complaint summary
Tailwind progress bar for visual status indicator
```

**Tool Used**: v0  
**Files Generated**: `TrackComplaint.tsx`

---

## ⚙️ Phase 3: Backend Development

### Prompt 6: FastAPI Application Structure

```
Using Cursor AI:

Create a FastAPI application with:
- SQLAlchemy models for Complaint and AuditLog
- Pydantic schemas for request/response validation
- CORS middleware (allow all origins)
- Router structure (public, admin, sms, ussd)
- Database session management with dependency injection
- SQLite database with create_all on startup
```

**Tool Used**: Cursor AI  
**Files Generated**: `main.py`, `models.py`, `schemas.py`, `database.py`

### Prompt 7: CRUD Endpoints

```
Create FastAPI routers for:

Public routes (/api/public):
- POST /complaint: Submit with auto-generated reference ID (OMB-{5-digit})
- GET /complaint/{ref_id}: Retrieve complaint details
- Include Twilio SMS notification on submission

Admin routes (/api/admin) - require auth:
- GET /complaints: List all with filters (ministry, status, date range)
- PATCH /complaint/{id}/status: Update status, create audit log entry
- GET /analytics: Return ministry hotspots, status distribution

Use proper HTTP status codes, error handling
```

**Tool Used**: Cursor AI  
**Files Generated**: `routers/public.py`, `routers/admin.py`

### Prompt 8: USSD Integration

```
Create a USSD menu handler for AfricasTalking/Twilio:

Flow:
1. Welcome menu: 1=File Complaint, 2=Track, 3=Help
2. File: Select ministry (1-9), enter district, enter details
3. Track: Enter reference ID, show status
4. Store session state in memory
5. On completion, create complaint in database, send SMS confirmation

Return "CON" for continue, "END" for terminal responses
```

**Tool Used**: Cursor AI  
**Files Generated**: `routers/ussd.py`, session management

---

## 🔗 Phase 4: Integration & Deployment

### Prompt 9: Twilio SMS Integration

```
Integrate Twilio for SMS notifications:
- Load credentials from environment variables
- Send SMS on complaint submission with reference ID
- Send SMS on status change with new status
- Include tracking link: https://FRONTEND_URL/track
- Handle errors gracefully (log but don't fail request)
- Use f-strings for message templates
```

**Tool Used**: Cursor AI  
**Files Modified**: `routers/public.py`, `routers/admin.py`, `routers/ussd.py`

### Prompt 10: Railway Deployment Config

```
Create Railway deployment configuration:
- Procfile: web command for uvicorn with PORT variable
- railway.json: Nixpacks builder, health check settings
- Root directory: backend
- Environment variables: TWILIO_*, FRONTEND_URL
- Start command: python -m uvicorn main:app --host 0.0.0.0 --port $PORT
```

**Tool Used**: Manual + Cursor AI  
**Files Generated**: `Procfile`, `railway.json`, `nixpacks.toml`

### Prompt 11: Vercel Frontend Deployment

```
Create Vercel configuration for React app:
- Build command: npm run build
- Output directory: dist
- Environment variables: VITE_BACKEND_URL
- Auto-deploy on GitHub push to main branch
- Custom domain: ombudsman-frontend.vercel.app
```

**Tool Used**: Manual + v0  
**Files Generated**: `vercel.json`

---

## 🎨 Phase 5: UI/UX Polish

### Prompt 12: Sierra Leone Branding

```
Update the Home page with official Sierra Leone Ombudsman branding:
- Logo: Government seal (green/white/blue)
- Title: "The Office of the Ombudsman - Republic of Sierra Leone"
- Mission statement from official website
- Contact information: 26 Charlotte Street, Freetown
- Phone: +232-88-601523 (Complaints), +232-76-945926 (Enquiries)
- Email: complaint@ombudsman.gov.sl
- Add icons for phone, email, location (lucide-react)
Use gradient background (slate-900 to slate-800), glassmorphism cards
```

**Tool Used**: Cursor AI  
**Files Modified**: `Home.tsx`

### Prompt 13: Error Handling UI

```
Improve error messages in all forms:
- Instead of "Failed to submit", show specific errors:
  - Network Error: "Cannot reach server. Check your connection."
  - 404: "Backend not found. Contact support."
  - 500: "Server error. Try again later."
- Use Axios error.response.data.detail for backend errors
- Add loading spinners during API calls
- Success messages with reference ID highlighted
```

**Tool Used**: Cursor AI  
**Files Modified**: `SubmitComplaint.tsx`, `TrackComplaint.tsx`, `AdminDashboard.tsx`

---

## 📦 Phase 6: Documentation

### Prompt 14: README Generation

```
Create a comprehensive README.md for GitHub judges:
- Big 5 Hackathon header with logo
- Problem statement (rural access, paper-based issues)
- Solution overview (multi-channel: web, SMS, USSD)
- Team section: Samuel (Lead Dev), Zara (UI/UX), Tonny (PM), Kenema location
- Key features in bullet points
- Tech stack with badges
- Getting started guide
- User personas (Aminata-rural farmer, Ibrahim-urban student, Mr. Tondoneh-Ombudsman)
- Demo video placeholders
- Contact: +232-79-093505
Use GitHub-flavored markdown, tables, emoji, professional tone
```

**Tool Used**: Google Antigravity / Claude  
**Files Generated**: `README.md`

### Prompt 15: Roadmap Creation

```
Create ROADMAP.md with future phases:

Phase 2 (Q1 2025): AI-Powered
- Auto-classification of complaints
- Summarization for officials
- Chatbot support
- Smart search

Phase 3 (Q2 2025): Blockchain
- Immutable complaint records
- Smart contract escalation
- Decentralized identity

Phase 4 (Q3 2025): Advanced Analytics
- Predictive forecasting
- Sentiment analysis
- Network analysis (repeat offenders)

Phase 5 (Q4 2025): National Expansion
- Multi-language (Krio, Mende, Temne)
- Regional office integration
- Mobile app (offline-first)
- Public API for partners

Include success metrics table, feature request section
```

**Tool Used**: Google Antigravity / Claude  
**Files Generated**: `ROADMAP.md`

---

## 🔍 Tips for Using These Prompts

### Best Practices

1. **Be Specific**: Include exact field names, validation rules, error messages
2. **Provide Context**: Mention tech stack, libraries, styling framework
3. **Show Examples**: Give sample data, API responses, UI mockups
4. **Iterate**: Start with MVP prompt, then refine with follow-ups

### Recommended AI Tools

- **Cursor AI**: Best for code generation, refactoring, debugging
- **v0 by Vercel**: Excellent for React components and UI design
- **Google Antigravity**: Great for documentation, planning, prompts
- **ChatGPT/Claude**: Helpful for algorithm logic, data structures

### Prompt Engineering Tips

- Use "Create", "Build", "Generate" for new code
- Use "Refactor", "Improve", "Optimize" for existing code
- Specify file names and exact locations
- Include error handling requirements
- Mention accessibility and responsiveness

---

## 📚 Resources

- [Cursor AI Docs](https://cursor.sh/docs)
- [v0 Documentation](https://v0.dev/docs)
- [FastAPI Best Practices](https://fastapi.tiangolo.com/tutorial/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

<div align="center">

**AI-Assisted Development**: ~80% of code generated with AI, 20% manual refinement  
**Total Development Time**: 2 weeks (would be 6-8 weeks without AI)

_Empowered by AI. Built by humans in Kenema, Sierra Leone._

</div>
