import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Base_URL from "@Constants/apiConfig";
import { PostModel } from "@Models";
export const PostApi = createApi({
  reducerPath: "PostApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Base_URL,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (post) => ({
        url: `/api/post`,
        method: "POST",
        body: post,
      }),
    }),
    getPostByUserId: builder.query<PostModel[], string>({
      query: (id) => ({
        url: `/api/post/user/${id}`,
      }),
    }),
    getFriendPost: builder.query<PostModel[], string>({
      query: (id) => ({
        url: `/api/post/friend/${id}`,
      }),
    }),
    deletePostById: builder.mutation({
      query: (id) => ({
        url: `/api/post/${id}`,
        method: "POST",
      }),
    }),
    getPostById: builder.query<PostModel[], number>({
      query: (id) => ({
        url: `/api/post/${id}`,
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostByUserIdQuery,
  useDeletePostByIdMutation,
  useGetFriendPostQuery,
  useGetPostByIdQuery,
} = PostApi;
