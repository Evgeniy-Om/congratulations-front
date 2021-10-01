import {store} from "../store/store"

export type LoginFormInputsTypes = {
    email: string
    password: string
    rememberMe: boolean | undefined
}

export type RegistrationFormInputsTypes = {
    email: string
    password: string
    repeat: string
}

export type ReactHookFormTextFieldTypes = {
    name: string
    type: string
    label: string
}

export type BirthdayStateType = {
    list: {
        _id: number,
        name: string
        date: number | null
    }[]
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch