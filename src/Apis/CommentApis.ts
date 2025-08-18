import { CommentModal } from "@Components";
import { CommentModel } from "@Models";
import { ApiService } from "Services/ApiService";

export const CommentApis = {
  createComment(comment: CommentModel) {
    return ApiService.post<CommentModel>("/api/comment", comment);
  },
  getAllCommentsByPostId(postId: number) {
    return ApiService.get<CommentModel[]>(`/api/comment/${postId}`);
  },
  deleteCommentById(commentId: number) {
    return ApiService.delete(`/api/comment/${commentId}`);
  },
  editComment(commentId: number, content: string) {
    return ApiService.put(
      `/api/comment/${commentId}`,
      { content },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  countCommentsByPostId(postId: number) {
    return ApiService.get<number>(`/api/comment/count/${postId}`);
  },
};
