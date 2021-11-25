import getRefreshToken from "../../features/getRefreshToken"
import {emptySplitApi} from "../api"
import type {LoginRequest, RegistrationRequest} from "../../types/requestApiTypes"
import type {LoginResponse, RefreshResponse, RegistrationResponse} from "../../types/responseApiTypes"
import {LogoutResponse} from "../../types/responseApiTypes"
import getAccessToken from "../../features/getAccessToken"
import {
    ResetPasswordCompleteRequest,
    ResetPasswordEmailRequest,
    SupportEmailRequest,
} from "../../types/requestApiTypes"

export const authApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'auth/login/',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Access'],
        }),
        registration: builder.mutation<RegistrationResponse, RegistrationRequest>({
            query: (credentials) => ({
                url: 'auth/register/',
                method: 'POST',
                body: credentials,
            }),
        }),
        updateAccessToken: builder.mutation<RefreshResponse, void>({
            query: () => ({
                url: 'auth/token/refresh/',
                method: 'POST',
                body: getRefreshToken(),
                // credentials: "include"
            }),
            invalidatesTags: ['Refresh'],
        }),
        logout: builder.mutation<LogoutResponse, void>({
            query: () => ({
                url: 'auth/logout/',
                method: 'POST',
                headers: getAccessToken(),
                body: getRefreshToken(),
                // credentials: "include"
            }),
        }),
        passwordResetEmail: builder.mutation<void, ResetPasswordEmailRequest>({
            query: (credentials) => ({
                url: 'auth/password-reset-email/',
                method: 'POST',
                body: credentials,
            }),
        }),
        passwordResetComplete: builder.mutation<void, ResetPasswordCompleteRequest>({
            query: (credentials) => ({
                url: 'auth/password-reset-email/',
                method: 'PATCH',
                body: credentials,
            }),
        }),
        supportEmail: builder.mutation<void, SupportEmailRequest>({
            query: (credentials) => ({
                url: 'auth/support-email',
                method: 'POST',
                body: credentials,
            }),
        }),
        repeatEmailVerify: builder.mutation<void, { email: string }>({
            query: (credentials) => ({
                url: 'auth/repeat-email-verify/',
                method: 'POST',
                body: credentials,
            }),
        }),
        isEmailVerify: builder.mutation<{ email: "Email is verified" | "Email not verified" }, { email: string }>({
            query: (credentials) => ({
                url: 'auth/is-email-verify',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
})

export const {
    useLoginMutation,
    useRegistrationMutation,
    useUpdateAccessTokenMutation,
    useLogoutMutation,
    usePasswordResetEmailMutation,
    usePasswordResetCompleteMutation,
    useSupportEmailMutation,
    useRepeatEmailVerifyMutation,
    useIsEmailVerifyMutation,
} = authApi
