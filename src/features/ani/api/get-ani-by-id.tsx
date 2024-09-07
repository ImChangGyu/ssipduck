import { gql, useSuspenseQuery } from '@apollo/client';
import { AniModalItemType } from '~/types/ani';

const getAniByIdQuery = gql`
  query media($id: Int) {
    Media(id: $id) {
      id
      title {
        romaji
      }
      description
      genres
      coverImage {
        extraLarge
      }
      bannerImage
      trailer {
        id
        site
        thumbnail
      }
      relations {
        nodes {
          id
          title {
            romaji
          }
          description
          genres
          coverImage {
            extraLarge
          }
        }
      }
      recommendations(perPage: 6, sort: [RATING_DESC, ID]) {
        nodes {
          id
          mediaRecommendation {
            id
            title {
              romaji
            }
            description
            genres
            coverImage {
              extraLarge
            }
          }
        }
      }
    }
  }
`;

interface GetAniByIdType {
  Media: AniModalItemType;
}

export default function useGetAniById(id: string) {
  return useSuspenseQuery<GetAniByIdType>(getAniByIdQuery, {
    variables: { id },
  });
}
