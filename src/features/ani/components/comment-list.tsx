'use client';

import { useRouter } from 'next/navigation';
import { cn } from '~/lib/utils';
import InitialAvatar from '~/features/profile/components/initial-avatar';
import RatingStars from '~/components/ui/rating-stars';
import { formatRelativeTime } from '~/utils/formatter';
import type { CommentItem } from '~/features/ani/types/comment';

interface CommentListProps {
  comments: CommentItem[];
  currentUserId?: string;
}

export default function CommentList({ comments, currentUserId }: CommentListProps) {
  const router = useRouter();

  if (comments.length === 0) return null;

  const sorted = currentUserId
    ? [...comments].sort((a, b) => (a.userId === currentUserId ? -1 : b.userId === currentUserId ? 1 : 0))
    : comments;

  return (
    <ul className="flex flex-col gap-5">
      {sorted.map((comment) => {
        const isModified = comment.updatedAt !== comment.createdAt;
        const nickname = comment.profile?.nickname ?? '알 수 없음';
        const isMe = comment.userId === currentUserId;

        return (
          <li
            key={comment.userId}
            className={cn(
              'flex gap-3',
              isMe && 'bg-primary-container/20 border border-primary/15 px-3 py-2.5 rounded-md -mx-3',
            )}
          >
            <InitialAvatar nickname={nickname} size="sm" className="flex-shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  className="text-label-md font-semibold text-on-surface hover:underline"
                  onClick={() => router.push(`/profile/${comment.userId}`)}
                >
                  {nickname}
                </button>
                {isMe && (
                  <span className="text-label-sm font-medium text-primary bg-primary-container px-1.5 py-0.5 rounded-sm">
                    나
                  </span>
                )}
                <RatingStars score={comment.score / 2} size="sm" />
                <span className="text-label-sm text-on-surface-variant">
                  {(comment.score / 2).toFixed(1)}
                </span>
              </div>
              <p className="text-body-md text-on-surface whitespace-pre-wrap break-words">
                {comment.content}
              </p>
              <span className="text-label-sm text-on-surface-variant">
                {formatRelativeTime(comment.updatedAt)}
                {isModified && ' (수정됨)'}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
