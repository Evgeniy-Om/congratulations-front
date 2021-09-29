import {FormControlLabel, styled, TextField} from "@mui/material"
import {Link} from "react-router-dom"

export const Wrapper = styled("div")({
    textAlign: "center",
})
export const FormInner = styled("div")({
    display: "flex",
    flexDirection: "column",
})

export const Label = styled(FormControlLabel)({
    margin: "0 auto 10px",
})
export const ErrorLoginOrPassword = styled('div')(({theme}) => ({
    marginBottom: "20px",
    color: theme.palette.error.main,
}))
export const RegistrationLink = styled(Link)(({theme}) => ({
    margin: "15px 0",
    color: theme.palette.text.primary,
}))