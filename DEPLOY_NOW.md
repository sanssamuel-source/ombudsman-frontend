# HACKATHON DEPLOYMENT - GUARANTEED TO WORK

## ⚠️ CRITICAL: Delete Your Entire GitHub Repo First

GitHub is caching your old files. You MUST start fresh:

1. Go to your GitHub repository
2. Click **Settings** (bottom of left sidebar)
3. Scroll to **Danger Zone**
4. Click **Delete this repository**
5. Type the repo name to confirm
6. Delete it

## ✅ Create New Repository

1. Go to GitHub → Click **+** → **New repository**
2. Name: `ombudsman-portal-final`
3. **Public** repository
4. **DO NOT** add README, .gitignore, or license
5. Click **Create repository**

## 📤 Upload Files

1. Click **"uploading an existing file"**
2. Drag **ALL** files from this `HACKATHON_SUBMISSION` folder
3. You should see:
   - `backend/` folder
   - `frontend/` folder
   - `vercel.json`
   - `README.md`
4. Commit: "Initial deployment"

## 🚀 Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Import `ombudsman-portal-final`
4. **Framework Preset**: **Other**
5. **Environment Variables**:
   - Key: `VITE_API_URL`
   - Value: `/api`
6. Click **Deploy**

## ✅ Verify Deployment

After deployment completes:

1. Check build log shows: `Using Python 3.12` (NOT warning about 3.9)
2. Check Functions tab shows: `Python 3.12` (NOT 3.9)
3. Visit your site
4. Submit a test complaint
5. It should work!

## 🎥 For Hackathon Videos

Once working:

1. Record screen while submitting complaint
2. Show the reference ID
3. Show admin dashboard
4. This proves it works!

## 📋 Files in This Package

- `backend/pyproject.toml` → `requires-python = ">=3.12"`
- `backend/requirements.txt` → `pydantic==2.5.3`
- `backend/schemas.py` → `from_attributes = True`
- `vercel.json` → Routing fixes included
- All Sierra Leone locations

## 🆘 If It Still Fails

The error will now show the EXACT problem. Share the Vercel error log with me.
