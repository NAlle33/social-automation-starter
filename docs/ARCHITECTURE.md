# ARKITEKTUR

## Översikt
- **Frontend:** Next.js (App Router). UI: chat nere till vänster, fyra bildkort till höger.
- **Server:** API‑route `/api/compose` som koordinerar flöden.
- **Integrationslager:** Composio‑SDK för
  - Nyhetssök (Zenserp/Tavily/Composio Search)
  - Bildgenerering & redigering (Replicate/FLUX)
  - Instagram publicering (Graph API verktyg)
- **(Valfritt) Persistens:** Postgres/Supabase.

## Dataflöde
```
[User Chat] → [UI State] → POST /api/compose
  ├─ action=compose → news.search → make caption → image.gen(×4) → {article, caption, images}
  ├─ action=edit    → image.edit (inpainting/text) → {editedImage}
  └─ action=publish → ig.createContainer → (status) → ig.publish → {postId}
```

## Separationsprincip
- **UI**: rendering + enkel state.
- **API**: validerar input, kallar `lib/tools.ts`.
- **`lib/tools.ts`**: enda plats för externa verktyg.
