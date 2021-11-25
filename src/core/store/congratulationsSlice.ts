import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AuthStatus} from "../types/globalTypes"

const initialState: InitialState = {
    authStatus: "none",
    rememberMe: true,
    isEmailVerify: false
}

export const congratulationsSlice = createSlice({
    name: 'congratulations',
    initialState,
    reducers: {
        changeAuthStatus: (state, action: PayloadAction<AuthStatus>) => {
            state.authStatus = action.payload
        },
        checkRememberMe: (state, action: PayloadAction<boolean>) => {
            state.rememberMe = action.payload
        },
        changeEmailVerifyStatus: (state, action: PayloadAction<boolean>) => {
            state.isEmailVerify = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {changeAuthStatus, checkRememberMe, changeEmailVerifyStatus} = congratulationsSlice.actions

export default congratulationsSlice.reducer

//Types
type InitialState = {
    authStatus: AuthStatus
    rememberMe: boolean
    isEmailVerify: boolean
}