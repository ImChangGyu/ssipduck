'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_LIST } from '~/components/layout/constant';
import * as SVG from '~/assets/svg';
import { cn } from '~/utils/cn';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const pathname = usePathname();

  return (
    <div>
      <header className="w-full h-[80px] bg-primary px-[3%] md:px-[5%] flex justify-between items-center">
        <div className="h-full flex items-center cursor-pointer">
          <SVG.SsipduckLogo />
        </div>
        <ul className="flex list-none gap-[20px] md:gap-[10px]">
          {NAV_LIST.map((item, index) => (
            <li key={`nav-item__${index}`}>
              <Link
                href={item.to}
                className={cn(
                  'text-white font-bold text-lg no-underline md:text-sm',
                  pathname === item.to ? 'opacity-100' : 'opacity-50'
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </header>
      <main>{children}</main>
    </div>
  );
}
