import {configureStore} from '@reduxjs/toolkit'
import birthdayReducer from './birthdaySlice'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const emptySplitApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://birthdayappremainder.herokuapp.com/',
    }),
    // tagTypes: ["Access"],
    endpoints: () => ({}),
})

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