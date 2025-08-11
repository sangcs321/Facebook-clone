export interface PostModel {
  id: number;
  userId: number;
  name: string;
  caption: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  listFiles: string[];
  userReact?: string;
  listReacts: number[];
}
