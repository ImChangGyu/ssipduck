import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  const successRedirect = NextResponse.redirect(`${origin}/`);
  const errorRedirect = NextResponse.redirect(`${origin}/signup?error=auth_callback_error`);

  if (!code) {
    return errorRedirect;
  }

  // 쿠키를 redirect response에 직접 세팅해야 세션이 유지됨
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            successRedirect.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return errorRedirect;
  }

  return successRedirect;
}
