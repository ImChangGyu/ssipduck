import { gql, useSuspenseQuery } from '@apollo/client';
import { ANI_VARIABLES } from '~/features/ani/constants/ani-variable';
import { VariableType } from '~/types/ani';

const getAniHeroQuery = gql`
  query AniHeroQuery(
    $isAdult: Boolean
    $type: MediaType
    $sort: [MediaSort]
    $format: MediaFormat
    $season: MediaSeason
    $seasonYear: Int
  ) {
    Page(page: 1, perPage: 1) {
      media(
        isAdult: $isAdult
        type: $type
        sort: $sort
        format: $format
        season: $season
        seasonYear: $seasonYear
      ) {
        id
        title {
          romaji
        }
        description
        genres
        bannerImage
        coverImage {
          extraLarge
        }
        trailer {
          id
          site
        }
      }
    }
  }
`;

interface AniHeroData {
  Page: {
    media: Array<{
      id: number;
      title: { romaji: string };
      description: string;
      genres: string[];
      bannerImage: string | null;
      coverImage: { extraLarge: string };
      trailer: { id: string | null; site: string | null } | null;
    }>;
  };
}

export function useAniHero(type: VariableType) {
  const rawVars = ANI_VARIABLES(1)[type]() as Record<string, unknown>;
  // Strip page / id_in — hero query uses literal page: 1, perPage: 1
  const { page: _p, id_in: _id, ...heroVars } = rawVars;

  return useSuspenseQuery<AniHeroData>(getAniHeroQuery, {
    variables: heroVars,
  });
}
