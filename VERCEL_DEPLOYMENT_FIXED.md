# Vercel Deployment Instructions - FIXED VERSION

## What Was Fixed

1. **Serverless Function Crash**: Changed SQLite database path from `./ombudsman.db` to `/tmp/ombudsman.db` when running on Vercel (Vercel's filesystem is read-only except for `/tmp`)
2. **SMS Integration**: Added Twilio credentials and environment variable loading
3. **Environment Variables**: Added `python-dotenv` to load `.env` file locally

## How to Deploy to Vercel (CORRECT STEPS)

### Step 1: Delete Old Deployment

1. Go to your Vercel Dashboard
2. Find the `ombudsman-frontend` project
3. Click **Settings** → Scroll down → **Delete Project**

### Step 2: Create New Deployment

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Select your GitHub repository: `ombudsman-frontend`

### Step 3: Configure Build Settings

**IMPORTANT**: Set these exactly as shown:

- **Framework Preset**: `Vite`
- **Root Directory**: `ombudsman_portal/frontend` ← CRITICAL!
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `dist` (auto-filled)

### Step 4: Add Environment Variables (For SMS)

Click **"Environment Variables"** and add:

| Name                  | Value                                |
| --------------------- | ------------------------------------ |
| `TWILIO_ACCOUNT_SID`  | `AC1bca241c6731032f3978f686c29be1f5` |
| `TWILIO_AUTH_TOKEN`   | `5f8d6a12e7c3e087f2afe4390d943d4b`   |
| `TWILIO_PHONE_NUMBER` | `+14323484928`                       |

**Note**: These are for the backend. Since we're only deploying the frontend to Vercel, you'll need to deploy the backend separately (see below).

### Step 5: Deploy

Click **"Deploy"** and wait for the build to complete.

---

## Backend Deployment (Railway - Recommended)

Since Vercel doesn't handle Python backends well for this use case, deploy the backend to Railway:

1. Go to [Railway.app](https://railway.app)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select `ombudsman-frontend`
4. **Root Directory**: `ombudsman_portal/backend`
5. **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add the same 3 Twilio environment variables above
7. Deploy and copy the generated URL (e.g., `https://your-app.railway.app`)

### Connect Frontend to Backend

After deploying the backend, you need to update the frontend to point to it:

1. In your Vercel project settings, add this environment variable:

   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.railway.app`

2. Update `frontend/vite.config.ts` to use this variable in production (already configured)

3. Redeploy the frontend on Vercel

---

## Testing the Deployment

1. Visit your Vercel URL (e.g., `https://ombudsman-frontend-z1uk.vercel.app`)
2. You should see the home page with "File a Complaint" and "Track Complaint" buttons
3. Submit a test complaint
4. Check the Railway logs to see if SMS was sent (or mocked)

---

## Why the Previous Deployment Failed

**Root Cause**: Vercel's serverless functions run in a **read-only filesystem**. SQLite tried to create `ombudsman.db` in the current directory, which failed.

**Solution**: We changed the database path to `/tmp/ombudsman.db`, which is Vercel's writable temporary directory.

**Alternative**: For production, use PostgreSQL instead of SQLite (Railway provides free PostgreSQL databases).
