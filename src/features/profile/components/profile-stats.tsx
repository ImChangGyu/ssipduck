import { Star, Bookmark } from 'lucide-react';

interface ProfileStatsProps {
  ratingCount: number;
  bookmarkCount: number;
}

export default function ProfileStats({ ratingCount, bookmarkCount }: ProfileStatsProps) {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-1.5 text-on-surface-variant">
          <Star className="size-4" />
          <span className="text-label-md">평가한 애니</span>
        </div>
        <span className="text-headline-md font-bold text-on-surface">{ratingCount}</span>
      </div>
      <div className="w-px bg-outline-variant" />
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-1.5 text-on-surface-variant">
          <Bookmark className="size-4" />
          <span className="text-label-md">북마크</span>
        </div>
        <span className="text-headline-md font-bold text-on-surface">{bookmarkCount}</span>
      </div>
    </div>
  );
}
