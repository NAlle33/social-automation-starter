# QA CHECKLIST

- [ ] UI följer `UI_SPEC.md` (layout, interaktioner, a11y).
- [ ] `/api/compose` uppfyller `API_SPEC.md`.
- [ ] 4 bildvarianter genereras på compose.
- [ ] Edit returnerar ny bild först i galleriet.
- [ ] Publish returnerar `postId` eller tydligt fel.
- [ ] Felhantering: nätverk, kvot, auth.
- [ ] Miljövariabler korrekta i prod.
- [ ] Loggar/sentry utan hemligheter.
- [ ] README beskriver setup och begränsningar.
