# 🚀 FINAL DEPLOYMENT GUIDE - OmbudsLink

## ⚠️ CRITICAL: Set This Environment Variable in Vercel

Before deploying, you MUST set this in Vercel:

**Environment Variable:**

- **Name**: `VITE_BACKEND_URL`
- **Value**: `https://ombudsman-frontend-production-6c5b.up.railway.app/api`
- **Scope**: Production, Preview, Development

### How to Set in Vercel:

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. If `VITE_BACKEND_URL` already exists, **EDIT** it (don't create duplicate)
3. Set the value to your Railway backend URL
4. **IMPORTANT**: Click **Redeploy** after saving

---

## 📦 What's Included in This Package:

### ✅ Working Features:

1. **Complaint Submission** - Web form with photo upload, NIN verification
2. **SMS Notifications** - Twilio integration (instant alerts)
3. **Complaint Tracking** - Public tracking by reference ID
4. **Admin Dashboard** - Analytics, filters, pagination, CSV export
5. **USSD Prototype** - Feature phone access via `*920#` (backend ready)
6. **GPS Geolocation** - Database fields ready for coordinates
7. **AI Analytics** - Auto-categorization, urgency scoring, sentiment analysis

### 🗂️ File Structure:

```
ombudsman_portal/
├── backend/
│   ├── main.py
│   ├── models.py (GPS + AI fields)
│   ├── schemas.py (updated)
│   ├── ai_analytics.py (NEW - AI module)
│   ├── routers/
│   │   ├── public.py (AI integrated)
│   │   ├── admin.py
│   │   ├── sms.py
│   │   └── ussd.py (NEW - USSD logic)
│   └── requirements.txt
│
├── frontend/
│   ├── src/pages/
│   │   ├── Home.tsx
│   │   ├── SubmitComplaint.tsx (uses VITE_BACKEND_URL)
│   │   ├── TrackComplaint.tsx (uses VITE_BACKEND_URL)
│   │   ├── AdminLogin.tsx
│   │   └── AdminDashboard.tsx (uses VITE_BACKEND_URL)
│   └── dist/ (build output)
│
├── README.md (comprehensive docs)
├── USSD_DEMO.html (interactive simulator)
├── GEOLOCATION_AI_FEATURES.md (feature docs)
└── vercel.json
```

---

## 🔧 Quick Start:

### Backend (Local Testing):

```bash
cd ombudsman_portal/backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend (Local Testing):

```bash
cd ombudsman_portal/frontend
npm install
npm run dev
```

---

## 🌐 Deployment Steps:

### Option 1: Vercel (Frontend) + Railway (Backend) - RECOMMENDED

#### Step 1: Deploy Backend to Railway

1. Push code to GitHub
2. Go to Railway.app → New Project → Deploy from GitHub
3. Select `backend/` as root directory
4. Add environment variables:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_PHONE_NUMBER`
5. Deploy → Copy the generated Railway URL

#### Step 2: Deploy Frontend to Vercel

1. Go to Vercel.com → New Project
2. Import from GitHub
3. **Root Directory**: `.` (project root)
4. **Build Command**: `cd frontend && npm install && npm run build`
5. **Output Directory**: `frontend/dist`
6. Add environment variables:
   - **`VITE_BACKEND_URL`** = `https://your-railway-url/api` ← **CRITICAL!**
7. Deploy

---

## 🧪 Testing Checklist:

After deployment, test these URLs:

### Frontend:

- [ ] `https://your-vercel-url.vercel.app/` - Home page loads
- [ ] `/submit` - Complaint form works
- [ ] `/track` - Tracking page works
- [ ] `/admin` - Admin login works (token: `P@s5w0rd@2026`)
- [ ] `/admin/dashboard` - Dashboard loads with data

### Backend API:

- [ ] `https://your-railway-url/api` - Returns API status
- [ ] `https://your-railway-url/api/ussd/status` - USSD service active

### Submit Test Complaint:

1. Go to `/submit`
   2 Fill form and submit
2. Should see success message with Reference ID
3. SMS should be sent (if Twilio configured)
4. Check `/admin/dashboard` - complaint appears
5. AI category, urgency, sentiment should be auto-populated

---

## 🐛 Common Issues:

### "Failed to submit complaint"

**Cause**: `VITE_BACKEND_URL` not set or incorrectly set in Vercel  
**Fix**:

1. Vercel Dashboard → Settings → Environment Variables
2. **EDIT** (don't create new) `VITE_BACKEND_URL`
3. Value: `https://your-railway-backend.railway.app/api`
4. **Redeploy** the frontend

### "Track Complaint" shows empty page

**Cause**: Same as above (backend URL not configured)  
**Fix**: Same as above

### "Admin Dashboard" shows no data

**Cause**: CORS or authentication issue  
**Fix**: Check browser console for errors. Ensure token is `P@s5w0rd@2026`

### Database errors after adding GPS/AI fields

**Cause**: Old database doesn't have new columns  
**Fix**: Railway will auto-create new database on first deploy (SQLite + SQLAlchemy)

---

## 📊 Feature Demos for Judges:

### 1. USSD Simulator Demo:

- Open `USSD_DEMO.html` in browser
- Click "DIAL \*920#"
- Follow on-screen prompts
- Shows feature phone accessibility

### 2. AI Analytics Demo:

- Submit complaint with text: _"Hospital doctor was very rude and refused emergency treatment"_
- Check Admin Dashboard
- Should see:
  - **Category**: `rudeness`
- **Urgency**: `8-9/10`
- **Sentiment**: `negative`

### 3. SMS Integration:

- Configure Twilio (optional)
- Submit complaint with phone number
- Receive instant SMS with reference ID

---

## 📝 Admin Credentials:

- **URL**: `https://your-vercel-url/admin`
- **Token**: `P@s5w0rd@2026`

---

## 🎯 For Hackathon Submission:

### Video Recording Tips:

1. **Presentation Video** (3 min):

   - Show problem (distance, cost barriers)
   - Demo web submission
   - Show SMS notification
   - Mention USSD for feature phones
   - Show admin dashboard analytics

2. **Technical Video** (3 min):
   - Show codebase structure
   - Explain FastAPI + React architecture
   - Demo USSD simulator
   - Highlight AI analytics in action
   - Show GitHub repo

---

## 🚀 Production Readiness:

This app is **deployment-ready** with:

- ✅ Modern tech stack (React, FastAPI, SQLAlchemy)
- ✅ Real SMS integration (Twilio)
- ✅ AI-powered features (category, urgency, sentiment)
- ✅ Feature phone support (USSD prototype)
- ✅ Secure authentication
- ✅ Professional documentation
- ✅ Open source (MIT License)

---

## 📧 Support:

If you encounter issues:

1. Check browser console for errors
2. Verify `VITE_BACKEND_URL` is correctly set
3. Ensure backend is deployed and running
4. Test backend API directly: `https://your-railway-url/api`

---

**Good luck with your submission! 🎉**
