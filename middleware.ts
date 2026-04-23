import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/bookmarks', '/ratings'];
// /profile 정확 일치만 보호 (타인 프로필 /profile/[id]는 공개)
const PROTECTED_EXACT = ['/profile'];

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // getSession() 대신 getUser() 사용 — 서버사이드 JWT 검증으로 보안 강화
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 미인증 사용자의 보호된 라우트 접근 차단
  if (
    !user &&
    (PROTECTED_ROUTES.some((r) => request.nextUrl.pathname.startsWith(r)) ||
      PROTECTED_EXACT.some((r) => request.nextUrl.pathname === r))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirectTo', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // 인증된 사용자의 auth 페이지 접근 시 홈으로 리디렉트
  if (
    user &&
    ['/login', '/signup'].some((r) => request.nextUrl.pathname === r)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
