'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn } from 'lucide-react';
import { loginSchema, type LoginFormValues } from '~/lib/validations/auth';
import { useAuthStore } from '~/store/auth';
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

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setProfile, setLoading } = useAuthStore();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: LoginFormValues) {
    setError(null);
    setIsSubmitting(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: values.email, password: values.password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(
        data.error === 'Invalid login credentials'
          ? '이메일 또는 비밀번호가 올바르지 않습니다.'
          : '로그인 중 오류가 발생했습니다. 다시 시도해주세요.'
      );
      setIsSubmitting(false);
      return;
    }

    const { user, profile } = await res.json();
    setUser(user);
    if (profile) setProfile(profile);
    setLoading(false);

    const redirectTo = searchParams.get('redirectTo') || '/';
    router.push(redirectTo);
  }

  return (
    <Card className="w-full max-w-md border-none">
      <CardHeader className="text-center space-y-3">
        <div className="flex justify-center">
          <SVG.SsipduckLogo />
        </div>
        <CardTitle className="text-headline-sm">로그인</CardTitle>
        <CardDescription className="text-body-md text-on-surface-variant">
          씹덕에 오신 것을 환영합니다
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="비밀번호를 입력해주세요"
                      autoComplete="current-password"
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
              <LogIn />
              {isSubmitting ? '로그인 중...' : '로그인'}
            </Button>
          </form>
        </Form>
        <p className="text-center text-label-md text-on-surface-variant">
          계정이 없으신가요?{' '}
          <Link
            href="/signup"
            className="text-primary hover:underline font-medium"
          >
            회원가입
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <Suspense fallback={<div className="w-full max-w-md h-80 rounded-xl bg-surface-container animate-pulse" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
