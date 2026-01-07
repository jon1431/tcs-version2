# Deployment Guide for TCS Website

This guide covers multiple deployment options for your React + Vite application.

## Option 1: Vercel (Recommended - Easiest)

Vercel is the easiest and most popular option for React/Vite apps.

### Steps:

1. **Install Vercel CLI** (optional, but recommended):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account
   - Click "Add New Project"
   - Import your repository: `jon1431/tcs-version2`
   - Vercel will auto-detect Vite settings
   - **Important**: Set the root directory to `tcs-frontend` if needed
   - Click "Deploy"

3. **Configure for React Router** (if needed):
   - In Vercel dashboard, go to your project → Settings → Functions
   - Add a `vercel.json` file in the root:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

4. **Your site will be live at**: `https://your-project-name.vercel.app`

---

## Option 2: Netlify

### Steps:

1. **Go to [netlify.com](https://netlify.com)**
   - Sign up/Login with GitHub

2. **Deploy**:
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Select `jon1431/tcs-version2`
   - **Build settings**:
     - Base directory: `tcs-frontend`
     - Build command: `npm run build`
     - Publish directory: `tcs-frontend/dist`

3. **Add `_redirects` file** for React Router:
   - Create `tcs-frontend/public/_redirects` with:
   ```
   /*    /index.html   200
   ```

4. **Your site will be live at**: `https://your-project-name.netlify.app`

---

## Option 3: GitHub Pages

### Steps:

1. **Update `vite.config.js`**:
   ```javascript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import tailwindcss from "@tailwindcss/vite";

   export default defineConfig({
     base: '/tcs-version2/', // Replace with your repo name
     plugins: [
       react({
         babel: {
           plugins: [['babel-plugin-react-compiler']],
         },
       }),
       tailwindcss()
     ],
   })
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add to `package.json`**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to your repo → Settings → Pages
   - Source: `gh-pages` branch
   - Your site will be at: `https://jon1431.github.io/tcs-version2/`

---

## Option 4: Cloudflare Pages

### Steps:

1. **Go to [dash.cloudflare.com](https://dash.cloudflare.com)**
   - Sign up/Login

2. **Deploy**:
   - Workers & Pages → Create application → Pages → Connect to Git
   - Select your repository
   - **Build settings**:
     - Framework preset: Vite
     - Build command: `npm run build`
     - Build output directory: `dist`
     - Root directory: `tcs-frontend`

3. **Add `_redirects` file** (same as Netlify):
   - Create `tcs-frontend/public/_redirects` with:
   ```
   /*    /index.html   200
   ```

4. **Your site will be live at**: `https://your-project-name.pages.dev`

---

## Quick Deploy Commands

### Test Build Locally First:
```bash
cd tcs-frontend
npm run build
npm run preview
```

This will build and preview your site locally to ensure everything works.

---

## Important Notes:

1. **Environment Variables**: If you have any API keys or environment variables, add them in your deployment platform's settings.

2. **React Router**: All platforms above support SPA routing, but you may need to configure redirects (as shown above).

3. **Build Output**: The build command creates a `dist` folder with your production-ready files.

4. **Custom Domain**: All platforms allow you to add a custom domain for free.

---

## Recommended: Vercel

Vercel is recommended because:
- ✅ Zero configuration needed
- ✅ Automatic deployments on git push
- ✅ Free SSL certificate
- ✅ Fast global CDN
- ✅ Easy custom domain setup
- ✅ Preview deployments for pull requests

