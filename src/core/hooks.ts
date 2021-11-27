import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {useDeleteCongratulationMutation} from "./api/services/congratulationsService"
import { AppDispatch, RootState } from './types/globalTypes'
import {useIsEmailVerifyMutation} from "./api/services/authService"
import {useEffect} from "react"
import {changeAuthStatus, changeEmailVerifyStatus} from "./store/congratulationsSlice"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export function useDeleteCongratulationsList () {
    const [deleteCongratulation] = useDeleteCongratulationMutation()
    return (idList: number[]) => idList.forEach(item => deleteCongratulation(item))
}

export function useIsEmailVerify () {
    const [emailVerify] = useIsEmailVerifyMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        const email = sessionStorage.getItem("email") ?? localStorage.getItem("email")
        console.log(email)
        if (email) {
            emailVerify({email})
                .unwrap()
                .then((payload) => {
                    if (payload.email === "Email is verified") {
                        dispatch(changeEmailVerifyStatus(true))
                    }
                    if (payload.email === "Email not verified") {
                        dispatch(changeEmailVerifyStatus(false))
                    }
                })
                .catch((error) => {
                    console.error('rejected3', error)
                    dispatch(changeAuthStatus("public"))
                })
        } else {
            dispatch(changeAuthStatus("public"))
        }
    },[])
}

