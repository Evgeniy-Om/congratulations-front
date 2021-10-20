import {CongratulationsResponse} from "../models/CongratulationsResponse"
import {emptySplitApi} from "../store/store"


function getAccessToken() {
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
                headers: getAccessToken(),
                keepUnusedDataFor: 300,
            }),
            // providesTags: (result, error, arg) =>
            //     result?.results
            //         ? [...result.results.map(({id}) => ({type: 'Congratulations' as const, id})), 'Congratulations']
            //         : ['Post'],
            // // transformResponse: (response: { data: CongratulationsResponse }) => response.data.results,
            providesTags: ['Congratulations', 'Refresh']
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

export const {useGetCongratulationsQuery, useDeleteCongratulationMutation} = congratulationsApi