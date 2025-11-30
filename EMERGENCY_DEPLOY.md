# CRITICAL VERCEL SETTINGS

## DO THIS EXACTLY:

1. **Delete your current Vercel deployment completely**

2. **In Vercel Project Settings:**

   - Framework Preset: `Other`
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables:**

   ```
   VITE_API_URL=/api
   ```

4. **Redeploy**

## Why This Works:

- Setting Root Directory to `frontend` makes Vercel treat it as the main app
- The backend will still work via the API routes
- No complex monorepo configuration needed

## If Still 404:

Check Vercel deployment logs:

1. Go to your deployment
2. Click "View Function Logs"
3. Look for errors
4. Send me the exact error message
