# NYHETER — Sök & Urval

## Standardflöde
1) Extrahera ämne ur texten (heuristik).  
2) Kör sök via **Zenserp Google News** (primärt) eller **Tavily/Composio Search**.  
3) Välj top‑1 med färsk publicering (t.ex. ≤7 dagar) och returnera DTO:  
```ts
type NewsItem = { title: string; url: string; source: string; published: string };
```

## Fallbacks
- Inga träffar → `null`; UI visar allmän caption.
