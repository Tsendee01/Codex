# Tuslah UI Scaffold

A production-ready Next.js 14 scaffold for a Mongolian-language нэг удаагийн ажлын зах зээл (one-off jobs marketplace) UI. The project ships with Tailwind CSS design tokens, shadcn/ui components, TanStack Query state management, and onboarding-ready auth flows.

## Quick start

### Prerequisites

- Node.js 20.x (LTS recommended)
- npm 10+

### Installation

```bash
npm install
```

### Local development

```bash
npm run dev
```

Visit http://localhost:3000 after the dev server boots.

### Production build

```bash
npm run build
npm run start
```

### Quality

```bash
npm run lint
npm run test
npm run format
```

## Required setup commands

These are the base commands used to generate the scaffold. Re-run them if you need to recreate the project from scratch.

```bash
npx create-next-app@latest tuslah-ui --ts --eslint --app --src-dir --tailwind
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input textarea select card dialog sheet badge dropdown-menu avatar toast form
```

## Environment variables

Create a `.env.local` and provide the API base URL consumed by the Axios client.

```
NEXT_PUBLIC_API_BASE=http://localhost:3001
```

## Project structure

- `src/app` – App Router routes, global styles, and auth pages
- `src/components` – shadcn/ui primitives and shared layout components
- `src/hooks` – lightweight client-side auth store
- `src/lib` – Axios client, query client factory, Mongolian copy, typography helpers
- `src/providers` – application-level providers (QueryClientProvider, ThemeProvider, Toaster)
- `public/icons` – SVG assets for branding and UI accents
- `vitest.config.ts` – Vitest + Testing Library configuration (jsdom)

## shadcn/ui workflow

All base UI primitives live under `src/components/ui`. When you add new components via `shadcn-ui`, point the generator at this directory (aliases are already configured in `components.json`).

## Testing

- `npm run test` – executes Vitest in run mode with jsdom
- `npm run test:watch` – runs Vitest in watch mode during development

Vitest is preconfigured with Testing Library and lightweight Next.js mocks to exercise client components such as the sign-in form and AppShell layout.

## Linting & formatting

ESLint (`npm run lint`) enforces Next.js core-web-vitals rules alongside opinionated import ordering. Prettier (`npm run format`) formats the codebase with the shared project preferences (print width 100, semicolons, double quotes).

## Dark mode & theming

The project uses the `class` strategy for dark mode via `next-themes`. CSS design tokens are declared in `src/app/globals.css` and surfaced through Tailwind utilities. The navbar includes a theme toggle and the layout honors accessible focus states and container spacing tokens.

## Data fetching

TanStack Query is pre-wired through `AppProviders` to manage server data. `src/lib/api.ts` exports an Axios client that injects a stored bearer token and normalizes errors into Mongolian-friendly messages.

