'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MailCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card';
import * as SVG from '~/assets/svg';

export default function VerifyPage() {
  const router = useRouter();

  useEffect(() => {
    const email = sessionStorage.getItem('signup_email');
    if (!email) {
      router.replace('/signup');
    }
  }, [router]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-none">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <SVG.SsipduckLogo />
          </div>
          <CardTitle className="text-headline-sm">이메일을 확인해주세요</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 py-4">
          <MailCheck className="size-12 text-primary" />
          <CardDescription className="text-body-md text-on-surface-variant text-center">
            가입하신 이메일로 인증 링크를 보냈습니다.
            <br />
            이메일의 링크를 클릭하면 자동으로 로그인됩니다.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
