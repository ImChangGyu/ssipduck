'use client';

import { Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { useMeQuery } from '~/features/auth/api/get-me';
import { useIsBookmarked } from '~/features/bookmark/api/get-bookmarks';
import { useAddBookmarkMutation } from '~/features/bookmark/api/add-bookmark';
import { useDeleteBookmarkMutation } from '~/features/bookmark/api/delete-bookmark';

interface BookmarkButtonProps {
  aniId: number;
}

export default function BookmarkButton({ aniId }: BookmarkButtonProps) {
  const router = useRouter();
  const { data } = useMeQuery();
  const user = data?.user ?? null;
  const isBookmarked = useIsBookmarked(aniId, !!user);
  const addMutation = useAddBookmarkMutation();
  const deleteMutation = useDeleteBookmarkMutation();

  async function handleClick(e: React.MouseEvent) {
    e.stopPropagation();

    if (!user) {
      router.push('/login');
      return;
    }

    if (isBookmarked) {
      deleteMutation.mutate(aniId);
    } else {
      addMutation.mutate(aniId);
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      aria-label={isBookmarked ? '찜 해제' : '찜하기'}
      aria-pressed={isBookmarked}
      className="rounded-full"
    >
      <Bookmark
        className={cn(
          'transition-colors duration-150',
          isBookmarked
            ? 'fill-primary text-primary'
            : 'text-muted-foreground'
        )}
      />
    </Button>
  );
}
