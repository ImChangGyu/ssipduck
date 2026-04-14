'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import * as SVG from '~/assets/svg';
import { cn } from '~/lib/utils';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header
        className={cn(
          'w-full h-16 sticky top-0 z-30',
          'px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center',
          'transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300',
          scrolled
            ? 'bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant shadow-elevation-1'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <Link href="/" className="h-full flex items-center" aria-label="홈으로">
          <SVG.SsipduckLogo />
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
}
