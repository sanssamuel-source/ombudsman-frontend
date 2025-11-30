# How to Install on Vercel

This guide explains how to deploy the **Ombudsman Portal** to Vercel using the fixed code you just downloaded.

## Prerequisites

- A [GitHub](https://github.com) account.
- A [Vercel](https://vercel.com) account (linked to GitHub).
- The `ombudsman_portal_505_FIXED.zip` file.

## Step 1: Prepare the Code

1.  **Unzip** the `ombudsman_portal_505_FIXED.zip` file.
2.  You should see a folder named `ombudsman_portal` containing `frontend`, `backend`, and `vercel.json`.
3.  **Upload to GitHub**:
    - Create a new repository on GitHub (e.g., `ombudsman-portal`).
    - Push the contents of the unzipped folder to this repository.
    - _Ensure `vercel.json` is at the root of your repository._

## Step 2: Deploy to Vercel

# How to Install on Vercel

This guide explains how to deploy the **Ombudsman Portal** to Vercel using the fixed code you just downloaded.

## Prerequisites

- A [GitHub](https://github.com) account.
- A [Vercel](https://vercel.com) account (linked to GitHub).
- The `ombudsman_portal_505_FIXED.zip` file.

## Step 1: Prepare the Code

1.  **Unzip** the `ombudsman_portal_505_FIXED.zip` file.
2.  You should see a folder named `ombudsman_portal` containing `frontend`, `backend`, and `vercel.json`.
3.  **Upload to GitHub**:
    - Create a new repository on GitHub (e.g., `ombudsman-portal`).
    - Push the contents of the unzipped folder to this repository.
    - _Ensure `vercel.json` is at the root of your repository._

## Step 2: Deploy to Vercel

1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  **Import** the GitHub repository you just created.

## Step 3: Configure Project

**IMPORTANT**: You must configure these settings exactly as shown to ensure both Frontend and Backend work.

- **Framework Preset**: `Vite`
- **Root Directory**: `.` (Leave empty / Default)
  - _Do NOT set this to `frontend`. We need the root so Vercel can see the `backend` folder too._
- **Build Command**: `cd frontend && npm install && npm run build`
  - _We need to manually tell Vercel to go into the frontend folder to build._
- **Output Directory**: `frontend/dist`
  - _This is where Vite outputs the built files._
- **Environment Variables**:
  - Add `VITE_API_URL` with value `/api`
  - (Optional) If you want SMS notifications, add:
    - `TWILIO_ACCOUNT_SID`
    - `TWILIO_AUTH_TOKEN`
    - `TWILIO_PHONE_NUMBER`

## Step 4: Deploy

1.  Click **"Deploy"**.
2.  Wait for the build to complete.
3.  Once finished, you will get a live URL (e.g., `https://ombudsman-portal.vercel.app`).

## Important Note on Database

This application uses **SQLite**. On Vercel, the filesystem is **read-only** (except for `/tmp`).

- The application has been patched to write the database to `/tmp/ombudsman.db`.
- **Warning**: Data stored in `/tmp` is **ephemeral** and will be lost when the serverless function restarts (which happens frequently).
- **For Production**: You should use an external database like **PostgreSQL** (e.g., via Supabase or Neon) or deploy the backend to a persistent host like **Railway**.

## Troubleshooting

- **500 Errors**: Check the "Logs" tab in your Vercel dashboard.
- **404 Errors**: Ensure `vercel.json` is in the root and correctly rewriting `/api/*` requests.
- **ENOENT: no such file or directory, open '.../package.json'**:
  - This usually means the **Build Command** is wrong.
  - Ensure your Build Command is: `cd frontend && npm install && npm run build`
  - Ensure your Root Directory is `.` (empty).
