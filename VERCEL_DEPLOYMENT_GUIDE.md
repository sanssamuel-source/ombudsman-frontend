# Vercel Deployment Guide - Ombudsman Portal

## Quick Start (5 Minutes)

### Step 1: Upload to GitHub

1. Create a new repository on GitHub (e.g., `ombudsman-portal`)
2. Upload the **entire `ombudsman_portal` folder** to this repository
3. Make sure `vercel.json` is at the root level

### Step 2: Import to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Select your GitHub repository

### Step 3: Configure Build Settings

**CRITICAL - Copy these settings exactly:**

| Setting              | Value                                         |
| -------------------- | --------------------------------------------- |
| **Framework Preset** | `Vite`                                        |
| **Root Directory**   | `.` (leave empty)                             |
| **Build Command**    | `cd frontend && npm install && npm run build` |
| **Output Directory** | `frontend/dist`                               |

### Step 4: Add Environment Variables

Click "Environment Variables" and add:

```
VITE_API_URL=/api
```

**Optional** (for SMS notifications):

```
TWILIO_ACCOUNT_SID=your_sid_here
TWILIO_AUTH_TOKEN=your_token_here
TWILIO_PHONE_NUMBER=your_number_here
```

### Step 5: Deploy

Click **"Deploy"** and wait 2-3 minutes.

---

## What's Fixed

✅ All routing configured correctly  
✅ Frontend and backend properly connected  
✅ SPA routing works (no 404 on page refresh)  
✅ API calls proxied correctly through `/api`

---

## Testing Your Deployment

After deployment, test these pages:

1. **Home**: `https://your-app.vercel.app/`
2. **Submit Complaint**: `https://your-app.vercel.app/submit`
3. **Track Complaint**: `https://your-app.vercel.app/track`
4. **Admin Login**: `https://your-app.vercel.app/admin`

All pages should load without 404 errors.

---

## Troubleshooting

### Still seeing 404?

1. **Check Root Directory**: Must be `.` (empty), NOT `frontend`
2. **Check Build Command**: Must include `cd frontend &&`
3. **Check Output Directory**: Must be `frontend/dist`
4. **Redeploy**: Go to Deployments → Click "..." → Redeploy

### Backend not working?

1. Check Vercel logs: Deployments → Click deployment → "Logs" tab
2. Verify `vercel.json` is at root level
3. Ensure `backend/main.py` exists

---

## Database Note

⚠️ **Important**: This version uses SQLite which stores data in `/tmp` on Vercel.

**This means**:

- Data is **temporary** and will be lost on each deployment
- For production, use PostgreSQL (Supabase/Neon) or deploy backend separately

---

## Need Help?

Common issues:

- **Blank page**: Check browser console for errors
- **API errors**: Verify `VITE_API_URL=/api` is set
- **Build fails**: Check that `package.json` exists in `frontend/` folder
