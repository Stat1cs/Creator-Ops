# Creator Ops

Marketing site for [Creator Ops](https://creator-ops.site) — branded AI platforms for coaches and course creators.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **GSAP** — scroll and hero animations
- **Three.js** — hero particle background

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm run start`| Serve production build   |
| `npm run lint` | Run ESLint               |

## Project structure

```
app/           Layout, global styles, SEO routes (sitemap, robots, OG image)
components/    Page sections (Hero, Demo, Pricing, etc.)
hooks/         Shared React hooks (e.g. reduced-motion detection)
lib/           GSAP setup and scroll-reveal helpers
public/        Static assets
```

## Environment variables

Optional — lead form email delivery via [Resend](https://resend.com):

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Resend API key for `/api/lead` notifications |
| `LEAD_EMAIL` | Inbox for applications (default: `hello@creator-ops.site`) |
| `LEAD_FROM` | From address for Resend (default: `Creator Ops <onboarding@creator-ops.site>`) |

Without `RESEND_API_KEY`, submissions are logged server-side in development.

Analytics uses `@vercel/analytics` automatically on Vercel deployments.

## Deployment

Deploy to Vercel or any Node.js host that supports Next.js:

```bash
npm run build
npm run start
```

Set `metadataBase` in `app/layout.tsx` if deploying to a different domain.

## Accessibility

Animations respect `prefers-reduced-motion`. The Three.js hero canvas is disabled when reduced motion is enabled, replaced with a static gradient.

## License

Private — all rights reserved.
