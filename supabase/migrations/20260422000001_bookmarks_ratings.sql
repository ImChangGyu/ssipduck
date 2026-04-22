-- bookmarks: 유저당 ani 1건 (PK 복합)
create table public.bookmarks (
  user_id    uuid        not null references auth.users(id) on delete cascade,
  ani_id     bigint      not null,
  created_at timestamptz not null default now(),
  primary key (user_id, ani_id)
);

create index bookmarks_user_recent_idx
  on public.bookmarks (user_id, created_at desc);

alter table public.bookmarks enable row level security;

create policy "bookmarks_select_own" on public.bookmarks
  for select using (auth.uid() = user_id);
create policy "bookmarks_insert_own" on public.bookmarks
  for insert with check (auth.uid() = user_id);
create policy "bookmarks_delete_own" on public.bookmarks
  for delete using (auth.uid() = user_id);

-- ratings: score 1~10 (= 0.5★ ~ 5.0★)
create table public.ratings (
  user_id    uuid        not null references auth.users(id) on delete cascade,
  ani_id     bigint      not null,
  score      smallint    not null check (score between 1 and 10),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, ani_id)
);

create index ratings_user_recent_idx
  on public.ratings (user_id, updated_at desc);

alter table public.ratings enable row level security;

create policy "ratings_select_own" on public.ratings
  for select using (auth.uid() = user_id);
create policy "ratings_insert_own" on public.ratings
  for insert with check (auth.uid() = user_id);
create policy "ratings_update_own" on public.ratings
  for update using (auth.uid() = user_id);
create policy "ratings_delete_own" on public.ratings
  for delete using (auth.uid() = user_id);

-- updated_at 자동 갱신 트리거
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

create trigger ratings_set_updated_at
  before update on public.ratings
  for each row execute function public.set_updated_at();
