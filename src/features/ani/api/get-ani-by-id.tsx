import { gql, useSuspenseQuery } from '@apollo/client';
import { AniItemType } from '~/types/ani';

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
    }
  }
`;

interface GetAniByIdType {
  Media: AniItemType;
}

export default function useGetAniById(id: string) {
  return useSuspenseQuery<GetAniByIdType>(getAniByIdQuery, {
    variables: { id },
  });
}
