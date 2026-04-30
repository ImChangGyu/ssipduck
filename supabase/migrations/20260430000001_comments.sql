-- comments: 평점당 댓글 1개 (PK = ratings PK 공유, CASCADE로 평점 삭제 시 댓글도 삭제)
create table public.comments (
  user_id    uuid        not null,
  ani_id     bigint      not null,
  content    text        not null check (char_length(content) between 1 and 500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, ani_id),
  foreign key (user_id, ani_id)
    references public.ratings(user_id, ani_id)
    on delete cascade
);

create index comments_ani_recent_idx
  on public.comments (ani_id, updated_at desc);

alter table public.comments enable row level security;

create policy "Comments are viewable by everyone"
  on public.comments for select using (true);
create policy "comments_insert_own" on public.comments
  for insert with check (auth.uid() = user_id);
create policy "comments_update_own" on public.comments
  for update using (auth.uid() = user_id);
create policy "comments_delete_own" on public.comments
  for delete using (auth.uid() = user_id);

create trigger comments_set_updated_at
  before update on public.comments
  for each row execute function public.set_updated_at();
