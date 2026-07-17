# IA MR3 / GA — Analytics Prototype

Built from the original Figma Make export using shadcn/Tailwind components — no Flora conversion.

Original Figma Make design: [IA - MR3 / GA](https://www.figma.com/design/62dS7gCZzA4UirRztmpp9U/IA----MR3---GA)

## Setup

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000

## Testing

Install the Playwright browser binaries once (required before the first test run):
```bash
npx playwright install
```

Run Playwright tests:
```bash
npm run test
```

Generate screenshot baselines on first run:
```bash
npm run test -- --update-snapshots
```

## Tech Stack

- React 18
- TypeScript
- Vite
- shadcn/ui + Tailwind CSS
- Radix UI primitives
- Playwright

## Structure

- `src/app/App.tsx` — main application shell (TopBar + AnalyticsDashboard)
- `src/app/components/TopBar.tsx` — original top navigation bar
- `src/app/components/DiscoverSidebar.tsx` — original sidebar navigation
- `src/app/components/TemplatesSection.tsx` — Library section
- `src/app/components/HomeSection.tsx` — Home section
- `tests/` — Playwright regression tests

## Scope

Full original implementation from the Figma Make export:

- **TopBar** — Analytics header with create actions, tabs, and analyst copilot drawer
- **DiscoverSidebar** — icon-based navigation (Home, Monitoring, Library, Datasets, Settings)
- **All sections** — original shadcn/Tailwind components unchanged
