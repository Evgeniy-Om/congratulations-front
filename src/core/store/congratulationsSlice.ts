import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: InitialState = {
    authStatus: "none"
}

export const congratulationsSlice = createSlice({
    name: 'congratulations',
    initialState,
    reducers: {
        changeAuthStatus: (state, action: PayloadAction<"none" | "public" | "private">) => {
            state.authStatus = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {changeAuthStatus} = congratulationsSlice.actions

export default congratulationsSlice.reducer

//Types
type InitialState = {
    authStatus: "none" | "public" | "private"
}