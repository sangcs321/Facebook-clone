import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Base_URL from '../../Constants/apiConfig'
import CreatePost from '../../Components/Message/CreatePost';
export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: Base_URL,
        prepareHeaders: (headers) => {
            const token = sessionStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        createPost: builder.mutation({
            query: (post) => ({
                url: `/api/post`,
                method: 'POST',
                body: post
            }),
        }),
    })
})

export const { useCreatePostMutation} = postApi;