import { CreatePostModel, PostModel } from "@Models";
import { ApiService } from "Services/ApiService";

export const PostApis = {
  getPostById(id: number) {
    return ApiService.get<PostModel>(`/api/post/${id}`);
  },
  getFriendPosts(userId: number) {
    return ApiService.get<PostModel[]>(`/api/post/friend/${userId}`);
  },
  createPost(post: CreatePostModel) {
    return ApiService.post<PostModel>(`/api/post`, post);
  },
  getPostsByUserId(userId: number) {
    return ApiService.get<PostModel[]>(`/api/post/user/${userId}`);
  },
  deletePostById(id: number) {
    return ApiService.delete(`/api/post/${id}`);
  },
  updatePost(id: number, postData: FormData) {
    return ApiService.put(`/api/post/${id}`, postData);
  },
};
