# AI AGENT — OPERATING MANUAL

## Regler
1) Läs rätt *.md* innan du jobbar på en task.
2) Arbeta fasvis och committa smått och ofta.
3) Alla externa anrop går via `lib/tools.ts`.
4) Hemligheter lagras i `.env.local` — aldrig i git.
5) TypeScript strikt; undvik `any`.
6) Skriv tester där `TEST_PLAN.md` anger.
7) Respektera `API_SPEC.md` och `UI_SPEC.md`.
8) Vid osäker slug: lista verktyg och logga kandidater.
9) Retry/backoff på externa fel; ytliga fel i UI, detaljerad logg.
10) Uppdatera `README.md` efter varje fas.

## Körning lokalt
```bash
pnpm dev
# http://localhost:3000
```
