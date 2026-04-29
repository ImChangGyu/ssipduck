'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, X } from 'lucide-react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { useDebouncedValue } from '~/features/search/hooks/use-debounced-value';
import { useClickOutside } from '~/features/search/hooks/use-click-outside';
import { SEARCH_DEBOUNCE_MS } from '~/features/search/constants/search';
import SearchPanel from '~/features/search/components/search-panel';

export default function HeaderSearch() {
  const [q, setQ] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const debouncedQ = useDebouncedValue(q, SEARCH_DEBOUNCE_MS);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isPanelVisible = debouncedQ.trim().length > 0;

  useEffect(() => { setMounted(true); }, []);

  const close = useCallback(() => {
    setQ('');
    setMobileOpen(false);
  }, []);

  useClickOutside(containerRef, close, !mobileOpen);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [close]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const mobileOverlay = (
    <div className="fixed inset-x-0 top-16 bottom-0 z-[200] flex flex-col bg-background">
      {/* 검색 input */}
      <div className="relative flex items-center gap-2 px-3 py-2 border-b border-outline-variant">
        <Search
          className="absolute left-6 size-4 text-on-surface-variant pointer-events-none"
          aria-hidden
        />
        <Input
          ref={inputRef}
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="애니, 유저 검색..."
          aria-label="검색"
          className={cn(
            'h-10 pl-10 text-body-md flex-1',
            'bg-surface-container border-outline',
            'placeholder:text-on-surface-variant',
          )}
        />
        <Button variant="ghost" size="sm" onClick={close} aria-label="검색 닫기">
          <X className="size-5" />
        </Button>
      </div>

      {/* 결과 패널 */}
      {isPanelVisible && (
        <div className="flex-1 overflow-y-auto">
          <SearchPanel q={debouncedQ} onClose={close} />
        </div>
      )}
    </div>
  );

  return (
    <div ref={containerRef} className="relative md:flex-1 md:flex md:justify-center">
      {/* 데스크톱: 항상 노출 */}
      <div className="hidden md:flex w-full max-w-xl relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-on-surface-variant pointer-events-none"
          aria-hidden
        />
        <Input
          ref={inputRef}
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="애니, 유저 검색..."
          aria-label="검색"
          className={cn(
            'h-9 pl-10 pr-8 text-body-md w-full',
            'bg-surface-container border-outline',
            'placeholder:text-on-surface-variant',
          )}
        />
        {q && (
          <button
            onClick={close}
            aria-label="검색어 지우기"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
          >
            <X className="size-4" />
          </button>
        )}

        {isPanelVisible && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50 max-h-[calc(100vh-4rem-2rem)] overflow-y-auto rounded-xl">
            <SearchPanel q={debouncedQ} onClose={close} />
          </div>
        )}
      </div>

      {/* 모바일: 아이콘만 노출 */}
      <div className="flex md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMobileOpen(true)}
          aria-label="검색 열기"
        >
          <Search className="size-5" />
        </Button>
      </div>

      {/* 모바일: Portal로 body에 직접 렌더링 — backdrop-filter containing block 우회 */}
      {mounted && mobileOpen && createPortal(mobileOverlay, document.body)}
    </div>
  );
}
