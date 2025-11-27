# Deployment Guide: Ombudsman Portal

This guide explains how to deploy the project to **Vercel** for the Hackathon presentation.

## Option 1: Vercel (Recommended for Demo)

This project is configured to be deployed as a Monorepo on Vercel.

### Prerequisites

1.  Create a [Vercel Account](https://vercel.com).
2.  Install Vercel CLI: `npm i -g vercel` (or use the web dashboard).

### Steps

1.  **Push to GitHub**: Ensure your latest code is on GitHub.
2.  **Import to Vercel**:
    - Go to Vercel Dashboard -> "Add New..." -> "Project".
    - Select your `ombudsman-frontend` repo.
3.  **Configure Project**:
    - **Framework Preset**: Vite (for frontend).
    - **Root Directory**: `ombudsman_portal/frontend` (IMPORTANT: Vercel might auto-detect this, but we want to deploy the _whole_ thing if using the root `vercel.json`. However, for the _easiest_ setup, we recommend deploying Frontend and Backend separately).

### Option 1.1: The "Easiest" Split Deployment (Best for Stability)

Since Python on Vercel can be tricky with SQLite, we recommend:

**A. Deploy Frontend (Vercel/Netlify)**

1.  Drag and drop the `ombudsman_portal/frontend` folder to Netlify Drop OR connect repo on Vercel.
2.  **Build Command**: `npm run build`
3.  **Output Directory**: `dist`
4.  **Environment Variable**: Set `VITE_API_URL` to your backend URL (see below).

**B. Deploy Backend (Railway/Render)**

1.  Create a [Railway](https://railway.app) account.
2.  "New Project" -> "Deploy from GitHub repo".
3.  Select `ombudsman-frontend`.
4.  **Root Directory**: `ombudsman_portal/backend`.
5.  **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`.
6.  **Variables**:
    - `TWILIO_ACCOUNT_SID` (Optional)
    - `TWILIO_AUTH_TOKEN` (Optional)
    - `TWILIO_PHONE_NUMBER` (Optional)

## SMS Configuration

To make the SMS feature work "live":

1.  Sign up for [Twilio](https://www.twilio.com).
2.  Get your **Account SID**, **Auth Token**, and **Phone Number**.
3.  Add these as Environment Variables in your Backend host (Railway/Render).

_Note: If you don't add these, the system will print "[SMS MOCK]" to the server logs, which is fine for a demo if you show the logs._

## Handling 404 Errors

We have added `vercel.json` files to handle routing.

- If deploying to **Netlify**, create a file named `_redirects` in `frontend/public/` with this content:
  ```
  /*  /index.html  200
  ```
