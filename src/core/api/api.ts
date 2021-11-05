import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import {BASE_URL} from "../constants"

export const emptySplitApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    tagTypes: ["Access", "Congratulations", 'Refresh'],
    endpoints: () => ({}),
})