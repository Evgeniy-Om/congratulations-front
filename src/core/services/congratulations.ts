import {CongratulationsResponse} from "../models/CongratulationsResponse"
import {emptySplitApi} from "../store/store"

function getAuthorizationHeader() {
    const token = sessionStorage.getItem("access_token") ?? localStorage.getItem("access_token")
    if (token) {
        return {Authorization: `Bearer ${token}`}
    }
    return {}
}

export const congratulationsApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getCongratulations: builder.query<CongratulationsResponse[], void>({
            query: () => ({
                url: "congratulations/",
                headers: getAuthorizationHeader(),
                keepUnusedDataFor: 300,
            }),
            // providesTags: (result, error, arg) =>
            //     result?.results
            //         ? [...result.results.map(({id}) => ({type: 'Congratulations' as const, id})), 'Congratulations']
            //         : ['Post'],
            // // transformResponse: (response: { data: CongratulationsResponse }) => response.data.results,
            providesTags: ['Congratulations']
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

export const {useGetCongratulationsQuery, useDeleteCongratulationMutation} = congratulationsApi