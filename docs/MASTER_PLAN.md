# MASTER PLAN — Social Media Automation Web App

**Ägare:** Du  
**Byggs av:** AI‑agent i VS Code  
**Mål:** Skriva kommandon i chatten (vänster nere), hämta senaste relevant artikel, generera caption, skapa 4 bildvarianter, möjliggöra textstyrd bildredigering och publicera till Instagram.

## Repo-struktur (måltillstånd)

```
.
├─ app/
│  ├─ api/
│  │  └─ compose/route.ts        # POST endpoint: compose/edit/publish (IG user-id hämtas server-side)
│  └─ page.tsx                    # UI: chat nere till vänster, 4 bilder till höger
├─ lib/
│  ├─ composio.ts                 # Composio-klientinit
│  └─ tools.ts                    # Wrappers: news, image gen/edit, instagram publish
├─ docs/                          # Dokumentation för agenten
│  ├─ MASTER_PLAN.md
│  ├─ SETUP_ENV.md
│  ├─ ARCHITECTURE.md
│  ├─ UI_SPEC.md
│  ├─ API_SPEC.md
│  ├─ TOOLS_COMPOSIO.md
│  ├─ NEWS_SOURCES.md
│  ├─ PROMPTS.md
│  ├─ IMAGE_GENERATION.md
│  ├─ IMAGE_EDITING.md
│  ├─ INSTAGRAM_PUBLISHING.md
│  ├─ DATA_MODEL.md
│  ├─ TEST_PLAN.md
│  ├─ OBSERVABILITY.md
│  ├─ SECURITY_AND_PRIVACY.md
│  ├─ DEPLOYMENT.md
│  ├─ QA_CHECKLIST.md
│  ├─ ROADMAP.md
│  ├─ AGENT_OPERATING_MANUAL.md
│  └─ COMPOSIO_IDE_SETUP.md
├─ README.md
└─ .env.local                     # lokala hemligheter (skapa själv)
```

## Faser & Tasks

| Fas | Syfte | Task-ID | Task | Output | Referenser |
|-----|------|---------|------|--------|------------|
| 0 | Bootstrapping & Setup | T-001 | Initiera repo & Next.js | Next-skelett | `SETUP_ENV.md` |
| 0 |  | T-002 | Installera beroenden | `@composio/core` m.fl. | `SETUP_ENV.md` |
| 0 |  | T-003 | Skapa env-variabler | `.env.local` | `SETUP_ENV.md` |
| 0 |  | T-004 | Skapa Auth Configs i Composio (Replicate/Instagram/News) | `ac_...` per toolkit | `SETUP_ENV.md`, `TOOLS_COMPOSIO.md` |
| 0 |  | T-005 | Användar‑ID strategi (userId/orgId) | dokumenterad strategi | `TOOLS_COMPOSIO.md` |
| 1 | UI-skelett | T-110 | Grundlayout (grid 360px + 1fr) | `app/page.tsx` | `UI_SPEC.md`, `ARCHITECTURE.md` |
| 1 |  | T-120 | Chatdocka & state | chat-komponent | `UI_SPEC.md` |
| 2 | API & Agentflöde | T-210 | `/api/compose` med actions | compose/edit/publish | `API_SPEC.md`, `ARCHITECTURE.md` |
| 2 |  | T-220 | `lib/tools.ts` wrappers | news, image, ig-publish | `TOOLS_COMPOSIO.md` |
| 2 |  | T-225 | Lista & verifiera verktygsslugs | konsollista + logg | `TOOLS_COMPOSIO.md` |
| 3 | Nyhetssök | T-310 | Integrera news-tool | senaste artikel | `NEWS_SOURCES.md` |
| 4 | Caption/LLM | T-410 | Caption‑generator | ton + hashtags | `PROMPTS.md` |
| 5 | Bildgenerering | T-510 | 4 varianter | 4 bild-URL:er | `IMAGE_GENERATION.md` |
| 6 | Bildredigering | T-610 | Textstyrd edit | ny bild-URL | `IMAGE_EDITING.md` |
| 7 | Publicering IG | T-710 | Container → (status) → Publish | post-id | `INSTAGRAM_PUBLISHING.md` |
| 8 | Persistens | T-810 | Spara poster/bilder | tabeller/CRUD | `DATA_MODEL.md` |
| 9 | Testning | T-910 | Unit/Integration/E2E | gröna tester | `TEST_PLAN.md` |
| 9 | Observability | T-920 | Loggning & felspårning | dashboards | `OBSERVABILITY.md` |
| 10 | Säkerhet | T-1010 | Sekretess & tokens | hårdnad drift | `SECURITY_AND_PRIVACY.md` |
| 11 | Deploy | T-1110 | Vercel/CI | publik URL | `DEPLOYMENT.md` |
| 12 | QA | T-1210 | Slutgranskning | godkänd release | `QA_CHECKLIST.md` |
| 13 | Roadmap | T-1310 | Nästa features | plan | `ROADMAP.md` |

## Definition of Done
- API svarar enligt `API_SPEC.md`, UI följer `UI_SPEC.md`.
- Externa anrop sker via `lib/tools.ts` (enkelt att mocka).
- Hemligheter hanteras via `.env.local`. 
- QA‑listan passerad och `README.md` uppdaterad.

## Körordning för AI‑agent
1) F0 → F1 → F2 … F7 (minsta fungerande kedja), därefter F8–F12.  
2) Läs respektive dokument innan du startar en task.  
3) Efter varje task: kör tester och uppdatera `README.md`.

