# Blinkit Growth Intelligence
### AI-Powered Discovery Engine for Cross-Category Customer Growth

Internal AI product for Blinkit's Growth Team — explains why customers repeatedly purchase from the
same categories and identifies evidence-backed opportunities to increase cross-category discovery.

Built with Next.js 14 (App Router), React, Tailwind CSS, Recharts, and Framer Motion. Deployable on
Vercel.

## Modules

- **Executive Briefing** — top-line growth metrics and the headline AI insight
- **Discovery Pipeline** — how feedback becomes a validated signal (collection → filtering → AI extraction → validation)
- **Behavioral Intelligence** — reason-type, segment, and category breakdowns, each as an AI Insight Card
- **Growth Intelligence** — all 8 required brief questions, answered with evidence
- **Evidence Explorer** — drill-down filters (reason type, segment, confidence) into individual tagged reviews
- **Opportunity Workspace** — ranked growth experiments (impact, confidence, effort, expected KPI impact)
- **AI Validation** — hallucination risk, source bias, sampling methodology, known limitations
- **Live Analysis** — test the exact extraction prompt used on all 1,176 reviews, live

## Local setup

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it redirects to `/executive-briefing`.

## Deploy on Vercel

1. Push this repository to GitHub
2. Go to vercel.com → **Add New Project** → import the repo
3. Vercel auto-detects Next.js — no config needed. Click **Deploy**
4. That's it — the dashboard loads with the packaged dataset immediately

No environment variables are required to view the dashboard. The **Live Analysis** page asks the
visitor for their own Gemini API key at runtime (entered client-side, sent only to the app's own
`/api/analyze` route, never stored).

## Data

All analysis in this app comes from `public/data/reviews.json` — 189 validated, quote-grounded
signals extracted from 1,176 reviews across Google Play, Reddit, YouTube, and App Store. See the
**AI Validation** page in-app for full methodology and known limitations.

## Project structure

```
app/
  executive-briefing/page.tsx
  discovery-pipeline/page.tsx
  behavioral-intelligence/page.tsx
  growth-intelligence/page.tsx
  evidence-explorer/page.tsx
  opportunity-workspace/page.tsx
  ai-validation/page.tsx
  live-analysis/page.tsx
  api/analyze/route.ts       # server-side Gemini proxy for Live Analysis
  layout.tsx                  # root layout + sidebar
  globals.css
components/
  Sidebar.tsx
  PageHeader.tsx
  MetricCard.tsx
  AIInsightCard.tsx           # core storytelling component
  BarList.tsx                 # Recharts horizontal bars
lib/
  data.ts                     # all derived metrics, computed from reviews.json
public/data/reviews.json      # the validated dataset
```
