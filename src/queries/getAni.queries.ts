import { gql } from '@apollo/client';

export default gql`
  query Query(
    $page: Int
    $isAdult: Boolean
    $type: MediaType
    $sort: [MediaSort]
    $format: MediaFormat
    $search: String
    $season: MediaSeason
    $seasonYear: Int
  ) {
    Page(page: $page) {
      media(
        isAdult: $isAdult
        type: $type
        sort: $sort
        format: $format
        search: $search
        season: $season
        seasonYear: $seasonYear
      ) {
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
`;
