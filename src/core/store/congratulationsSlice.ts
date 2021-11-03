import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AuthStatus} from "../types/globalTypes"

const initialState: InitialState = {
    authStatus: "none",
    rememberMe: true
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
    },
})

// Action creators are generated for each case reducer function
export const {changeAuthStatus, checkRememberMe} = congratulationsSlice.actions

export default congratulationsSlice.reducer

//Types
type InitialState = {
    authStatus: AuthStatus
    rememberMe: boolean
}