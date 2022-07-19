import { gql } from '@apollo/client';

export default gql`
  query Query(
    $page: Int
    $isAdult: Boolean
    $type: MediaType
    $sort: [MediaSort]
    $search: String
  ) {
    Page(page: $page) {
      media(isAdult: $isAdult, type: $type, sort: $sort, search: $search) {
        siteUrl
        title {
          english
          native
        }
        description
        genres
        studios {
          nodes {
            name
          }
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        coverImage {
          extraLarge
        }
      }
    }
  }
`;
