# BILDGENERERING — 4 varianter (Replicate)

## Verktyg/slug
- `REPLICATE_CREATE_PREDICTION` (kräver `deployment_owner`, `deployment_name`, `input`, valfritt `wait_for`).

## Rekommendationer
- Modell: `black-forest-labs/flux-schnell` för snabb SoMe‑kvalitet (1024×1024).
- Kör 4 parallella predictions, returnera `[{url}]`. Vid enskilt fel: 1 retry, annars 3 bilder.

## Säkerhet
- Respektera modell/leverantörens innehållspolicy (NSFW, varumärken).
