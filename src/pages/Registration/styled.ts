import {styled} from "@mui/material"
import {Link} from "react-router-dom"

export const Wrapper = styled("div")({
    textAlign: "center",
})
export const Inner = styled("div")({
    display: "flex",
    flexDirection: "column",
})

export const RegistrationLink = styled(Link)(({theme}) => ({
    margin: "15px 0",
    color: theme.palette.text.primary,
}))

export const AgreementLinkContainer = styled("div")({
    marginTop: "20px",
})

export const AgreementLink = styled(Link)(({theme}) => ({
    color: theme.palette.text.primary,
}))