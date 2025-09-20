# COMPOSIO — Praktisk användning (TypeScript)

## Init & user‑scoping
```ts
import { Composio } from '@composio/core';
export const composio = new Composio({ apiKey: process.env.COMPOSIO_API_KEY });
export const USER_ID = process.env.COMPOSIO_USER_ID!; // DB‑UUID/org‑UUID, inte e‑post
```

## Auth Configs & Connect Link
- Skapa **Auth Config** per toolkit (Replicate=API key, Instagram=OAuth2, Zenserp/Tavily=API key).
- Koppla konto via **Connect Link** eller **Direct SDK**. Spara `connected_account_id` om du behöver rikta mot specifikt konto.

## Hämta & filtrera verktyg
```ts
// Top-verktyg i ett toolkit
const tools = await composio.tools.get(USER_ID, { toolkits: ['INSTAGRAM'], limit: 10 });
// Specifika verktyg via slugs
const only = await composio.tools.get(USER_ID, { tools: ['REPLICATE_CREATE_PREDICTION'] });
```

## Exekvera & proxy
```ts
await composio.tools.execute('REPLICATE_CREATE_PREDICTION', {
  user_id: USER_ID,
  arguments: { deployment_owner: 'black-forest-labs', deployment_name: 'flux-schnell', input: { prompt: '...' }, wait_for: 120 }
});

await composio.tools.proxy({
  endpoint: '/repos/composiohq/composio/issues/1',
  method: 'GET',
  connected_account_id: 'ca_...'
});
```

## Modifiers (avancerat)
- Schema/before/after‑modifiers kan justera schema, arguments och svar för robusthet.
