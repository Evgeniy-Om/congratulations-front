import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {LoginRequest, LoginResponse} from "../global-types"


export const authApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://birthdayappremainder.herokuapp.com/auth',
        }),

    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/login/',
                method: 'POST',
                body: credentials,
            }),
            // transformResponse: (response: { data: LoginResponse }) => response.data,
        }),
    }),
})

// Export hooks for usage in functional components
export const { useLoginMutation } = authApi
