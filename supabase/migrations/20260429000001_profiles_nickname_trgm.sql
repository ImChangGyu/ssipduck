create extension if not exists pg_trgm;

create index if not exists profiles_nickname_trgm_idx
  on public.profiles using gin (nickname gin_trgm_ops);
