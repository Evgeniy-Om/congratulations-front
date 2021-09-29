import {store} from "../store/store"

export type LoginFormInputsTypes = {
    email: string
    password: string
    rememberMe: boolean | undefined
}

export type ReactHookFormTextFieldTypes = {
    name: string
    type: string
    label: string
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch