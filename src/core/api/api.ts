import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const emptySplitApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://birthdayappremainder.herokuapp.com/',
    }),
    tagTypes: ["Access", "Congratulations", 'Refresh'],
    endpoints: () => ({}),
})