'use client';

import { Separator } from '~/components/ui/separator';
import AniItemCompact from '~/features/ani/components/ani-item-compact';
import { AniItemType } from '~/types/ani';
import { isEmptyArray } from '~/utils/array';
import { useDragScroll } from '~/hooks/use-drag-scroll';

interface AniListWithTitleProps {
  title: string;
  aniList: AniItemType[];
}

export default function AniListWithTitle({
  title,
  aniList,
}: AniListWithTitleProps) {
  const { ref, onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDragScroll<HTMLDivElement>();

  if (isEmptyArray(aniList)) return null;

  return (
    <div className="flex flex-col gap-3">
      {/* Section heading with decorative separator */}
      <div className="flex items-center gap-3">
        <span className="text-label-md font-semibold text-muted-foreground uppercase tracking-widest shrink-0">
          {title}
        </span>
        <Separator className="flex-1 bg-outline-variant/40" />
      </div>

      {/* Horizontal scroll row */}
      <div
        ref={ref}
        className="flex gap-3 overflow-x-auto no-scrollbar pb-2 cursor-grab"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        {aniList.map((ani) => (
          <AniItemCompact key={`${title}-${ani.id}`} ani={ani} />
        ))}
      </div>
    </div>
  );
}
