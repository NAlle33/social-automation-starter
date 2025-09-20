# SÄKERHET & SEKRETESS

## Hemligheter
- `.env.local` lokalt, secrets i deployplattform (t.ex. Vercel).
- Rotera nycklar regelbundet.

## Data
- Spara minsta möjliga (caption, bild‑URL, postId).
- Logga inte PII i klartext.

## Åtkomst
- Minsta behörighet i OAuth‑scopes. Kontrollera user/org‑ID‑matchning.
