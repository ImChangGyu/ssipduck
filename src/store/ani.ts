import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UseFavoriteAniListStoreType {
  favoriteAniIdList: number[];
  updateFavoriteAniIdList: (aniId: number) => void;
}

export const useFavoriteAniListStore = create<UseFavoriteAniListStoreType>()(
  persist(
    (set, get) => ({
      favoriteAniIdList: [],
      updateFavoriteAniIdList(aniId: number) {
        if (get().favoriteAniIdList.includes(aniId)) {
          set((state) => ({
            ...state,
            favoriteAniIdList: state.favoriteAniIdList.filter(
              (value) => value !== aniId
            ),
          }));
        } else {
          set((state) => ({
            ...state,
            favoriteAniIdList: [...state.favoriteAniIdList, aniId],
          }));
        }
      },
    }),
    {
      name: 'favorite-ani-list',
    }
  )
);
