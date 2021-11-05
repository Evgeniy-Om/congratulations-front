import {useEffect} from "react"
import {useUpdateAccessTokenMutation} from "./core/api/services/auth"
import PrivateRoutes from "./core/routes/PrivateRoutes"
import PublicRoutes from "./core/routes/PublicRoutes"
import PaperContainer from "./components/PaperContainer"
import CircularProgress from "@mui/material/CircularProgress"
import isActiveAccessToken from "./core/features/isActiveAccessToken"
import {useAppDispatch, useAppSelector} from "./core/hooks"
import {changeAuthStatus} from "./core/store/congratulationsSlice"
import {BrowserRouter as Router, Switch} from "react-router-dom"


export default function App() {
    // const [skip, setSkip] = useState(false)
    // const {isError, isSuccess, refetch} = useGetCongratulationsQuery(null, {skip})
    const {authStatus} = useAppSelector((state) => state.congratulations)
    const dispatch = useAppDispatch()
    const [refresh] = useUpdateAccessTokenMutation()

    // useEffect(() => {
    //     if (isError) {
    //         if (localStorage.getItem("refresh_token")) {
    //             refresh()
    //                 .unwrap()
    //                 .then((payload) => {
    //                     localStorage.setItem("access_token", payload.access)
    //                     refetch()
    //                     setAuth(true)
    //                 })
    //                 .catch((error) => {
    //                     console.error('rejected3', error)
    //                     setAuth(false)
    //                 })
    //         } else {
    //             setAuth(false)
    //         }
    //     } else {
    //         setAuth(true)
    //     }
    // }, [isError])

    useEffect(() => {
        if (isActiveAccessToken()) {
            dispatch(changeAuthStatus("private"))
        } else {
            if (localStorage.getItem("refresh_token")) {
                refresh()
                    .unwrap()
                    .then((payload) => {
                        localStorage.setItem("access_token", payload.access)
                        localStorage.setItem("exp_access", `${payload.access_live}UTC`)
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
    }, [])

    return (
        <PaperContainer>
            {authStatus === "none" && <CircularProgress/>}
            <Router>
                <Switch>
                    {authStatus === "public" && <PublicRoutes/>}
                    {authStatus === "private" && <PrivateRoutes/>}
                </Switch>
            </Router>

        </PaperContainer>
    )

}
