# TESTPLAN

## Nivåer
- **Unit:** `lib/tools.ts` (mocka verktyg), utiler.
- **Integration:** `/api/compose` med stubbar.
- **E2E:** Playwright — compose → select → edit → publish (mockad IG).

## CI
- Kör `pnpm typecheck && pnpm test && pnpm build`.
