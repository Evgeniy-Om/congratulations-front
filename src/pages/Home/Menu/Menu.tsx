import {
    IconButton,
    Popover as MUIPopover,
    styled,
} from "@mui/material"
import { useState } from "react"
import MUIMenuIcon from '@mui/icons-material/Menu';
import LogoutLink from "./LogoutLink"
import AccountLink from "./AccountLink"
import SupportLink from "./SupportLink";

function Menu() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
        <>
            <_.MenuButton onClick={handleClick}>
                <_.MenuIcon aria-describedby={id}/>
            </_.MenuButton>
            <MUIPopover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <_.Modal>
                    <AccountLink/>
                    <SupportLink/>
                    <LogoutLink/>
                </_.Modal>

            </MUIPopover>
        </>
    );
}

export default Menu

const _ = {
    MenuButton: styled(IconButton)({
        position: "absolute",
        right: 0,
        top: 12,
        // ":hover": {
        //     backgroundColor: "transparent",
        // },
        // ":hover svg": {
        //     // color: "#000",
        //     boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        // }
    }),
    MenuIcon: styled(MUIMenuIcon)(({theme}) => ({
        fontSize: "35px",
        color: theme.palette.primary.light,

    })),
    Modal: styled("div")({
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
        padding: 20
    }),
}