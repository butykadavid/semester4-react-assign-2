import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030/jobs/" }),
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (filters = {}) => {
        const {
          company,
          minSalary,
          maxSalary,
          type,
          loc,
          isRemote
        } = filters;

        const params = new URLSearchParams();

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
  })
})

export const { useGetJobsQuery, useGetJobQuery } = jobsApi;