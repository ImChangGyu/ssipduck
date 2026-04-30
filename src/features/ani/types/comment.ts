export interface CommentItem {
  userId: string;
  aniId: number;
  content: string;
  score: number;
  createdAt: string;
  updatedAt: string;
  profile: { nickname: string } | null;
}
