export const commentKeys = {
  all: ['comments'] as const,
  list: (aniId: number) => [...commentKeys.all, 'list', aniId] as const,
};
