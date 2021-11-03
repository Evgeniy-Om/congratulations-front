import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const emptySplitApi = createApi({
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://birthdayappremainder.herokuapp.com/',
        baseUrl: 'http://23.88.98.9:8010/'
    }),
    tagTypes: ["Access", "Congratulations", 'Refresh'],
    endpoints: () => ({}),
})