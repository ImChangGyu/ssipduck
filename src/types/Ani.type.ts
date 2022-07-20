export type AniType = {
  Page: {
    media: [
      {
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
        title: { __typename: string; english: string; native: string };
        __typename: string;
      }
    ];
  };
};
