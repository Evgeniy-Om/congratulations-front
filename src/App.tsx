import PaperContainer from "./components/PaperContainer"
import {useGetCongratulationsQuery} from "./core/api/services/congratulations"
import {useEffect, useState} from "react"
import {useRefreshAccessTokenMutation} from "./core/api/services/auth"
import Routes from "./core/routes/Routes"


export default function App() {
    const {isError, isSuccess, refetch} = useGetCongratulationsQuery()
    const [auth, setAuth] = useState(false)
    const [refresh] = useRefreshAccessTokenMutation()

    useEffect(() => {
        if (isError) {
            if (localStorage.getItem("refresh_token")) {
                refresh()
                    .unwrap()
                    .then((payload) => {
                        localStorage.setItem("access_token", payload.access)
                        refetch()
                        setAuth(true)
                    })
                    .catch((error) => {
                        console.error('rejected3', error)
                        setAuth(false)
                    })
            } else {
                setAuth(false)
            }
        } else {
            setAuth(true)
        }
    }, [isError])
    return (
        <PaperContainer>
            <Routes auth={auth}/>
        </PaperContainer>
    )
}
