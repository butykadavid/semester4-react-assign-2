import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "./usersApi";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: null
    },
    reducers: {
        login(state, { payload }) {
            state.user = payload.user
            state.token = payload.accessToken
        },
        logout(state) {
            state.user = null
            state.token = null
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(usersApi.endpoints.loginUser.matchFulfilled, (state, {payload}) => {
            state.user = payload.user
            state.token = payload.accessToken
        })
    }
})

export const { login, logout } = userSlice.actions