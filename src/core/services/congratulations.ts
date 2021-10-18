import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {CongratulationsResponse} from "../models/CongratulationsResponse"
import {emptySplitApi} from "../store/store"

function getAuthorizationHeader () {
    const token = localStorage.getItem("access_token")
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
            }),
        })
    }),
})

export const { useGetCongratulationsQuery } = congratulationsApi