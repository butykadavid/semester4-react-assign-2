import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const jobsApi = createApi({
    reducerPath: "jobsApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3030/jobs/"}),
    endpoints: (builder) => ({
        getJobs: builder.query({
            query: () => ""
        })
    })
})

export const { useGetJobsQuery } = jobsApi;