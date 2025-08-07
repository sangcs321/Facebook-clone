import { User } from "@Models";
import { ApiService } from "Services/ApiService";

export const UserApis = {
  getUserById(id: number) {
    return ApiService.get<User>(`/api/user/${id}`);
  },
  updateUser(profile: any, id: number) {
    return ApiService.put(`/api/user/${id}`, profile);
  },
};
