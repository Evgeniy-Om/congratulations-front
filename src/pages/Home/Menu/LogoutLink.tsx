import {Button as MUIButton} from "@mui/material"
import MUIExitToAppIcon from '@mui/icons-material/ExitToApp'
import clearStorages from "../../../core/features/clearStorages"
import {changeAuthStatus} from "../../../core/store/congratulationsSlice"
import Link from "../../../components/Link"
import {useLogoutMutation} from "../../../core/api/services/authService"
import {useAppDispatch} from "../../../core/hooks"

function LogoutLink() {
    const [logout] = useLogoutMutation()
    const dispatch = useAppDispatch()

    return (
        <Link to="/login">
            <MUIButton
                // variant="outlined"
                endIcon={<MUIExitToAppIcon/>}
                onClick={() => {
                    logout()
                        .unwrap()
                        .then((payload) => {
                            console.log(payload)
                        })
                        .catch((error) => {
                            console.error('rejected3', error)
                        })
                    clearStorages()
                    dispatch(changeAuthStatus("public"))
                }}>
                Выйти
            </MUIButton>
        </Link>
    );
}

export default LogoutLink;