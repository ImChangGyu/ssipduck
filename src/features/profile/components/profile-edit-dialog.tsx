'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { useAuthStore } from '~/store/auth';

const formSchema = z.object({
  nickname: z
    .string()
    .min(2, '닉네임은 2자 이상이어야 합니다.')
    .max(20, '닉네임은 20자 이하여야 합니다.'),
  bio: z.string().max(120, '한줄소개는 120자 이하여야 합니다.').optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProfileEditDialogProps {
  currentNickname: string;
  currentBio: string | null;
}

export default function ProfileEditDialog({ currentNickname, currentBio }: ProfileEditDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setProfile = useAuthStore((s) => s.setProfile);
  const currentProfile = useAuthStore((s) => s.profile);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: currentNickname,
      bio: currentBio ?? '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: values.nickname, bio: values.bio || null }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? '수정에 실패했습니다.');
        return;
      }
      if (currentProfile) {
        setProfile({ ...currentProfile, ...data.profile });
      }
      setOpen(false);
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil />
          프로필 수정
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>프로필 수정</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>닉네임</FormLabel>
                  <FormControl>
                    <Input placeholder="닉네임을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>한줄소개</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="나를 한 줄로 소개해보세요 (120자 이하)"
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-label-sm text-error">{error}</p>}
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                취소
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? '저장 중...' : '저장'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
