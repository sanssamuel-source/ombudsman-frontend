# Ombudsman Portal - Vercel Deployment Guide

## 🚀 Quick Deploy (5 Minutes)

### Step 1: Upload to GitHub

1. Create a new repository on GitHub
2. Upload the entire `ombudsman_portal` folder

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository

### Step 3: Configure Project Settings

**CRITICAL - Use these EXACT settings:**

| Setting          | Value                                         |
| ---------------- | --------------------------------------------- |
| Framework Preset | `Vite`                                        |
| Root Directory   | `.` (leave empty/default)                     |
| Build Command    | `cd frontend && npm install && npm run build` |
| Output Directory | `frontend/dist`                               |

### Step 4: Add Environment Variable

Click **"Environment Variables"** and add:

```
VITE_API_URL=/api
```

**Optional** (for SMS notifications):

```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number
```

### Step 5: Deploy

Click **"Deploy"** and wait 2-3 minutes.

---

## ✅ Features Included

- **Public Portal:**

  - Submit complaints with ministry selection
  - Track complaints by reference ID
  - Real-time status updates

- **Admin Dashboard:**

  - Secure login (default: admin/admin123)
  - View all complaints
  - Analytics charts (status distribution, ministry hotspots)
  - Update complaint status
  - Filter complaints by status

- **SMS Notifications** (optional):
  - Automatic SMS on complaint submission
  - SMS on status updates

---

## 📝 Important Notes

### Database

- Uses SQLite stored in `/tmp` on Vercel
- **Data is ephemeral** - resets on each deployment
- For production, migrate to PostgreSQL (Supabase/Neon recommended)

### Admin Credentials

- Username: `admin`
- Password: `admin123`
- Change these in `backend/main.py` before deploying to production

### Testing Locally

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend (in new terminal)
cd frontend
npm install
npm run dev
```

---

## 🔧 Troubleshooting

### Build Fails

- Verify Root Directory is `.` (empty)
- Check Build Command is exactly: `cd frontend && npm install && npm run build`
- Ensure Output Directory is `frontend/dist`

### Blank Page

- Verify `VITE_API_URL=/api` environment variable is set
- Check browser console for errors

### API Errors

- Verify `vercel.json` exists in project root
- Check Vercel function logs for backend errors

---

## 📊 What Judges Will See

1. **Professional UI** - Modern, responsive design with Tailwind CSS
2. **Full Functionality** - Working complaint submission, tracking, and admin dashboard
3. **Data Visualization** - Interactive charts showing complaint analytics
4. **Real-world Application** - Addresses actual governance/transparency needs
5. **Technical Excellence** - Clean code, TypeScript, proper API design

---

## 🎯 Demo Flow for Judges

1. **Submit a Complaint** → Get reference ID
2. **Track Complaint** → See status
3. **Admin Login** → View dashboard
4. **See Analytics** → Charts and statistics
5. **Update Status** → Real-time updates

Good luck with your submission! 🚀
