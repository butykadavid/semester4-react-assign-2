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

export const experiencesApi = createApi({
  reducerPath: "experiencesApi",
  baseQuery,
  endpoints: (builder) => ({
    getExp: builder.query({
      query: () => "experiences"
    }),
    createExp: builder.mutation({
      query: (body) => ({
        url: 'experiences',
        method: 'POST',
        body: body
      })
    }),
    modifyExp: builder.mutation({
      query: ({ body, id }) => ({
        url: `experiences/${id}`,
        method: 'PATCH',
        body: body
      })
    }),
    deleteExp: builder.mutation({
      query: ({ id }) => ({
        url: `experiences/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const { useGetExpQuery, useCreateExpMutation, useModifyExpMutation, useDeleteExpMutation } = experiencesApi