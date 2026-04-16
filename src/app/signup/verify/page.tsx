'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, RefreshCw } from 'lucide-react';
import { otpSchema, type OtpFormValues } from '~/lib/validations/auth';
import { createClient } from '~/lib/supabase/client';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card';
import { Alert, AlertDescription } from '~/components/ui/alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import * as SVG from '~/assets/svg';

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  const masked = local.slice(0, 2) + '***';
  return `${masked}@${domain}`;
}

export default function VerifyPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('signup_email');
    if (!stored) {
      router.replace('/signup');
      return;
    }
    setEmail(stored);
  }, [router]);

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { token: '' },
  });

  async function onSubmit(values: OtpFormValues) {
    if (!email) return;
    setError(null);
    setIsSubmitting(true);

    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: values.token,
      type: 'signup',
    });

    if (error) {
      setError('인증번호가 올바르지 않거나 만료되었습니다. 다시 확인해주세요.');
      setIsSubmitting(false);
      return;
    }

    sessionStorage.removeItem('signup_email');
    router.push('/');
    router.refresh();
  }

  async function handleResend() {
    if (!email) return;
    setIsResending(true);
    setResendMessage(null);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    if (error) {
      setError('인증번호 재전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } else {
      setResendMessage('인증번호가 재전송되었습니다.');
    }
    setIsResending(false);
  }

  if (!email) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <SVG.SsipduckLogo />
          </div>
          <CardTitle className="text-headline-sm">이메일 인증</CardTitle>
          <CardDescription className="text-body-md text-on-surface-variant">
            <span className="text-on-surface font-medium">{maskEmail(email)}</span>
            {' '}으로 전송된{' '}
            <span className="text-on-surface font-medium">6자리 인증번호</span>를 입력해주세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {resendMessage && (
            <Alert>
              <AlertDescription>{resendMessage}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>인증번호</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        autoComplete="one-time-code"
                        placeholder="000000"
                        className="text-center text-title-lg tracking-widest"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                <KeyRound />
                {isSubmitting ? '인증 중...' : '인증 완료'}
              </Button>
            </form>
          </Form>
          <Button
            variant="ghost"
            className="w-full"
            onClick={handleResend}
            disabled={isResending}
          >
            <RefreshCw />
            {isResending ? '재전송 중...' : '인증번호 재전송'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
