# UI SPEC — Chat + 4 varianter

## Layout
- Grid: `grid-template-columns: 360px 1fr; height: 100dvh;`.
- Vänster: panel med chat-docka **fast** längst ner (textarea + knappar).
- Höger: förhandsvisning: artikelmetadata, caption (pre‑wrap), samt 2×2 bildgalleri.

## Interaktioner
- **Skapa förslag** → POST `/api/compose` med `action=compose`.
- **Klick på bild** → markerar vald (tjock ram).
- **Redigera vald** → input + knapp som POST:ar `action=edit`.
- **Publicera** → `action=publish` (servern använder `IG_USER_ID`).

## Fel & tomtillstånd
- Om inga nyheter → fallback‑caption.
- Vid bildfel → notifiera och behåll tidigare bilder.
