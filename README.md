# HackerRank Club · CSE GNIT

> **Empowering Future Innovators Through Technology**

The official website of the HackerRank Club at the Department of Computer Science & Engineering, Guru Nanak Institute of Technology (GNIT). Built with Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui, and Framer Motion. Features a professional dark-theme design with green-red branding, event management, leadership directory, member directory, gallery, achievements showcase, admin panel, and Google Sheets-powered backend.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Animation | Framer Motion |
| Forms | React Hook Form + Zod validation |
| Icons | Lucide React |
| State | Zustand |
| Backend | Google Apps Script (REST API) |
| Database | Google Sheets |
| Deployment | Vercel |

---

## Features

- **Home** — Professional split hero with logo card, count-up stats, about preview, leadership preview, featured events slider, sponsors marquee
- **About GNIT** — College overview, vision, mission, departments, facilities, gallery, achievements, Google Map embed
- **About Club** — Introduction, vision/mission, objectives, why join, activities grid
- **Leadership** — Full org hierarchy with 3D tilt cards, LinkedIn/GitHub/Email links
- **Members** — Searchable, filterable directory with pagination (search by name, roll, branch, year, role)
- **Events** — Upcoming & completed tabs, countdown timer, banner, schedule, speakers, coordinators, sponsors
- **Event Details** — Per-event page with full schedule, speakers, coordinators, sponsors
- **Event Registration** — Zod-validated form, auto-generates registration ID, stores in Google Sheets, sends email confirmation
- **Gallery** — Masonry layout, tabs (Photos/Videos), event filters, lightbox with keyboard navigation
- **Achievements** — Timeline layout with category filters (competitions, hackathons, research, awards, certificates, national)
- **Contact** — Faculty & student coordinator cards, contact form (stores in Sheets), Google Maps, social links
- **Admin Panel** — Password-protected dashboard with 9 sections (dashboard, members, leadership, events, gallery, achievements, registrations, messages, settings)
- **Footer** — Quick links, contact info, newsletter subscription, social links, gradient strip (green → red)
- **Theme** — Dark/Light toggle with system persistence
- **SEO** — Open Graph metadata, sitemap.xml, robots.txt, semantic HTML, ARIA labels
- **Accessibility** — WCAG compliance, keyboard navigation, ARIA labels, proper contrast, screen reader friendly

---

## Quick Start

### Prerequisites

- Node.js 18+ (use any package manager: npm, pnpm, yarn, or bun)
- A Google account (optional — only needed for the Sheets backend)

### Installation

```bash
# Extract the zip and navigate into the project
cd hackerrank-club-cse-gnit

# Install dependencies (pick one)
npm install
# or: pnpm install / yarn install / bun install

# Copy env template
cp .env.example .env.local

# Run dev server
npm run dev
```

Open `http://localhost:3000` to see the site.

### Admin Panel

- Scroll to the footer → click the **"Admin Panel"** link in the bottom-right
- **Demo password**: `admin123`
- To change: set `NEXT_PUBLIC_ADMIN_PASSWORD` in your `.env.local`

---

## Project Structure

