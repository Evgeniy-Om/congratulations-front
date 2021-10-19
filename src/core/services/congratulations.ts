import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {CongratulationItem, CongratulationsResponse} from "../models/CongratulationsResponse"
import {emptySplitApi} from "../store/store"

function getAuthorizationHeader () {
    const token = sessionStorage.getItem("access_token") ?? localStorage.getItem("access_token")
    if (token) {
        return {Authorization: `Bearer ${token}`}
    }
    return {}
}

export const congratulationsApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getCongratulations: builder.query<CongratulationsResponse, void>({
            query: () => ({
                url: "congratulations/",
                headers: getAuthorizationHeader(),
                // providesTags: (result, error, arg) =>
                //     result
                //         ? [...result.map(({ id }) => ({ type: 'Congratulations' as const, id })), 'Congratulations']
                //         : ['Post'],
                keepUnusedDataFor: 300
            }),
            // transformResponse: (response: { data: CongratulationsResponse }) => response.data.results,
        }),
        deleteCongratulation: builder.mutation({
            query: (id: number) => ({
                url: `/congratulations/${id}`,
                method: 'DELETE',
                headers: getAuthorizationHeader(),
            }),
            invalidatesTags: ['Congratulations'],
        }),
    }),
})

export const { useGetCongratulationsQuery, useDeleteCongratulationMutation } = congratulationsApi