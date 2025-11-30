# Vercel Deployment Instructions (Step-by-Step)

Follow these instructions EXACTLY to deploy your Ombudsman Portal.

## Phase 1: GitHub Setup

1.  **Download** the `OMBUDSMAN_PYTHON39_FIX.zip` file I provided.
2.  **Unzip** the file on your computer. You should see a folder containing `backend`, `frontend`, `vercel.json`, etc.
3.  **Go to GitHub** (github.com) and sign in.
4.  Click the **+** icon in the top right and select **New repository**.
5.  Name it `ombudsman-portal` (or similar) and click **Create repository**.
6.  **Upload Files**:
    - Click the link that says **"uploading an existing file"**.
    - Drag and drop **ALL** the files and folders from your unzipped folder into the GitHub page.
    - **Crucial**: Make sure `vercel.json` is in the root list of files.
    - Commit the changes.

## Phase 2: Vercel Deployment

1.  **Go to Vercel** (vercel.com) and sign in.
2.  Click **"Add New..."** -> **"Project"**.
3.  Find your `ombudsman-portal` repository and click **Import**.
4.  **Configure Project** (VERY IMPORTANT):
    - **Project Name**: Leave as is.
    - **Framework Preset**: Select **Other** (Do NOT select Vite or React).
      - _Why?_ Because we are using a custom `vercel.json` to deploy both Python and React.
    - **Root Directory**: Leave as `./` (default).
    - **Build & Output Settings**: Leave default (Override should be OFF).
    - **Environment Variables**:
      - Click to expand.
      - Key: `VITE_API_URL`
      - Value: `/api`
      - Click **Add**.
5.  Click **Deploy**.

## Phase 3: Verification

1.  Wait for the deployment to finish (it might take a minute or two).
2.  Click the **Continue to Dashboard** button.
3.  Click the **Visit** button to open your live site.
4.  **Test**:
    - Try submitting a complaint.
    - Go to `/admin` (Login: `admin` / `admin123`) to see the dashboard.

**Troubleshooting**:

- If you see a 404 error, check that `vercel.json` is in the root of your GitHub repo.
- If the form doesn't submit, check that you added the `VITE_API_URL` environment variable.
