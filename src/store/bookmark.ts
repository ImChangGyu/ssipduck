import { create } from 'zustand';

interface BookmarkStore {
  ids: Set<number>;
  hydrate: (ids: number[]) => void;
  add: (id: number) => void;
  remove: (id: number) => void;
  has: (id: number) => boolean;
  reset: () => void;
}

export const useBookmarkStore = create<BookmarkStore>()((set, get) => ({
  ids: new Set(),
  hydrate: (ids) => set({ ids: new Set(ids) }),
  add: (id) => set((s) => ({ ids: new Set(s.ids).add(id) })),
  remove: (id) => {
    const next = new Set(get().ids);
    next.delete(id);
    set({ ids: next });
  },
  has: (id) => get().ids.has(id),
  reset: () => set({ ids: new Set() }),
}));
