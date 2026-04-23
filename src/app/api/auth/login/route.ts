import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const response = NextResponse.json({ success: true });

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
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return NextResponse.json(
      { error: error?.message ?? '로그인에 실패했습니다.' },
      { status: 401 }
    );
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, nickname, bio')
    .eq('id', data.user.id)
    .single();

  // 응답에 user + profile을 담아 클라이언트에서 store 바로 업데이트
  const successResponse = NextResponse.json({
    user: data.user,
    profile: profile ?? null,
  });

  // login에서 설정된 쿠키를 successResponse로 복사
  response.cookies.getAll().forEach(({ name, value, ...rest }) => {
    successResponse.cookies.set(name, value, rest);
  });

  return successResponse;
}
