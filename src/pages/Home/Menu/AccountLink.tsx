import {Button as MUIButton} from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Link from "../../../components/Link"

function AccountLink() {
    return (
        <Link to="/account">
            <MUIButton
                endIcon={<AccountCircleIcon/>}
            >
                Настройки
            </MUIButton>
        </Link>
    )
}

export default AccountLink