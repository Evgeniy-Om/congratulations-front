import { emptySplitApi } from "../api"
import { LoginRequest } from "../types/RequestTypes"
import { LoginResponse, RefreshResponse } from "../types/ResponseTypes"

function getRefreshToken() {
    const token = localStorage.getItem("refresh_token")
    if (token) {
        return {refresh: `${token}`}
    }
    return {}
}

export const authApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'auth/login/',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Access'],
            // transformResponse: (response: { data: LoginResponse }) => response.data,
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
