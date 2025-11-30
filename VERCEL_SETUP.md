# Vercel Deployment Instructions

## Quick Setup (5 Minutes)

### 1. Upload to GitHub

- Create a new GitHub repository
- Upload the entire `ombudsman_portal` folder to it

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository

### 3. Configure Settings

**IMPORTANT - Use these exact settings:**

| Setting          | Value                                         |
| ---------------- | --------------------------------------------- |
| Framework Preset | `Vite`                                        |
| Root Directory   | `.` (leave empty)                             |
| Build Command    | `cd frontend && npm install && npm run build` |
| Output Directory | `frontend/dist`                               |

### 4. Environment Variables

Add this environment variable:

```
VITE_API_URL=/api
```

**Optional** (for SMS):

```
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_number
```

### 5. Deploy!

Click **"Deploy"** and wait 2-3 minutes.

---

## ✅ What's Included

This is the **stable version** from before AI/GPS features were added:

- ✅ Working complaint submission
- ✅ Tracking by reference ID
- ✅ Admin dashboard with analytics
- ✅ SMS notifications (optional)
- ✅ No compilation errors

---

## Database Note

⚠️ **SQLite on Vercel is temporary** - data resets on each deployment.

For production, use PostgreSQL (Supabase/Neon) or deploy backend to Railway.

---

## Need Help?

If you see errors:

1. Check Vercel logs (Deployments → Click deployment → "Logs")
2. Verify all settings match exactly
3. Ensure `VITE_API_URL=/api` is set
