import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3030/jobs/',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery,
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (filters = {}) => {
        const {
          userId,
          company,
          minSalary,
          maxSalary,
          type,
          loc,
          isRemote
        } = filters;

        const params = new URLSearchParams();

        if (userId) params.append("userId", userId);
        if (company) params.append("company[$like]", `%${company}%`);
        if (minSalary !== undefined) params.append("salaryFrom[$gt]", minSalary);
        if (maxSalary !== undefined) params.append("salaryTo[$lt]", maxSalary);
        if (type) params.append("type", type);
        if (loc) params.append("city", loc);
        if (isRemote !== null && isRemote !== undefined) params.append("homeOffice", isRemote);

        return `?${params.toString()}`;
      },
    }),
    getJob: builder.query({
      query: (id) => `${id}`
    }),
    createJob: builder.mutation({
      query: ({body}) => ({
        method: 'POST',
        body: body
      })
    }),
    modifyJob: builder.mutation({
      query: ({ body, id }) => ({
        url: `${id}`,
        method: 'PATCH',
        body: body
      })
    }),
    deleteJob: builder.mutation({
      query: ({ id }) => ({
        url: `${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const { useGetJobsQuery, useGetJobQuery, useCreateJobMutation, useModifyJobMutation, useDeleteJobMutation } = jobsApi;