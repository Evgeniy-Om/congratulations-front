import {configureStore} from '@reduxjs/toolkit'
import birthdayReducer from './birthdaySlice'
import {authApi} from "../services/auth"
import {congratulationsApi} from "../services/congratulations"

export const store = configureStore({
    reducer: {
        birthdays: birthdayReducer,
        [authApi.reducerPath]: authApi.reducer,
        [congratulationsApi.reducerPath]: congratulationsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([ congratulationsApi.middleware]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch