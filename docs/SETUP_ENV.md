# SETUP & MILJÖ

## Krav
- Node.js 20+
- pnpm (rekommenderas) eller npm
- VS Code (gärna med agent/AI‑assist)
- Git + GitHub repo

## Initiera projekt
```bash
pnpm dlx create-next-app@latest social-automation --ts --eslint --src-dir=false --app --import-alias "@/*"
cd social-automation
pnpm add @composio/core zod
pnpm add -D @types/node typescript
```

## Miljövariabler (`.env.local`)
```
COMPOSIO_API_KEY=sk_...
COMPOSIO_USER_ID=00000000-0000-0000-0000-000000000000
COMPOSIO_AUTH_REPLICATE=ac_...
COMPOSIO_AUTH_ZENSERP=ac_...
COMPOSIO_AUTH_TAVILY=ac_...
COMPOSIO_AUTH_INSTAGRAM=ac_...
IG_USER_ID=1784...
```
**Notera:** `IG_USER_ID` krävs av Instagram‑toolkitet vid `CREATE_MEDIA_CONTAINER` och `CREATE_POST`. Servern läser detta från env (du skickar det inte från klienten).

## Scripts i `package.json`
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit"
  }
}
```

## Providers (valfritt)
Vill du låta en agent själv välja/utföra verktyg kan du koppla en provider (OpenAI default, alternativt Vercel AI SDK, Anthropic m.fl.). I MVP kör vi direkta `tools.execute`‑anrop för determinism.
