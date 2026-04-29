'use client';

import { gql, useQuery } from '@apollo/client';
import { AniItemType } from '~/types/ani';
import { SEARCH_PAGE_SIZE } from '~/features/search/constants/search';

export const searchAniQuery = gql`
  query SearchAni(
    $page: Int
    $perPage: Int
    $search: String
    $isAdult: Boolean
    $type: MediaType
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
      }
      media(isAdult: $isAdult, type: $type, search: $search) {
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
`;

interface SearchAniData {
  Page: {
    pageInfo: { hasNextPage: boolean };
    media: AniItemType[];
  };
}

export function useSearchAnis(q: string) {
  const { data, loading, fetchMore } = useQuery<SearchAniData>(searchAniQuery, {
    variables: {
      page: 1,
      perPage: SEARCH_PAGE_SIZE,
      search: q,
      isAdult: false,
      type: 'ANIME',
    },
    skip: !q,
    notifyOnNetworkStatusChange: true,
  });

  function loadMore(page: number) {
    fetchMore({
      variables: {
        page,
        perPage: SEARCH_PAGE_SIZE,
        search: q,
        isAdult: false,
        type: 'ANIME',
      },
      updateQuery(prev, { fetchMoreResult }) {
        if (!fetchMoreResult) return prev;
        return {
          Page: {
            pageInfo: fetchMoreResult.Page.pageInfo,
            media: [...prev.Page.media, ...fetchMoreResult.Page.media],
          },
        };
      },
    });
  }

  return {
    anis: data?.Page.media ?? [],
    hasNextPage: data?.Page.pageInfo.hasNextPage ?? false,
    loading,
    loadMore,
  };
}
