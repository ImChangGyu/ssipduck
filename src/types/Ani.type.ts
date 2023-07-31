export type AniType = {
  coverImage: { extraLarge: string };
  description: string;
  genres: string[];
  title: {
    romaji: string;
  };
};

export type AniItemProps = {
  coverImage: { __typename: string; extraLarge: string };
  description: string;
  endDate: {
    __typename: string;
    year: number;
    month: number;
    day: number;
  };
  genres: string[];
  siteUrl: string;
  startDate: {
    __typename: string;
    yaer: number;
    month: number;
    day: number;
  };
  studios: {
    __typename: string;
    nodes: [
      {
        __typename: string;
        name: string;
      }
    ];
  };
  title: {
    __typename: string;
    native: string;
    romaji: string;
  };
  __typename: string;
};

export type AniListProps = {
  aniList: AniType[];
};
