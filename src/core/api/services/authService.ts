import getRefreshToken from "../../features/getRefreshToken"
import { emptySplitApi } from "../api"
import type { LoginRequest, RegistrationRequest } from "../../types/requestApiTypes"
import type { LoginResponse, RefreshResponse, RegistrationResponse } from "../../types/responseApiTypes"

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
        registration: builder.mutation<RegistrationResponse, RegistrationRequest>({
            query: (credentials) => ({
                url: 'auth/register/',
                method: 'POST',
                body: credentials,
            }),
        }),
        updateAccessToken: builder.mutation<RefreshResponse, void>({
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

export const { useLoginMutation, useRegistrationMutation, useUpdateAccessTokenMutation } = authApi
