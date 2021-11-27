import {store} from "../store/store"

export type RegistrationFormInputs = {
    email: string
    password: string
    repeat: string
}

export type LoginFormInputs = {
    email: string
    password: string
    rememberMe: boolean | undefined
}

export type CongratulationItem = {
    bday_name: string
    alert_datetime: Date
    notify_by_email: boolean | undefined
    comment: string | undefined
}

export type ChangePasswordFormInputs = {
    password: string
    repeat: string
}

export type SupportFormInputs = {
    name: string
    email: string
    comment: string
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AuthStatus = "none" | "public" | "private"