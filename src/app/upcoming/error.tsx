'use client';

import AniListError from '~/components/error/ani-list-error';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return <AniListError error={error} reset={reset} />;
}
