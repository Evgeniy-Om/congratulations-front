import {
    IconButton,
    Popover as MUIPopover,
    styled,
} from "@mui/material"
import { useState } from "react"
import MUIMenuIcon from '@mui/icons-material/Menu';
import LogoutLink from "./LogoutLink"
import AccountLink from "./AccountLink"

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
            {/*<MUIButton aria-describedby={id} variant="contained" onClick={handleClick}>*/}
            {/*    Open Popover*/}
            {/*</MUIButton>*/}
            <_.MenuIconWrapper>
                <_.MenuIcon aria-describedby={id} onClick={handleClick}/>
            </_.MenuIconWrapper>
            <_.Popover
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
                    <LogoutLink/>
                </_.Modal>

            </_.Popover>
        </>
    );
}

export default Menu

const _ = {
    MenuIconWrapper: styled(IconButton)({
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
        // position: "relative",
        // top: 8,
        fontSize: "35px",
        color: theme.palette.primary.light,

    })),
    Popover: styled(MUIPopover)({
        // position: "absolute",
        // right: 0,
        // top: 0,
    }),
    Modal: styled("div")({
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
        // width: 300,
        // height: 100,
        padding: 20
    }),
}