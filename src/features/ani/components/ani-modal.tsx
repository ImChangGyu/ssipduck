"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { track } from "~/lib/analytics";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "~/components/ui/dialog";
import Player from "~/components/ui/player/player";
import BookmarkButton from "~/features/ani/components/bookmark-button";
import RatingInput from "~/features/ani/components/rating-input";
import RatingStars from "~/components/ui/rating-stars";
import AniListWithTitle from "~/features/ani/components/ani-list-with-title";
import CommentInput from "~/features/ani/components/comment-input";
import CommentList from "~/features/ani/components/comment-list";
import useGetAniById from "~/features/ani/api/get-ani-by-id";
import { useMeQuery } from "~/features/auth/api/get-me";
import { useRatingsStatsQuery } from "~/features/rating/api/get-ratings-stats";
import { useCommentsQuery } from "~/features/comment/api/get-comments";
import { stripTag, trailerUrl } from "~/utils/formatter";

interface AniModalProps {
  aniId: string;
}

export default function AniModal({ aniId }: AniModalProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { data: meData } = useMeQuery();
  const user = meData?.user ?? null;

  const numericAniId = Number(aniId);

  const { data: statsMap } = useRatingsStatsQuery([numericAniId]);
  const platformStats = statsMap.get(numericAniId) ?? null;

  const { data: commentsData } = useCommentsQuery(numericAniId);
  const comments = commentsData.comments;

  const {
    data: { Media: ani },
  } = useGetAniById(aniId);

  useEffect(() => {
    track('view_ani_detail', { ani_id: numericAniId, ani_title: ani.title.romaji });
  }, [numericAniId]);

  const onExit = () => {
    router.push(pathname, { scroll: false });
  };

  const myComment = user ? (comments.find((c) => c.userId === user.id) ?? null) : null;
  const otherComments = user ? comments.filter((c) => c.userId !== user.id) : comments;

  const hasTrailer = Boolean(ani.trailer?.id);
  const bgImage = ani.bannerImage || ani.coverImage.extraLarge;
  const description = stripTag(ani.description);

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onExit();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="p-0 gap-0 overflow-hidden bg-surface-container-low border-outline-variant shadow-elevation-4
          max-sm:inset-0 max-sm:top-0 max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0 max-sm:max-w-full max-sm:w-full max-sm:h-dvh max-sm:rounded-none
          sm:max-w-[min(900px,calc(100vw-2rem))] sm:rounded-xl"
      >
        <DialogTitle className="sr-only">{ani.title.romaji}</DialogTitle>

        <DialogClose asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="닫기"
            className="absolute top-3 right-3 z-30 size-10 rounded-full bg-surface-container-highest/80 backdrop-blur-sm text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
          >
            <X className="size-[18px]" />
          </Button>
        </DialogClose>

        <div className="overflow-y-auto no-scrollbar max-h-[90vh] max-sm:max-h-none max-sm:h-full">
          <div className="relative w-full">
            {hasTrailer ? (
              <div className="w-full aspect-video sm:rounded-t-xl overflow-hidden">
                <Player
                  url={trailerUrl(
                    ani.trailer?.id ?? "",
                    ani.trailer?.site ?? "",
                  )}
                  placeholderImage={bgImage ?? ""}
                />
              </div>
            ) : bgImage ? (
              <div className="relative w-full h-[300px] md:h-[380px] sm:rounded-t-xl overflow-hidden bg-surface-container">
                <Image
                  src={bgImage}
                  fill
                  sizes="900px"
                  alt=""
                  aria-hidden
                  className="object-cover object-center"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(237,237,242,0.06)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/30 to-transparent" />
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 md:px-8">
            <div className="flex gap-5 items-start">
              <div className="hidden sm:block flex-shrink-0 w-[160px] -mt-20 rounded-md overflow-hidden shadow-elevation-2 border border-outline-variant/60">
                <div className="relative aspect-[2/3]">
                  <Image
                    src={ani.coverImage.extraLarge}
                    fill
                    sizes="160px"
                    alt={`${ani.title.romaji} 포스터`}
                    className="object-cover z-10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <div className="flex items-start gap-2">
                  <h2 className="text-headline-md md:text-headline-lg font-bold text-on-surface leading-tight flex-1 text-balance">
                    {ani.title.romaji}
                  </h2>
                  <BookmarkButton aniId={ani.id} />
                </div>

                {ani.genres.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {ani.genres.map((genre) => (
                      <Badge key={genre} variant="secondary">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {platformStats && platformStats.ratingCount > 0 && (
              <div className="flex items-center gap-2">
                <RatingStars score={platformStats.avgScore / 2} size="sm" />
                <span className="text-label-lg text-on-surface font-medium">
                  {(platformStats.avgScore / 2).toFixed(1)}
                </span>
                <span className="text-body-sm text-on-surface-variant">
                  · {platformStats.ratingCount.toLocaleString()}명
                </span>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <RatingInput aniId={ani.id} />
              <CommentInput aniId={ani.id} myComment={myComment} />
            </div>

            {description && (
              <p className="text-body-md text-on-surface/85 leading-relaxed text-pretty">
                {description}
              </p>
            )}

            <AniListWithTitle title="Series" aniList={ani.relations.nodes} />
            <AniListWithTitle
              title="Recommendation"
              aniList={ani.recommendations.nodes.map(
                (node) => node.mediaRecommendation,
              )}
            />

            <div className="flex flex-col gap-4">
              <h3 className="text-title-md font-semibold text-on-surface">
                댓글
                {comments.length > 0 && (
                  <span className="text-on-surface-variant font-normal ml-1.5">
                    {comments.length}
                  </span>
                )}
              </h3>
              {otherComments.length === 0 && !myComment ? (
                <p className="text-body-md text-on-surface-variant">아직 댓글이 없습니다.</p>
              ) : (
                <CommentList comments={otherComments} />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
