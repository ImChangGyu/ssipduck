export type VariableType =
  | 'popular'
  | 'trend'
  | 'upcoming'
  | 'movie'
  | 'favorite';

export interface AniItemType {
  id: number;
  coverImage: { extraLarge: string };
  bannerImage: string;
  description: string;
  genres: string[];
  title: {
    romaji: string;
  };
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
  };
}

export interface AniModalItemType extends AniItemType {
  recommendations: {
    nodes: { id: number; mediaRecommendation: AniItemType }[];
  };
}
