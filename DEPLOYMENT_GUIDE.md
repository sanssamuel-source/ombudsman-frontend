# 📦 Deployment Guide - Ombudsman Portal

This guide will walk you through deploying the Ombudsman Portal to GitHub and Vercel.

## Prerequisites

- A GitHub account ([sign up here](https://github.com))
- A Vercel account ([sign up here](https://vercel.com))

## Step-by-Step Deployment

### 1️⃣ Upload to GitHub

#### Option A: Using GitHub Web Interface (Easiest)

1. **Create New Repository**

   - Go to [github.com](https://github.com)
   - Click the **+** icon in the top right
   - Select **New repository**

2. **Configure Repository**

   - Repository name: `ombudsman-portal`
   - Description: "Digital portal for citizens to report public service issues"
   - Visibility: **Public** (required for free Vercel deployment)
   - **DO NOT** check "Add a README file"
   - Click **Create repository**

3. **Upload Files**
   - On the repository page, click **uploading an existing file**
   - Drag and drop **ALL** files and folders from the `GITHUB_SUBMISSION` directory
   - Make sure you see:
     - `backend/` folder
     - `frontend/` folder
     - `vercel.json` file
     - `README.md` file
     - `.gitignore` file
   - Scroll down and click **Commit changes**

#### Option B: Using Git Command Line

```powershell
# Navigate to the GITHUB_SUBMISSION folder
cd "c:\Users\sawilliams\.gemini\antigravity\scratch\ombudsman_portal\ombudsman_portal_fixed\GITHUB_SUBMISSION"

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Ombudsman Portal"

# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ombudsman-portal.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 2️⃣ Deploy to Vercel

1. **Import Project**

   - Go to [vercel.com](https://vercel.com)
   - Click **Add New** → **Project**
   - You'll see your GitHub repositories
   - Find `ombudsman-portal` and click **Import**

2. **Configure Project**

   - **Framework Preset**: Select **Other** (NOT Vite or React)
   - **Root Directory**: Leave as `./`
   - **Build Command**: Leave default (Vercel will auto-detect)
   - **Output Directory**: Leave default

3. **Add Environment Variable**

   - Click **Environment Variables**
   - Add one variable:
     - **Name**: `VITE_API_URL`
     - **Value**: `/api`
   - Click **Add**

4. **Deploy**
   - Click **Deploy**
   - Wait for deployment to complete (usually 2-3 minutes)

### 3️⃣ Test Your Deployment

1. **Visit Your Site**

   - Click the **Visit** button on the deployment success page
   - Your site will be at: `https://ombudsman-portal-xxx.vercel.app`

2. **Test Complaint Submission**

   - Click **File a Complaint**
   - Fill in the form:
     - Ministry: Select any ministry
     - Official Name: Enter a test name
     - Details: Enter test complaint details
     - Phone: Optional
     - NIN: Optional
     - Location: Select a city
   - Click **Submit Complaint**
   - You should see a **Reference ID** (e.g., `A1B2C3D4`)

3. **Test Complaint Tracking**

   - Go back to home page
   - Click **Track Status**
   - Enter the Reference ID you received
   - Click **Track Complaint**
   - You should see your complaint details

4. **Test Admin Dashboard**
   - Go to `/admin` (add `/admin` to your URL)
   - Login with:
     - Username: `admin`
     - Password: `admin123`
   - You should see all complaints
   - Try updating a complaint status

## ✅ Deployment Checklist

- [ ] GitHub repository created
- [ ] All files uploaded to GitHub
- [ ] `vercel.json` is in the root directory
- [ ] Vercel project imported
- [ ] Environment variable `VITE_API_URL=/api` added
- [ ] Deployment successful
- [ ] Can submit a complaint
- [ ] Can track a complaint
- [ ] Can login to admin dashboard
- [ ] Can update complaint status

## 🔧 Troubleshooting

### Issue: 404 Page Not Found

**Solution**: Make sure `vercel.json` is in the root directory of your repository and contains the routing configuration.

### Issue: API Errors

**Solution**: Verify that the environment variable `VITE_API_URL` is set to `/api` in Vercel.

### Issue: Build Failed

**Solution**: Check the build logs in Vercel. The error message will tell you exactly what went wrong.

### Issue: Database Not Working

**Solution**: The database is automatically created by Vercel in the `/tmp` directory. No additional configuration needed.

## 🎥 For Hackathon Submission

1. **Record a Demo Video**

   - Show submitting a complaint
   - Show tracking the complaint
   - Show admin dashboard
   - Show updating complaint status

2. **Take Screenshots**

   - Home page
   - Complaint submission form
   - Complaint tracking page
   - Admin dashboard

3. **Share Your Links**
   - Live site URL: `https://your-site.vercel.app`
   - GitHub repository: `https://github.com/YOUR_USERNAME/ombudsman-portal`

## 🆘 Need Help?

If you encounter any issues:

1. Check the Vercel deployment logs
2. Check the browser console for errors (F12)
3. Verify all files are uploaded to GitHub
4. Ensure environment variables are set correctly

---

**Good luck with your hackathon submission! 🚀**
