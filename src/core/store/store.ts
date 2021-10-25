import {configureStore} from '@reduxjs/toolkit'
import { emptySplitApi } from '../api/api'
 import congratulationsReducer from './congratulationsSlice'


export const store = configureStore({
    reducer: {
        congratulations: congratulationsReducer,
        [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(emptySplitApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch