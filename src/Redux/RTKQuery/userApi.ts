import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Base_URL from '@Constants/apiConfig'
import { User } from '@Constants/types';
export const userApi = createApi({
    reducerPath: 'userApi',
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
        getUserById: builder.query<User, string>({
            query: (id) => ({
                url: `/api/user/${id}`,
                method: 'GET',
            }),
        }),
        updateUser: builder.mutation({
            query: ({id, profileData}) => ({
                url:`/api/user/${id}`,
                method:'PUT',
                body: profileData,
            })
        })
    })
})

export const { useGetUserByIdQuery, useUpdateUserMutation } = userApi;