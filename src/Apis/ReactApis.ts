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
};
