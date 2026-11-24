# ADR-004 — Toolchain version baseline

- Status: Accepted after checking upstream documentation on 2026-11-24.
- Runtime baseline: Node.js 22.12+ (the project's expected Node 22 environment is compatible).
- UI: React 19.3.
- Bundler/dev server: Vite 8.3 with `@vitejs/plugin-react` 6.3.
- Tests: Vitest 5.1.
- Type checking: TypeScript 6.0.
- Rationale: use currently supported upstream lines rather than an already unsupported Vite major. Re-check release notes before material upgrades.
- Sources: Vite release support matrix and getting-started guide; React versions page; Vitest release notes; TypeScript release documentation.