```
hackerrank-club-cse-gnit/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, fonts, metadata, ThemeProvider
│   │   ├── page.tsx            # Main router + page transitions
│   │   ├── globals.css         # Tailwind theme (navy + green + red palette)
│   │   ├── sitemap.ts          # SEO sitemap
│   │   └── robots.ts           # SEO robots
│   ├── components/
│   │   ├── ui/                 # shadcn/ui primitives
│   │   ├── navbar.tsx          # Sticky responsive navbar with theme toggle
│   │   ├── footer.tsx          # Footer with gradient strip + newsletter
│   │   ├── theme-provider.tsx  # Dark/Light context
│   │   ├── count-up.tsx        # Count-up animation
│   │   ├── tilt-card.tsx       # 3D tilt card
│   │   ├── lightbox.tsx        # Image lightbox with keyboard nav
│   │   ├── event-card.tsx      # Event card + countdown timer
│   │   ├── section-header.tsx  # Reusable section header
│   │   ├── home/               # Home page sections
│   │   │   ├── hero.tsx
│   │   │   ├── stats.tsx
│   │   │   ├── about-preview.tsx
│   │   │   ├── leadership-preview.tsx
│   │   │   └── events-preview.tsx
│   │   └── pages/              # All routed pages
│   │       ├── home-page.tsx
│   │       ├── about-gnit-page.tsx
│   │       ├── about-club-page.tsx
│   │       ├── leadership-page.tsx
│   │       ├── members-page.tsx
│   │       ├── events-page.tsx
│   │       ├── event-details-page.tsx
│   │       ├── event-register-page.tsx
│   │       ├── gallery-page.tsx
│   │       ├── achievements-page.tsx
│   │       ├── contact-page.tsx
│   │       └── admin-page.tsx
│   ├── lib/
│   │   ├── types.ts            # TypeScript types
│   │   ├── mock-data.ts        # Sample data (used when no API configured)
│   │   ├── api.ts              # API client (internal Next.js API routes)
│   │   ├── router.ts           # Zustand router store
│   │   └── utils.ts            # cn() utility
│   └── hooks/
│       ├── use-mobile.ts
│       └── use-toast.ts
├── public/
│   ├── logo.png                # Club logo (replace with your own)
│   └── favicon.svg
├── backend/                    # Google Apps Script backend
│   ├── Code.gs                 # REST API for Sheets
│   ├── GOOGLE_SHEETS_SETUP.md  # Step-by-step setup guide
│   └── sample-data.csv         # Example rows for each sheet
├── DEPLOYMENT.md               # Vercel deployment guide
├── .env.example                # Environment variables template
├── .gitignore
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── components.json             # shadcn/ui config
└── eslint.config.mjs
```

---

## Backend Setup (Google Sheets)

See [`backend/GOOGLE_SHEETS_SETUP.md`](./backend/GOOGLE_SHEETS_SETUP.md) for the complete guide.

**TL;DR:**

1. Create a Google Sheet with 8 tabs (Leadership, Members, Events, Registrations, Gallery, Achievements, ContactMessages, Newsletter)
2. Paste `backend/Code.gs` into Apps Script editor (Extensions → Apps Script)
3. Deploy as Web App (access: Anyone)
4. Set `GAS_API_URL` in `.env.local` to the deployment URL

Form submissions call internal Next.js API routes first, then those server-side routes forward to Google Apps Script. This avoids browser CORS and preflight issues in local development and Vercel production.

---

## Deployment to Vercel

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for the full guide.

**Quick version:**

1. Push the project to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → Import your repo
3. Add environment variables:
   - `GAS_API_URL` — your Apps Script URL
   - `NEXT_PUBLIC_ADMIN_PASSWORD` — your admin password (default: `admin123`)
   - `NEXT_PUBLIC_SITE_URL` — your production URL
4. Click **Deploy**

---

## Customization

### Colors

Edit `src/app/globals.css` — the `:root` and `.light` blocks define the brand palette:

```css
--brand-green: #16A34A;
--brand-green-light: #22C55E;
--brand-red: #DC2626;
--brand-red-light: #EF4444;
--navy: #0B1120;          /* dark theme background */
--navy-light: #1E293B;    /* dark theme card */
```

### Logo

Replace `public/logo.png` with your club's logo (recommended 512×512 PNG).

### Content

Without a Google Sheets backend, all content comes from `src/lib/mock-data.ts`. Edit this file to update leaders, members, events, gallery items, and achievements. Once you connect Google Sheets, data flows from there.

---

## Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## License

MIT © HackerRank Club CSE, GNIT

Built with care by the CSE Technical Team.
#   h a c k e r r a n k - c s e - g n i t  
 