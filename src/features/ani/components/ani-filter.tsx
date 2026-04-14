'use client';

import { Check, ListFilter } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { VariableType } from '~/types/ani';
import { cn } from '~/lib/utils';

const FILTER_OPTIONS: { value: VariableType; label: string; emoji: string }[] = [
  { value: 'popular',  label: 'Popular',  emoji: '🔥' },
  { value: 'trend',    label: 'Trend',    emoji: '📈' },
  { value: 'upcoming', label: 'Upcoming', emoji: '🗓️' },
  { value: 'movie',    label: 'Movie',    emoji: '🎬' },
  { value: 'favorite', label: 'Favorite', emoji: '⭐' },
];

const DEFAULT_TYPE: VariableType = 'popular';

interface AniFilterProps {
  value: VariableType;
  onChange: (type: VariableType) => void;
}

export default function AniFilter({ value, onChange }: AniFilterProps) {
  const current = FILTER_OPTIONS.find((o) => o.value === value)!;
  const isActive = value !== DEFAULT_TYPE;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          aria-label={`필터: ${current.label}`}
          className={cn(
            'h-12 gap-2 px-3 shrink-0 border-outline text-label-lg font-medium',
            'text-on-surface-variant hover:text-on-surface transition-colors',
            isActive && 'border-primary text-primary bg-primary/5 hover:text-primary',
          )}
        >
          <ListFilter className="size-[18px] shrink-0" />
          <span className="hidden sm:inline">
            {current.emoji} {current.label}
          </span>
          {isActive && (
            <span className="sm:hidden size-2 rounded-full bg-primary shrink-0" aria-hidden />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-44 sm:w-44 bg-surface-container-high border-outline-variant shadow-elevation-3"
      >
        <DropdownMenuLabel className="text-label-sm text-on-surface-variant">
          카테고리
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
          {FILTER_OPTIONS.map((opt) => {
            const selected = opt.value === value;
            return (
              <DropdownMenuItem
                key={opt.value}
                onClick={() => onChange(opt.value)}
                className={cn(
                  'gap-2 text-label-lg cursor-pointer',
                  selected && 'bg-primary/10 text-primary focus:bg-primary/15 focus:text-primary',
                )}
              >
                <span aria-hidden>{opt.emoji}</span>
                <span className="flex-1">{opt.label}</span>
                {selected && <Check className="size-4 shrink-0" />}
              </DropdownMenuItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
