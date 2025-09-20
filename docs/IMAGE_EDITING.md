# BILDREDIGERING — Textstyrd (inpainting)

## Verktyg/slug
- `REPLICATE_CREATE_PREDICTION` med deployment `black-forest-labs/flux-fill-dev`.

## Användning
- Input: `image` (URL), valfri `mask` (vit = ändra, svart = bevara), `prompt` (instruktion).
- Returnera ny `{ url }` och lägg först i galleriet.
