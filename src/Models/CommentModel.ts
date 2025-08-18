export interface CommentModel {
  id?: number;
  postId: number;
  userId: number;
  content: string;
  parentCommentId?: number;
  createdAt?: string;
  userName?: string;
  avatarUrl?: string;
}
