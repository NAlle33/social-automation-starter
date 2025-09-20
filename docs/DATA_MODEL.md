# DATA MODELL (valfritt)

## Tabeller
- `posts` (id, topic, caption, article_title, article_url, source, published_at, created_at)
- `images` (id, post_id, url, is_selected, created_at)
- `edits` (id, image_id, instruction, result_url, created_at)
- `publishes` (id, post_id, platform, external_id, created_at)

## SQL‑skiss
```sql
CREATE TABLE posts (
  id uuid primary key,
  topic text not null,
  caption text not null,
  article_title text,
  article_url text,
  source text,
  published_at text,
  created_at timestamptz default now()
);

CREATE TABLE images (
  id uuid primary key,
  post_id uuid references posts(id) on delete cascade,
  url text not null,
  is_selected boolean default false,
  created_at timestamptz default now()
);

CREATE TABLE edits (
  id uuid primary key,
  image_id uuid references images(id) on delete cascade,
  instruction text not null,
  result_url text not null,
  created_at timestamptz default now()
);

CREATE TABLE publishes (
  id uuid primary key,
  post_id uuid references posts(id) on delete cascade,
  platform text not null,
  external_id text,
  created_at timestamptz default now()
);
```
