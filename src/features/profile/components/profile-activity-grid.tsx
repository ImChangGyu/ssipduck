import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import AniStaticGrid from '~/features/ani/components/ani-static-grid';
import { AniItemType } from '~/types/ani';

interface ProfileActivityGridProps {
  title: string;
  items: AniItemType[];
  scores?: Record<number, number>;
  platformStats?: Record<number, number>;
  moreHref: string;
  emptyMessage: string;
}

export default function ProfileActivityGrid({
  title,
  items,
  scores,
  platformStats,
  moreHref,
  emptyMessage,
}: ProfileActivityGridProps) {
  return (
    <section>
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12 py-4">
        <h2 className="text-title-lg font-semibold text-on-surface">{title}</h2>
        {items.length > 0 && (
          <Link
            href={moreHref}
            className="flex items-center gap-0.5 text-label-md text-primary hover:text-primary/80 transition-colors"
          >
            전체보기
            <ChevronRight className="size-4" />
          </Link>
        )}
      </div>
      {items.length === 0 ? (
        <div className="flex items-center justify-center py-12 px-4 text-on-surface-variant">
          <p className="text-body-md">{emptyMessage}</p>
        </div>
      ) : (
        <AniStaticGrid items={items} scores={scores} platformStats={platformStats} />
      )}
    </section>
  );
}
