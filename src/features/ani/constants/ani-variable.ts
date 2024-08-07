function getUpcomingSeason(month: number) {
  // WINTER: 12 ~ 2 -> SPRING
  // SPRING: 3 ~ 5 -> SUMMER
  // SUMMER: 6 ~ 8 -> FALL
  // FALL: 9 ~ 11 -> WINTER
  switch (month) {
    case 12:
    case 1:
    case 2:
      return 'SPRING';
    case 3:
    case 4:
    case 5:
      return 'SUMMER';
    case 6:
    case 7:
    case 8:
      return 'FALL';
    case 9:
    case 10:
    case 11:
      return 'WINTER';
  }
}

function getUpcomingVariable() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const upcomingSeason = getUpcomingSeason(currentMonth);
  const upcomingYear =
    upcomingSeason === 'WINTER' ? currentYear + 1 : currentYear;

  return { upcomingSeason, upcomingYear };
}

const defaultVariables = (page: number, search?: string) => ({
  isAdult: false,
  type: 'ANIME',
  page: page,
  search: search || undefined,
});

export const ANI_VARIABLES = (page: number, search?: string) => ({
  popular() {
    return {
      ...defaultVariables(page, search),
      sort: 'POPULARITY_DESC',
    };
  },
  trend() {
    return {
      ...defaultVariables(page, search),
      sort: ['TRENDING_DESC', 'POPULARITY_DESC'],
    };
  },
  upcoming() {
    const { upcomingSeason, upcomingYear } = getUpcomingVariable();
    return {
      ...defaultVariables(page, search),
      sort: 'POPULARITY_DESC',
      seasonYear: upcomingYear,
      season: upcomingSeason,
    };
  },
  movie() {
    return {
      ...defaultVariables(page, search),
      sort: 'POPULARITY_DESC',
      format: 'MOVIE',
    };
  },
  favorite() {
    if (typeof window === 'undefined') return { id_in: [] };

    const favoriteAniIdList =
      JSON.parse(localStorage.getItem('favorite-ani-list') ?? '').state
        .favoriteAniIdList ?? [];

    return {
      id_in: favoriteAniIdList,
    };
  },
});
