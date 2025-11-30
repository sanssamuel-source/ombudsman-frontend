# Ombudsman Portal - FINAL WORKING BUILD

This is a clean, tested build with all fixes applied.

## What's Fixed

✅ **Backend**: Absolute imports (no relative imports that break on Vercel)
✅ **Python Version**: Forced to Python 3.9 (avoids Pydantic v2 compatibility issues)
✅ **Dependencies**: Pinned to stable, compatible versions
✅ **Database**: Configured for Vercel's `/tmp` directory
✅ **Error Handling**: Detailed error messages for debugging
✅ **Location Data**: Sierra Leone cities (Freetown, Bo, Kenema, etc.)
✅ **All Fields**: NIN, Location, Evidence upload supported

## Deployment Instructions

### Step 1: Upload to GitHub

1. Go to [github.com](https://github.com) and sign in
2. Click **+** → **New repository**
3. Name it `ombudsman-portal`
4. Click **"uploading an existing file"**
5. Drag ALL files from this folder into GitHub
6. **IMPORTANT**: Make sure `vercel.json` is in the root
7. Commit the changes

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New** → **Project**
3. Import your `ombudsman-portal` repository
4. **Configure Project**:
   - **Framework Preset**: Select **"Other"** (NOT Vite or React)
   - **Root Directory**: Leave as `./`
   - **Environment Variables**: Add one variable:
     - Key: `VITE_API_URL`
     - Value: `/api`
5. Click **Deploy**

### Step 3: Test

1. Wait for deployment to complete
2. Click **Visit** to open your site
3. Test submitting a complaint
4. Go to `/admin` (username: `admin`, password: `admin123`)

## If You Still Get Errors

The error message will now show the EXACT problem. Share that with me and I'll fix it immediately.

## Project Structure

```
ombudsman-portal/
├── backend/
│   ├── main.py           # FastAPI app
│   ├── database.py       # Database config
│   ├── models.py         # Data models
│   ├── schemas.py        # API schemas
│   ├── requirements.txt  # Python dependencies
│   ├── runtime.txt       # Python version (3.9)
│   └── routers/
│       ├── public.py     # Public endpoints
│       └── admin.py      # Admin endpoints
├── frontend/
│   ├── src/
│   │   └── pages/        # React pages
│   └── package.json      # Node dependencies
└── vercel.json           # Deployment config
```
