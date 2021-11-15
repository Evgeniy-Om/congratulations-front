import {Button as MUIButton} from "@mui/material"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import Link from "./Link"

function BackButton() {
    return (
        <Link to="/">
            <MUIButton variant="outlined" component="span" startIcon={<ArrowBackIosIcon/>}>
                Назад
            </MUIButton>
        </Link>
    )
}

export default BackButton;