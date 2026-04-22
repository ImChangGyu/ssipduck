-- ani별 플랫폼 평균 평점 집계 함수
-- SECURITY DEFINER: ratings RLS를 우회하되 집계 결과만 반환 (개인 데이터 노출 없음)
create or replace function public.get_ani_rating_stats(p_ani_ids bigint[])
returns table(ani_id bigint, avg_score numeric, rating_count bigint)
language sql
security definer
set search_path = public
as $$
  select
    ani_id,
    round(avg(score)::numeric, 1) as avg_score,
    count(*) as rating_count
  from ratings
  where ani_id = any(p_ani_ids)
  group by ani_id;
$$;

grant execute on function public.get_ani_rating_stats(bigint[]) to anon;
grant execute on function public.get_ani_rating_stats(bigint[]) to authenticated;
