'use client';

import { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Input } from '~/components/ui/input';
import AniFilter from '~/features/ani/components/ani-filter';
import { VariableType } from '~/types/ani';
import { cn } from '~/lib/utils';

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
      <div className="flex items-center gap-2">
        <form onSubmit={onSubmit} className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-on-surface-variant pointer-events-none"
            aria-hidden
          />
          <Input
            type="text"
            placeholder="애니 검색..."
            aria-label="애니 검색"
            className={cn(
              'h-12 pl-10 text-body-lg',
              'bg-surface-container border-outline',
              'placeholder:text-on-surface-variant',
            )}
            {...register('search')}
          />
        </form>

        {/* Filter button (+ dropdown) */}
        <AniFilter value={type} onChange={onTypeChange} />
      </div>
    </div>
  );
}
