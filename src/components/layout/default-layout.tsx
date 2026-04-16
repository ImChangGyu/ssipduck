'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, LogOut } from 'lucide-react';
import * as SVG from '~/assets/svg';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import { createClient } from '~/lib/supabase/client';
import { useAuthStore } from '~/store/auth';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { user, profile, isLoading } = useAuthStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

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
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          {isLoading ? (
            <Skeleton className="h-8 w-20 rounded-sm" />
          ) : user ? (
            <>
              <span className="text-label-md text-on-surface-variant hidden sm:inline">
                {profile?.nickname}
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout} aria-label="로그아웃">
                <LogOut />
                <span className="hidden sm:inline">로그아웃</span>
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => router.push('/login')} aria-label="로그인">
              <LogIn />
              <span className="hidden sm:inline">로그인</span>
            </Button>
          )}
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
