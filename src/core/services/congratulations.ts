import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {LoginResponse} from "../global-types"
import {CongratulationsResponse} from "../models/CongratulationsResponse"

export const congratulationsApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://birthdayappremainder.herokuapp.com/congratulations',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("access_token")
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },}),

    endpoints: (builder) => ({
        getCongratulations: builder.query<CongratulationsResponse, void>({
            query: () => "/",
        })
    }),
})

// Export hooks for usage in functional components
export const { useGetCongratulationsQuery } = congratulationsApi