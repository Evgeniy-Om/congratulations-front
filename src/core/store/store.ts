import {configureStore} from '@reduxjs/toolkit'
import { emptySplitApi } from '../api/api'
import birthdayReducer from './birthdaySlice'


export const store = configureStore({
    reducer: {
        birthdays: birthdayReducer,
        [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(emptySplitApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch