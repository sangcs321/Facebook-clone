import { ReactModel } from "@Models";
import { ApiService } from "Services/ApiService";

export const ReactApis = {
  getQuantityReactByPostId(postId: number) {
    return ApiService.get<number>(`/api/reaction/${postId}`);
  },
  updateReactPost(reactData: ReactModel) {
    return ApiService.post(`/api/reaction`, reactData);
  },
  cancleReactPost(reactData: ReactModel) {
    return ApiService.delete(`/api/reaction`, { data: reactData });
  },
  getTotalReactByPostId(postId: number) {
    return ApiService.get<number>(`/api/reaction/totals/${postId}`);
  },
  getReactByPostId(postId: number) {
    return ApiService.get(`/api/reaction/total/${postId}`);
  },
  getListUsersReact(postId: number) {
    return ApiService.get(`/api/reaction/user/${postId}`);
  },
};
