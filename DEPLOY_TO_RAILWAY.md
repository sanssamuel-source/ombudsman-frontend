# Railway Deployment - WORKING BACKEND

## Quick Deploy to Railway

1. **Delete your current Railway service** (it's broken)
2. **Create a NEW Railway service:**

   - Go to https://railway.app
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `ombudsman-frontend` repository
   - Set **Root Directory** to `backend`
   - Click "Deploy"

3. **Set Start Command in Railway:**

   - Go to your service settings
   - Under "Deploy", set **Start Command** to:

   ```
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

4. **Copy the new Railway URL** (e.g., `https://your-app.up.railway.app`)

5. **Update your frontend:**
   - Edit `frontend/src/main.tsx`
   - Change line 7 to your new Railway URL:
   ```typescript
   axios.defaults.baseURL = "https://YOUR-NEW-RAILWAY-URL.up.railway.app";
   ```
   - Redeploy frontend to Vercel

## Files to Upload to GitHub

Upload ALL files from the `BACKEND_WORKING` folder to your GitHub repository's `backend` folder.

These files have:

- ✅ No relative imports (fixed)
- ✅ Clean requirements.txt
- ✅ Proper Python package structure
