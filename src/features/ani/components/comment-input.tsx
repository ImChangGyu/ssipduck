"use client";

import { useState } from "react";
import { useAuthStore } from "~/store/auth";
import { useRatingStore } from "~/store/rating";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import type { CommentItem } from "~/features/ani/types/comment";

const MAX_LENGTH = 500;

interface CommentInputProps {
  aniId: number;
  myComment: CommentItem | null;
  onCommentChange: (updated: CommentItem | null) => void;
}

export default function CommentInput({
  aniId,
  myComment,
  onCommentChange,
}: CommentInputProps) {
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const currentScore = useRatingStore((s) => s.get(aniId));

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) return null;

  if (currentScore === undefined) {
    return (
      <p className="text-body-sm text-on-surface-variant">
        댓글을 남기려면 먼저 별점을 평가해주세요.
      </p>
    );
  }

  async function handleSubmit() {
    if (!text.trim() || isSubmitting) return;
    setIsSubmitting(true);
    const res = await fetch("/api/comments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ aniId, content: text.trim() }),
    });
    setIsSubmitting(false);
    if (!res.ok) return;
    const now = new Date().toISOString();
    onCommentChange({
      userId: user!.id,
      aniId,
      content: text.trim(),
      score: currentScore ?? 0,
      createdAt: myComment?.createdAt ?? now,
      updatedAt: now,
      profile: profile ? { nickname: profile.nickname } : null,
    });
    setIsEditing(false);
    setText("");
  }

  async function handleDelete() {
    const res = await fetch(`/api/comments?aniId=${aniId}`, {
      method: "DELETE",
    });
    if (res.ok) onCommentChange(null);
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
            disabled={!text.trim() || isSubmitting}
            onClick={handleSubmit}
          >
            {isEditing ? "저장" : "등록"}
          </Button>
        </div>
      </div>
    </div>
  );
}
