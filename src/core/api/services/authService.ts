import getRefreshToken from '../../features/getRefreshToken'
import {emptySplitApi} from '../api'
import type {LoginRequest, RegistrationRequest} from '../../types/requestApiTypes'
import {SupportEmailRequest} from '../../types/requestApiTypes'
import type {LoginResponse, RefreshResponse, RegistrationResponse} from '../../types/responseApiTypes'
import {LogoutResponse} from '../../types/responseApiTypes'
import getAccessToken from '../../features/getAccessToken'

export const authApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (data) => ({
                url: 'auth/login/',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Access'],
        }),
        registration: builder.mutation<RegistrationResponse, RegistrationRequest>({
            query: (data) => ({
                url: 'auth/register/',
                method: 'POST',
                body: data,
            }),
        }),
        updateAccessToken: builder.mutation<RefreshResponse, void>({
            query: () => ({
                url: 'auth/token/refresh/',
                method: 'POST',
                body: getRefreshToken(),
                // data: "include"
            }),
            invalidatesTags: ['Refresh'],
        }),
        logout: builder.mutation<LogoutResponse, void>({
            query: () => ({
                url: 'auth/logout/',
                method: 'POST',
                headers: getAccessToken(),
                body: getRefreshToken(),
                // data: "include"
            }),
        }),
        passwordChange: builder.mutation<void, { password: string, access_token: string }>({
            query: (data) => ({
                url: 'auth/password-change/',
                method: 'PATCH',
                headers: getAccessToken(),
                body: data,
            }),
        }),
        supportEmail: builder.mutation<void, SupportEmailRequest>({
            query: (data) => ({
                url: 'auth/support-email/',
                method: 'POST',
                body: data,
            }),
        }),
        emailVerify: builder.query<void, string>({
            query: (search) => ({
                url: `auth/email-verify/${search}`,
            }),
        }),
        repeatEmailVerify: builder.mutation<void, { email: string }>({
            query: (data) => ({
                url: 'auth/repeat-email-verify/',
                method: 'POST',
                body: data,
            }),
        }),
        isEmailVerify: builder.mutation<{ email: 'Email is verified' | 'Email not verified' }, { email: string }>({
            query: (data) => ({
                url: 'auth/is-email-verify',
                method: 'POST',
                body: data,
            }),
        }),
        passwordResetEmail: builder.mutation<void, { email: string }>({
            query: (data) => ({
                url: 'auth/password-reset-email/',
                method: 'POST',
                body: data,
            }),
        }),
        passwordResetComplete: builder.mutation<void, { password: string, token: string, uidb64: string }>({
            query: (data) => ({
                url: 'auth/password-reset-complete/',
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
})

export const {
    useLoginMutation,
    useRegistrationMutation,
    useUpdateAccessTokenMutation,
    useLogoutMutation,
    usePasswordChangeMutation,
    useSupportEmailMutation,
    useRepeatEmailVerifyMutation,
    useIsEmailVerifyMutation,
    usePasswordResetEmailMutation,
    usePasswordResetCompleteMutation,
} = authApi
