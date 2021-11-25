import React from 'react'
import {Button as MUIButton, styled} from "@mui/material"
import Link from "../components/Link"

function EmailVerify() {
    return (
        <_.Wrapper>
            <div>Емейл подтверждён!</div>
            <Link to="/login">
                <MUIButton
                    variant="outlined"
                >
                    Войти в приложение
                </MUIButton>
            </Link>
        </_.Wrapper>
    )
}

export default EmailVerify

const _ = {
    Wrapper: styled("div")({
        maxWidth: 500,
        margin: "0 20px"
    })
}