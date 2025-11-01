## Quick orientation for AI coding agents

This repository is a small pnpm monorepo housing the `@nextorders/avatar` package — a TypeScript toolkit that generates SVG avatars (Open Peeps-inspired).

Key locations
- Package source: `packages/avatar/src/` (core generators in `core/`, assets in `open-peeps/`).
- Tests: `packages/avatar/test/unit/` (unit) and `test/browser/` (browser/playwright).
- Build output: `packages/avatar/dist/` (produced by `unbuild`).
- Configs: `tsconfig.json`, `vitest.config.ts`, `pnpm-workspace.yaml`.

Tooling & important commands
- Package manager: pnpm (manifest requires pnpm@>=10.20.0). Node engine: >=24.11.0 — respect these for local runs.
- Full project checks (lint + typecheck + tests): `pnpm run check:full` (root script). Use this to validate changes before PR.
- Build library (package-level): `pnpm --filter @nextorders/avatar -w run build` or run `pnpm run build` from package folder; package build uses `unbuild` and emits types via root `build:types`.
- Typecheck only: `pnpm run typecheck` (root) or `pnpm --filter @nextorders/avatar run typecheck`.
- Tests: `pnpm test` (root runs `vitest run`). For watch: `pnpm run test:watch`.
- Browser tests use Playwright via Vitest (see `vitest.config.ts`). Headless chromium is configured for browser project.

Project patterns and conventions
- ESM + TypeScript-first: package.json sets `type: "module"`. Keep JS/TS module syntax consistent and prefer `import`/`export`.
- Types: the monorepo emits types and sets `declaration` in `tsconfig.json`; `unbuild` is used to produce distributable `dist` and `index.d.ts` (see `packages/avatar/package.json`).
- Path alias: `@nextorders/avatar` is mapped in `tsconfig.json` to `./packages/avatar/index.ts`. Use it when searching cross-package imports.
- Tests location pattern: unit tests live under `**/test/unit/**/*.{test,spec}.ts` (defined in `vitest.config.ts`). Keep test files under `test/unit` for node environment tests.

Code structure highlights (why things are organized this way)
- `core/` contains schema, generator logic and util helpers (deterministic PRNG, svg utilities). This isolates pure avatar generation from component data.
- `open-peeps/` holds a componentized set of parts (face, head, accessories) and utilities to pick colors/components — this separation makes it easy to add new component sets.
- Tests cover random/selector/validation logic in `test/unit` to ensure deterministic behavior for same seeds.

Repository-specific notes for changes
- Keep deterministic behavior intact: many functions depend on seeded PRNGs (see `prng.ts` and random utilities). When mutating generator logic, add tests to lock seed outputs.
- When adding exports, update `packages/avatar/package.json` `exports` and ensure `dist` contains both `.mjs` and `.d.ts` outputs after `unbuild`.
- Linting and pre-commit: repo uses `eslint`, `husky`, `lint-staged`, and `commitlint`. Commits may be blocked by these hooks; run `pnpm run lint:fix` before committing.

Debugging & running locally
- Run full checks frequently: `pnpm run check:full` (root). This runs eslint autofix, types, and vitest run.
- To quickly run a single test file: `pnpm -w vitest run path/to/testfile` or run from package: `pnpm --filter @nextorders/avatar exec vitest run path/to/testfile`.
- For browser tests that require Playwright, ensure Playwright dependencies are installed and run headless as configured in `vitest.config.ts`.

Examples (explicit, copy-paste friendly)
- Run full validation: `pnpm run check:full`
- Run unit tests only: `pnpm test` (root) or `pnpm --filter @nextorders/avatar test` from root
- Build package dist: `pnpm --filter @nextorders/avatar -w run build`

When editing code
- Update or add unit tests in `packages/avatar/test/unit/` demonstrating the behavior change with a fixed `seed`.
- If changing export surface, update `packages/avatar/package.json` `exports` and run the build to confirm `dist` layout.

Files to reference when changing behavior
- `packages/avatar/src/core/schema.ts` — main data shapes
- `packages/avatar/src/core/prng.ts` — deterministic randomness (important for tests)
- `packages/avatar/src/open-peeps/components/*` — component structure and SVG fragments
- `vitest.config.ts` — test project structure and coverage thresholds

If anything is missing or uncertain
- Ask for specific guidance on desired public API or change scope (e.g., new component set vs internal refactor). Provide seed-based failing/passing test cases when possible.
