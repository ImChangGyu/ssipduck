'use client';

import { useState } from 'react';
import { Check, ListFilter } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet';
import { useMediaQuery } from '~/hooks/use-media-query';
import { VariableType } from '~/types/ani';

const FILTER_OPTIONS: { value: VariableType; label: string; emoji: string }[] = [
  { value: 'popular',  label: 'Popular',  emoji: '🔥' },
  { value: 'trend',    label: 'Trend',    emoji: '📈' },
  { value: 'upcoming', label: 'Upcoming', emoji: '🗓️' },
  { value: 'movie',    label: 'Movie',    emoji: '🎬' },
  { value: 'favorite', label: 'Favorite', emoji: '⭐' },
];

interface AniFilterProps {
  value: VariableType;
  onChange: (type: VariableType) => void;
}

function FilterOptionList({
  value,
  onChange,
  onClose,
}: AniFilterProps & { onClose: () => void }) {
  return (
    <div className="flex flex-col gap-1 py-1">
      {FILTER_OPTIONS.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <Button
            key={opt.value}
            variant={isSelected ? 'secondary' : 'ghost'}
            className="w-full justify-start gap-3 px-4"
            onClick={() => {
              onChange(opt.value);
              onClose();
            }}
          >
            <span aria-hidden>{opt.emoji}</span>
            <span className="flex-1 text-left">{opt.label}</span>
            {isSelected && <Check className="ml-auto size-4" />}
          </Button>
        );
      })}
    </div>
  );
}

export default function AniFilter({ value, onChange }: AniFilterProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const currentLabel = FILTER_OPTIONS.find((o) => o.value === value)?.label ?? 'Popular';

  const trigger = (
    <Button
      type="button"
      variant="ghost"
      aria-label={`필터: ${currentLabel}`}
      aria-expanded={open}
      className="shrink-0 gap-1.5 px-3 h-full rounded-none border-l border-outline text-on-surface-variant text-label-lg font-medium hover:bg-transparent hover:text-on-surface data-[state=open]:text-primary"
    >
      <ListFilter className="size-[18px] shrink-0" />
      <span className="hidden sm:inline">{currentLabel}</span>
    </Button>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent
          side="bottom"
          className="bg-surface-container-high border-outline-variant rounded-t-xl pb-safe"
          showCloseButton={false}
        >
          <SheetHeader>
            <SheetTitle className="text-title-md font-semibold text-on-surface text-left">
              카테고리
            </SheetTitle>
          </SheetHeader>
          <FilterOptionList
            value={value}
            onChange={onChange}
            onClose={() => setOpen(false)}
          />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-48 p-1 bg-surface-container-high border-outline-variant shadow-elevation-3"
      >
        <FilterOptionList
          value={value}
          onChange={onChange}
          onClose={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}
