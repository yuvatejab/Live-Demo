# GetVerify sign-up preview

A design-only preview of three GetVerify onboarding pages. It is a standalone copy: it has no
backend, no sign-in provider and no real data. Nothing you type is sent or stored.

| Path               | Page                                         |
| ------------------ | -------------------------------------------- |
| `/sign-up`         | Create account (first design)                |
| `/sign-up2`        | Create account (second design, with the story) |
| `/onboarding/role` | Choose your role (Buyer or Network)          |

`/` redirects to `/sign-up`. Links that lead anywhere else (for example Sign In) land on a small
"Not part of this preview" page.

## Run it

```bash
npm install
npm run dev
```

Then open the URL it prints, for example `http://localhost:5173/sign-up`.

## Deploy to Vercel

Import the repository in Vercel. The Vite preset is detected on its own (build command
`npm run build`, output directory `dist`). `vercel.json` rewrites every path to `index.html` so
deep links such as `/onboarding/role` work when opened or refreshed.

## What is in here

- `src/components/signup/` holds the pages' components and their CSS modules.
- `src/pages/` holds the three route pages.
- `src/main.tsx` holds the router.
- `src/globals.css` holds the global styles and theme tokens (Tailwind 4).
- The theme toggle in the nav uses the shadcn button and dropdown in `src/components/`.

Fonts are the system stack, so there is nothing to download.
