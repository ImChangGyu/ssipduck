export function stripTag(string: string) {
  const tagRegex = /<\/?[^>]*>/gi;
  return string.replaceAll(tagRegex, '');
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
