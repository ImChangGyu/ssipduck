import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlayerMutedStoreType {
  muted: boolean;
  togglePlayerMutedState: () => void;
}

export const usePlayerMutedStore = create<PlayerMutedStoreType>()(
  persist(
    (set) => ({
      muted: false,
      togglePlayerMutedState() {
        set((state) => ({ ...state, muted: !state.muted }));
      },
    }),
    { name: 'player-muted' }
  )
);
