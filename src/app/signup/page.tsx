'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserPlus } from 'lucide-react';
import { signupSchema, type SignupFormValues } from '~/lib/validations/auth';
import { useSignupMutation } from '~/features/auth/api/signup';
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

export default function SignupPage() {
  const router = useRouter();
  const signupMutation = useSignupMutation();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
    },
  });

  async function onSubmit(values: SignupFormValues) {
    try {
      await signupMutation.mutateAsync({
        email: values.email,
        password: values.password,
        nickname: values.nickname,
        redirectTo: `${window.location.origin}/auth/callback`,
      });
      sessionStorage.setItem('signup_email', values.email);
      router.push('/signup/verify');
    } catch (err) {
      // error handled via signupMutation.error
    }
  }

  const errorMessage = signupMutation.error?.message?.includes('already registered')
    ? '이미 사용 중인 이메일입니다.'
    : signupMutation.error
    ? '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.'
    : null;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-none">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <SVG.SsipduckLogo />
          </div>
          <CardTitle className="text-headline-sm">회원가입</CardTitle>
          <CardDescription className="text-body-md text-on-surface-variant">
            씹덕 계정을 만들어보세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage}</AlertDescription>
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
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>닉네임</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="2~20자, 한글/영문/숫자/_"
                        autoComplete="nickname"
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
                        placeholder="8자 이상, 영문+숫자 포함"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요"
                        autoComplete="new-password"
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
                disabled={signupMutation.isPending}
              >
                <UserPlus />
                {signupMutation.isPending ? '가입 중...' : '회원가입'}
              </Button>
            </form>
          </Form>
          <p className="text-center text-label-md text-on-surface-variant">
            이미 계정이 있으신가요?{' '}
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              로그인
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
