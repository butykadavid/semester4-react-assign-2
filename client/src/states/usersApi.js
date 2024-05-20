import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3030/',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().user.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery,
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => `users/${id}`
        }),
        createUser: builder.mutation({
            query: ({ body }) => ({
                url: 'users',
                method: 'POST',
                body: body
            })
        }),
        loginUser: builder.mutation({
            query: ({ body }) => ({
                url: 'authentication',
                method: 'POST',
                body: {
                    ...body,
                    strategy: "local"
                }
            })
        }),
        createJobUser: builder.mutation({
            query: ({ body }) => ({
                url: 'applicants',
                method: 'POST',
                body: body
            })
        }),
        getApplications: builder.query({
            query: (id) => `applicants?/userId=${id}`
        })
    })
})

export const { useGetUserQuery, useCreateUserMutation, useLoginUserMutation, useCreateJobUserMutation, useGetApplicationsQuery } = usersApi;