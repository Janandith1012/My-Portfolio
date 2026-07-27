# Hansaja Janandith — Portfolio

Personal portfolio for **Hansaja Janandith**, showcasing education, projects, contact details, and certificates.

## Details included

- Name: Hansaja Janandith
- Email: janandith1012@gmail.com
- LinkedIn: [hansaja-janandith](https://www.linkedin.com/in/hansaja-janandith-15a712413/)
- Education: BSc (Hons) in Information Technology — Information Systems Engineering, SLIIT

## Features

- Responsive one-page portfolio
- Editable profile photo and projects showcase
- Certificates section with **Post certificate** (title, issuer, date, image/PDF, optional credential URL)
- Certificates are saved in IndexedDB on this device/browser, allowing larger PDF files than local storage
- Supabase-ready cloud client, protected database schema, and media bucket setup

## Prepare Supabase cloud sync

1. Create a Supabase project.
2. Open its **SQL Editor** and run `supabase/schema.sql`.
3. In Supabase Authentication, create the portfolio owner's account.
4. Copy `.env.example` to `.env`.
5. Add the project URL and publishable key from **Project Settings → API**.
6. Restart the development server.

The schema allows everyone to read portfolio content but permits writes only
for authenticated users. Never put a Supabase `service_role` key in this
frontend project. The reusable cloud functions are in
`src/lib/portfolioCloud.js`; the current editor keeps using local storage until
the Supabase project and owner authentication are connected.

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Publish with Vercel

```bash
npx vercel login
npx vercel --prod
```

The included `vercel.json` configures the Vite production build. Supabase must
also be connected for certificates and projects posted by the owner to appear
for every visitor; browser-only local storage is not shared between devices.
