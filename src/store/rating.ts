import { create } from 'zustand';

interface RatingStore {
  scores: Map<number, number>;
  hydrate: (ratings: { aniId: number; score: number }[]) => void;
  set: (aniId: number, score: number) => void;
  clear: (aniId: number) => void;
  get: (aniId: number) => number | undefined;
  reset: () => void;
}

export const useRatingStore = create<RatingStore>()((set, get) => ({
  scores: new Map(),
  hydrate: (ratings) =>
    set({ scores: new Map(ratings.map((r) => [r.aniId, r.score])) }),
  set: (aniId, score) => {
    const next = new Map(get().scores);
    next.set(aniId, score);
    set({ scores: next });
  },
  clear: (aniId) => {
    const next = new Map(get().scores);
    next.delete(aniId);
    set({ scores: next });
  },
  get: (aniId) => get().scores.get(aniId),
  reset: () => set({ scores: new Map() }),
}));
