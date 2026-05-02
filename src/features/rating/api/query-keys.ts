export const ratingKeys = {
  all: ['ratings'] as const,
  list: () => [...ratingKeys.all, 'list'] as const,
  stats: (aniIds: number[]) => [...ratingKeys.all, 'stats', aniIds] as const,
};
