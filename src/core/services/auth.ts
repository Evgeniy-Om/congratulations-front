import {LoginRequest, LoginResponse} from "../global-types"
import { emptySplitApi } from '../store/store'

export const authApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'auth/login/',
                method: 'POST',
                body: credentials,
            }),
            // invalidatesTags: ['Access'],
            // transformResponse: (response: { data: LoginResponse }) => response.data,
        }),
        refreshAccessToken: builder.mutation({
            query: () => ({
                url: 'auth/token/refresh/',
                method: 'POST',
                credentials: "include"
            }),
            // invalidatesTags: ['Access'],
        }),
    }),
})

export const { useLoginMutation, useRefreshAccessTokenMutation } = authApi
