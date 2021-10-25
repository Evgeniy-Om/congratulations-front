import getRefreshToken from "../../features/getRefreshToken"
import { emptySplitApi } from "../api"
import type { LoginRequest } from "../types/RequestTypes"
import type { LoginResponse, RefreshResponse } from "../types/ResponseTypes"

export const authApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'auth/login/',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Access'],
        }),
        refreshAccessToken: builder.mutation<RefreshResponse, void>({
            query: () => ({
                url: 'auth/token/refresh/',
                method: 'POST',
                body: getRefreshToken()
                // credentials: "include"
            }),
            // invalidatesTags: ['Refresh'],
        }),
    }),
})

export const { useLoginMutation, useRefreshAccessTokenMutation } = authApi
