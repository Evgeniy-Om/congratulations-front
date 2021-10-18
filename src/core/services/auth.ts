import {LoginRequest, LoginResponse} from "../global-types"
import { emptySplitApi } from '../store/store'

export const authApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'auth/login/',
                method: 'POST',
                body: credentials,
            }),
            // transformResponse: (response: { data: LoginResponse }) => response.data,
        }),
    }),
})

export const { useLoginMutation } = authApi
