import { configureStore } from "@reduxjs/toolkit"
import { jobsApi } from "./jobsApi"
import { usersApi } from "./usersApi"
import { userSlice } from "./userSlice"
import { experiencesApi } from "./experiencesApi"

export const store = configureStore({
    reducer: {
        [jobsApi.reducerPath]: jobsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [experiencesApi.reducerPath]: experiencesApi.reducer,
        [userSlice.name]: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jobsApi.middleware).concat(usersApi.middleware).concat(experiencesApi.middleware)
})