'use client';

import { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import AniFilter from '~/features/ani/components/ani-filter';
import { VariableType } from '~/types/ani';
import { cn } from '~/lib/utils';

const FILTER_LABELS: Record<VariableType, string> = {
  popular:  '🔥 Popular',
  trend:    '📈 Trend',
  upcoming: '🗓️ Upcoming',
  movie:    '🎬 Movie',
  favorite: '⭐ Favorite',
};

interface SearchAniProps {
  q: string;
  type: VariableType;
  onQueryChange: (q: string) => void;
  onTypeChange: (type: VariableType) => void;
}

export default function SearchAni({
  q,
  type,
  onQueryChange,
  onTypeChange,
}: SearchAniProps) {
  const { register, handleSubmit, setValue } = useForm<{ search: string }>({
    defaultValues: { search: q },
  });

  // Sync input value when URL q changes externally (e.g. browser back)
  const prevQ = useRef(q);
  useEffect(() => {
    if (prevQ.current !== q) {
      setValue('search', q);
      prevQ.current = q;
    }
  }, [q, setValue]);

  const onSubmit = handleSubmit(({ search }) => {
    onQueryChange(search.trim());
  });

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4">
      {/* Search + Filter bar */}
      <form
        onSubmit={onSubmit}
        className={cn(
          'flex items-stretch',
          'bg-surface-container rounded-xl',
          'border border-outline',
          'overflow-hidden',
          'shadow-elevation-1',
          'focus-within:shadow-elevation-2 focus-within:border-primary',
          'transition-shadow duration-200'
        )}
      >
        {/* Search icon button */}
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          aria-label="검색"
          className="shrink-0 ml-1 text-on-surface-variant hover:bg-transparent hover:text-on-surface"
        >
          <Search />
        </Button>

        {/* Text input */}
        <input
          type="text"
          placeholder="애니 검색..."
          className="flex-1 min-w-0 h-12 bg-transparent text-body-lg text-on-surface placeholder:text-on-surface-variant outline-none px-2"
          {...register('search')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onSubmit();
            }
          }}
        />

        {/* Filter button (+ popover/sheet) */}
        <AniFilter value={type} onChange={onTypeChange} />
      </form>

      {/* Active filter chip row — ToggleGroup (single select) */}
      <ToggleGroup
        type="single"
        value={type}
        onValueChange={(val) => { if (val) onTypeChange(val as VariableType); }}
        className="flex flex-wrap gap-2 mt-2 w-full"
      >
        {(Object.keys(FILTER_LABELS) as VariableType[]).map((t) => (
          <ToggleGroupItem
            key={t}
            value={t}
            className="h-8 rounded-full border border-outline text-label-lg font-medium
              data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground data-[state=on]:border-secondary
              data-[state=off]:text-on-surface-variant data-[state=off]:hover:bg-surface-container-high"
          >
            {FILTER_LABELS[t]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
