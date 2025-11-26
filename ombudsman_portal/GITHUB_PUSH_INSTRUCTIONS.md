# How to Push to GitHub

Since I cannot access your personal GitHub account to create repositories, you will need to do the final push step.

I have already initialized the git repository and committed the code locally.

### Step 1: Create a Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Name the repository (e.g., `ombudsman-frontend`).
3. Click **Create repository**.

### Step 2: Push the Code
Copy the URL of your new repository (e.g., `https://github.com/YOUR_USERNAME/ombudsman-frontend.git`) and run the following commands in your terminal:

```powershell
cd ombudsman_portal/frontend
git remote add origin https://github.com/YOUR_USERNAME/ombudsman-frontend.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy
Once the code is on GitHub, you can go to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) and import this repository to deploy it instantly.
