# 🚑 Deployment 404 Debugger

If you are seeing a **404 Page Not Found** on Vercel, check these 3 things:

## 1. The "Root Directory" Setting (Most Likely Cause)
Vercel needs to know where your `package.json` is.
- If your repo looks like: `ombudsman-portal/frontend/package.json`
- Then **Root Directory** must be: `frontend` (or `ombudsman_portal/frontend` depending on the top level).

**How to check:**
1. Go to Vercel Project Settings -> General.
2. Look at "Root Directory".
3. Use the **Edit** button and browse the file tree. **Select the folder that contains `package.json`**.

## 2. The Output Directory
Vite builds to a folder named `dist`.
- Ensure **Output Directory** in Vercel settings is set to `dist` (this is usually the default for Vite).

## 3. The "Rewrites" (for /admin or /track links)
If the home page works but `/admin` gives a 404:
- Ensure `vercel.json` is present in the same folder as `package.json`.
- I have included this file in the latest zip.

## 💡 Alternative: Try Netlify
If Vercel is being difficult, try **Netlify**:
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Unzip `ombudsman_portal.zip`.
3. Go into `ombudsman_portal/frontend`.
4. Run `npm install && npm run build` locally if you can.
5. Drag the `dist` folder to Netlify.

*OR* connect Netlify to your GitHub repo. It often auto-detects settings better.
