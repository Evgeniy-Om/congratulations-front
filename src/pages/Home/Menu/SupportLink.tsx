import {Button as MUIButton} from "@mui/material"
import MUIHelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Link from "../../../components/Link"

function SupportLink() {
    return (
        <Link to="/support">
            <MUIButton
                // variant="outlined"
                endIcon={<MUIHelpOutlineIcon/>}
                >
                Поддержка
            </MUIButton>
        </Link>
    );
}

export default SupportLink;