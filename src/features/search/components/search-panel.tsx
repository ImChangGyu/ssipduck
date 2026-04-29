'use client';

import SearchAniSection from '~/features/search/components/search-ani-section';
import SearchUserSection from '~/features/search/components/search-user-section';

interface SearchPanelProps {
  q: string;
  onClose: () => void;
}

export default function SearchPanel({ q, onClose }: SearchPanelProps) {
  return (
    <div
      className="w-full bg-surface-container-low border border-outline-variant
        md:rounded-xl shadow-elevation-2"
    >
      {/* 애니 섹션 */}
      <div>
        <p className="px-4 pt-3 pb-1 text-label-sm font-semibold text-on-surface-variant uppercase tracking-wider">
          애니
        </p>
        <SearchAniSection q={q} onClose={onClose} />
      </div>

      {/* 구분선 */}
      <div className="h-px bg-outline-variant mx-4" />

      {/* 유저 섹션 */}
      <div>
        <p className="px-4 pt-3 pb-1 text-label-sm font-semibold text-on-surface-variant uppercase tracking-wider">
          유저
        </p>
        <SearchUserSection q={q} onClose={onClose} />
      </div>
    </div>
  );
}
