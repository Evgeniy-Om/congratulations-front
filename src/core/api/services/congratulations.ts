import {emptySplitApi} from "../api"
import getAccessToken from "../../features/getAccessToken"
import type {getCongratulationsResponse} from "../../types/responseApiTypes"
import type {AddCongratulationRequest} from "../../types/requestApiTypes"

export const congratulationsApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getCongratulations: builder.query<getCongratulationsResponse[], null | void>({
            query: () => ({
                url: "congratulations/",
                headers: getAccessToken(),
                keepUnusedDataFor: 300,
            }),
            providesTags: ['Congratulations', 'Refresh', 'Access'],
        }),

        addCongratulation: builder.mutation<void, AddCongratulationRequest>({
            query: (congratulationItem) => ({
                url: `/congratulations/`,
                method: 'POST',
                headers: getAccessToken(),
                body: congratulationItem,
            }),
            invalidatesTags: ['Congratulations'],
        }),

        deleteCongratulation: builder.mutation({
            query: (id: number) => ({
                url: `/congratulations/${id}`,
                method: 'DELETE',
                headers: getAccessToken(),
            }),
            invalidatesTags: ['Congratulations'],
        }),
    }),
})

export const {
    useGetCongratulationsQuery,
    useAddCongratulationMutation,
    useDeleteCongratulationMutation,
} = congratulationsApi