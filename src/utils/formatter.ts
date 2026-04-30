export function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return '방금 전';
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간 전`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}일 전`;
  const mo = Math.floor(d / 30);
  if (mo < 12) return `${mo}개월 전`;
  return `${Math.floor(mo / 12)}년 전`;
}

export function stripTag(string: string) {
  const tagRegex = /<\/?[^>]*>/gi;
  return (string || '').replaceAll(tagRegex, '');
}

export function trailerUrl(id: string, site: string) {
  switch (site) {
    case 'youtube':
      return `https://www.youtube.com/embed/${id}`;
    case 'dailymotion':
      return `https://geo.dailymotion.com/${id}.html`;
    default:
      return '';
  }
}
