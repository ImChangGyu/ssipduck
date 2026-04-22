'use client';

import { Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { useAuthStore } from '~/store/auth';
import { useBookmarkStore } from '~/store/bookmark';

interface BookmarkButtonProps {
  aniId: number;
}

export default function BookmarkButton({ aniId }: BookmarkButtonProps) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const { has, add, remove } = useBookmarkStore();
  const isBookmarked = has(aniId);

  async function handleClick(e: React.MouseEvent) {
    e.stopPropagation();

    if (!user) {
      router.push('/login');
      return;
    }

    if (isBookmarked) {
      remove(aniId);
      const res = await fetch(`/api/bookmarks?aniId=${aniId}`, { method: 'DELETE' });
      if (!res.ok) add(aniId); // 실패 시 롤백
    } else {
      add(aniId);
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aniId }),
      });
      if (!res.ok) remove(aniId); // 실패 시 롤백
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
