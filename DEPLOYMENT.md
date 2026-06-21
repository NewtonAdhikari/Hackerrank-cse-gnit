# Deployment Guide — HackerRank Club GNIT

## Prerequisites

- A GitHub account
- A Vercel account (free tier is enough)
- Google account for Sheets backend (optional — site works with mock data)

## Option 1: Deploy with Mock Data (Fastest)

If you just want a working demo site without setting up the backend:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: HackerRank Club GNIT website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/hackerrank-club-gnit.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repo
   - Framework preset: **Next.js** (auto-detected)
   - Environment variables:
     - `NEXT_PUBLIC_ADMIN_PASSWORD=admin123` (change this!)
   - Click **Deploy**
   - Wait ~2 minutes for the build

3. **Done!** Your site is live at `https://hackerrank-club-gnit.vercel.app` (or similar)

## Option 2: Deploy with Google Sheets Backend (Production)

Follow the [Google Sheets Setup Guide](./backend/GOOGLE_SHEETS_SETUP.md) first, then:

1. Complete all steps from Option 1
2. Add additional env variables in Vercel:
   - `GAS_API_URL` = your Apps Script Web App URL
   - `NEXT_PUBLIC_SITE_URL` = your production Vercel URL
3. Redeploy

## Custom Domain

1. In Vercel dashboard → your project → **Settings → Domains**
2. Add your domain (e.g., `hackerrank.gnit.ac.in`)
3. Add the DNS records Vercel shows you to your domain registrar
4. Wait for DNS propagation (5-30 minutes)
5. Update `NEXT_PUBLIC_SITE_URL` to the new domain

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `GAS_API_URL` | Yes for forms | Google Apps Script Web App URL used only by Next.js API routes. |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | No | Admin panel password. Default: `admin123` |
| `NEXT_PUBLIC_SITE_URL` | No | Production URL (for SEO/sitemap) |

## Performance Checklist

- ✅ Images optimized (Next.js Image component or lazy `<img>`)
- ✅ Code splitting (per-route components)
- ✅ Framer Motion animations are GPU-accelerated
- ✅ Tailwind CSS purged in production
- ✅ No external runtime CSS dependencies
- ✅ Fonts loaded via `next/font` (no FOIT)

## Post-Deployment

1. Test all pages on the production URL
2. Submit a test registration → verify row appears in Sheets
3. Submit a test contact message → verify row appears in Sheets
4. Test admin login with your password
5. Run [PageSpeed Insights](https://pagespeed.web.dev/) on your URL
6. Submit sitemap to Google Search Console

## Updating Content

- **Without backend**: Edit `src/lib/mock-data.ts` and redeploy
- **With backend**: Just edit the Google Sheet — site updates automatically (no redeploy needed)

## Updating the Site

```bash
git pull origin main
# make your changes
git add .
git commit -m "Update: <description>"
git push origin main
# Vercel auto-deploys on push
```
