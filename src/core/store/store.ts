import { configureStore } from '@reduxjs/toolkit'
import birthdayReducer from './birthdaySlice'
// ...

export const store = configureStore({
    reducer: {
         birthdays: birthdayReducer,
        // comments: commentsReducer,
        // users: usersReducer,
    },
})