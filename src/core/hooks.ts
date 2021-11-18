import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {store} from "./store/store"
import {useDeleteCongratulationMutation} from "./api/services/congratulationsService"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export function useDeleteCongratulationsList () {
    const [deleteCongratulation] = useDeleteCongratulationMutation()
    return (idList: number[]) => idList.forEach(item => deleteCongratulation(item))
}

//Types
// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch