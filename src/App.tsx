import {useEffect} from "react"
import {useUpdateAccessTokenMutation} from "./core/api/services/authService"
import PrivateRoutes from "./core/routes/PrivateRoutes"
import PublicRoutes from "./core/routes/PublicRoutes"
import PaperContainer from "./components/PaperContainer"
import CircularProgress from "@mui/material/CircularProgress"
import isActiveAccessToken from "./core/features/isActiveAccessToken"
import {useAppDispatch, useAppSelector} from "./core/hooks"
import {changeAuthStatus} from "./core/store/congratulationsSlice"
import { CHECK_VALID_ACCESS_TOKEN_INTERVAL } from "./core/constants"


export default function App() {
    const {authStatus, rememberMe} = useAppSelector((state) => state.congratulations)
    const dispatch = useAppDispatch()
    const [refresh] = useUpdateAccessTokenMutation()


    useEffect(() => {
        function checkAccessToken () {
            if (isActiveAccessToken()) {
                if (authStatus !== "private") {
                    dispatch(changeAuthStatus("private"))
                }
            } else {
                if (localStorage.getItem("refresh_token")) {
                    refresh()
                        .unwrap()
                        .then((payload) => {
                            if (rememberMe) {
                                localStorage.setItem("access_token", payload.access)
                                localStorage.setItem("exp_access", `${payload.access_live}UTC`)
                            } else {
                                sessionStorage.setItem("access_token", payload.access)
                                sessionStorage.setItem("exp_access", `${payload.access_live}UTC`)
                            }

                            dispatch(changeAuthStatus("private"))
                        })
                        .catch((error) => {
                            console.error('rejected3', error)
                            dispatch(changeAuthStatus("public"))
                        })
                } else {
                    dispatch(changeAuthStatus("public"))
                }
            }
        }
        checkAccessToken()
        const timer = setInterval(checkAccessToken, CHECK_VALID_ACCESS_TOKEN_INTERVAL)
        return function clearTimer () {
            clearInterval(timer)
        }
    }, [])

    return (
        <PaperContainer>
            {authStatus === "none" && <CircularProgress/>}
            {authStatus === "public" && <PublicRoutes/>}
            {authStatus === "private" && <PrivateRoutes/>}

        </PaperContainer>
    )

}
