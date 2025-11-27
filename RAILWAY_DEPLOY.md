# 🚂 How to Deploy Backend to Railway

## Prerequisites
1.  **GitHub Account** (You already have this).
2.  **Railway Account**: Go to [railway.app](https://railway.app/) and "Login with GitHub".

## Step 1: Upload Code to GitHub
(If you haven't already)
1.  Upload the latest `ombudsman_portal.zip` to your GitHub repository.
2.  Ensure you have the `backend` folder in your repo.

## Step 2: Create Project on Railway
1.  Click **"New Project"** (top right).
2.  Select **"Deploy from GitHub repo"**.
3.  Select your `ombudsman-portal` repository.
4.  Click **"Deploy Now"**.

## Step 3: Configure the Backend Service
Railway might try to deploy the root or the frontend. We need to point it to the **backend**.

1.  Click on the box representing your project/service.
2.  Go to **Settings**.
3.  Scroll down to **"Root Directory"**.
4.  Change it to: `ombudsman_portal/backend` (or just `backend`).
5.  **Watch the Build Logs**: It should detect Python and install dependencies.

## Step 4: Get the Live URL
1.  Once deployed (Green checkmark), go to **Settings** -> **Networking**.
2.  Click **"Generate Domain"**.
3.  Copy the URL (e.g., `https://ombudsman-backend-production.up.railway.app`).

## Step 5: Connect Frontend to Backend
1.  Go back to **Netlify**.
2.  Go to **Site Settings** > **Build & deploy** > **Environment variables**.
3.  Add `VITE_API_BASE_URL` with the value of your Railway URL (from Step 4).
4.  **Redeploy** your Netlify site.

🎉 **Done! Your full stack app is live.**
