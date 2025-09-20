# API SPEC — /api/compose

**Endpoint:** `POST /api/compose`

## Request (JSON)
```json
{
  "action": "compose" | "edit" | "publish",
  "message": "gör ett inlägg till instagram om apor",
  "selectedImageUrl": "https://...",
  "editInstruction": "ljusa upp, lägg till rubriken 'Apor!'"
}
```

> `action=publish` skickar **inte** `igUserId`; servern hämtar den från `IG_USER_ID` i env eller från användarprofil i backend.

## Responses

### action=compose
```json
{
  "article": { "title": "...", "url": "...", "source": "...", "published": "..." },
  "caption": "text...",
  "images": [{ "url": "..." }, { "url": "..." }, { "url": "..." }, { "url": "..." }]
}
```

### action=edit
```json
{ "editedImage": { "url": "..." } }
```

### action=publish
```json
{ "postId": "1789...", "caption": "faktiskt postad caption" }
```

## Fel
- 400: felaktig `action` eller saknade fält.
- 502: fel från extern tjänst (news, image, ig).
- 500: oväntat fel.
