-- 1. bio 컬럼 추가
alter table public.profiles
  add column if not exists bio text;

-- 2. profiles 공개 select 정책
drop policy if exists "Profiles are viewable by everyone" on public.profiles;
create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

-- 3. profiles 본인 update 정책
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 4. bookmarks 공개 select 정책 (기존 본인 전용 정책 교체)
drop policy if exists "Users can view own bookmarks" on public.bookmarks;
drop policy if exists "Bookmarks are viewable by everyone" on public.bookmarks;
create policy "Bookmarks are viewable by everyone"
  on public.bookmarks for select
  using (true);

-- 5. ratings 공개 select 정책 (기존 본인 전용 정책 교체)
drop policy if exists "Users can view own ratings" on public.ratings;
drop policy if exists "Ratings are viewable by everyone" on public.ratings;
create policy "Ratings are viewable by everyone"
  on public.ratings for select
  using (true);
