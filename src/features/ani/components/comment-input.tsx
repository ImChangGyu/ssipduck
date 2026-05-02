"use client";

import { useState } from "react";
import { useMeQuery } from "~/features/auth/api/get-me";
import { useMyRating } from "~/features/rating/api/get-ratings";
import { useUpsertCommentMutation } from "~/features/comment/api/upsert-comment";
import { useDeleteCommentMutation } from "~/features/comment/api/delete-comment";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import type { CommentItem } from "~/features/ani/types/comment";

const MAX_LENGTH = 500;

interface CommentInputProps {
  aniId: number;
  myComment: CommentItem | null;
}

export default function CommentInput({ aniId, myComment }: CommentInputProps) {
  const { data: meData } = useMeQuery();
  const user = meData?.user ?? null;
  const profile = meData?.profile ?? null;
  const currentScore = useMyRating(aniId, !!user);

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");

  const upsertMutation = useUpsertCommentMutation();
  const deleteMutation = useDeleteCommentMutation();

  if (!user) return null;

  if (currentScore === undefined) {
    return (
      <p className="text-body-sm text-on-surface-variant">
        댓글을 남기려면 먼저 별점을 평가해주세요.
      </p>
    );
  }

  async function handleSubmit() {
    if (!text.trim() || upsertMutation.isPending) return;
    await upsertMutation.mutateAsync({ aniId, content: text.trim() });
    setIsEditing(false);
    setText("");
  }

  function handleDelete() {
    deleteMutation.mutate(aniId);
  }

  if (myComment && !isEditing) {
    return (
      <div className="flex flex-col gap-2 p-3 rounded-md bg-surface-container border border-outline-variant/60">
        <p className="text-label-md text-on-surface-variant">내 댓글</p>
        <p className="text-body-md text-on-surface whitespace-pre-wrap break-words">
          {myComment.content}
        </p>
        <div className="flex gap-2 justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsEditing(true);
              setText(myComment.content);
            }}
          >
            수정
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-error hover:text-error"
            onClick={handleDelete}
          >
            삭제
          </Button>
        </div>
      </div>
    );
  }

  const isNearLimit = text.length > MAX_LENGTH * 0.8;

  return (
    <div className="relative">
      <Textarea
        placeholder="감상을 남겨보세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={MAX_LENGTH}
        rows={3}
        className="resize-none text-body-sm pb-10"
      />
      <div className="absolute bottom-2.5 left-3 right-2.5 flex items-end justify-between">
        <span
          className={cn(
            "text-[12px] leading-none pointer-events-none",
            isNearLimit ? "text-error" : "text-on-surface-variant/50",
          )}
        >
          {text.length}/{MAX_LENGTH}
        </span>
        <div className="flex gap-1.5">
          {isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsEditing(false);
                setText("");
              }}
            >
              취소
            </Button>
          )}
          <Button
            size="sm"
            disabled={!text.trim() || upsertMutation.isPending}
            onClick={handleSubmit}
          >
            {isEditing ? "저장" : "등록"}
          </Button>
        </div>
      </div>
    </div>
  );
}
