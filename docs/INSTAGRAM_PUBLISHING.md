# INSTAGRAM — Publicering

## Flöde
1) `INSTAGRAM_CREATE_MEDIA_CONTAINER` med `ig_user_id`, media (`image_url`/`video_url`/fil), ev. `caption` och `media_type`.  
2) (Valfritt) `INSTAGRAM_GET_POST_STATUS` på `creation_id` tills klar.  
3) `INSTAGRAM_CREATE_POST` med `ig_user_id` + `creation_id` → `postId`.

## Parametrar
- `ig_user_id` **krävs** i steg 1 och 3.
- `graph_api_version` har default (v21.0).
- `media_type` = `IMAGE` för stillbild.

## Fel & kvoter
- Hantera kvotfel och felkoder graciöst. Visa tydligt i UI och logga tekniskt.
