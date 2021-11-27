import React from 'react'
import {Button as MUIButton, styled} from "@mui/material"
import Link from "../components/Link"

function ConfirmEmail() {
    return (
        <_.Wrapper>
            <div>Вам на почту отправлено письмо с ссылкой для подтверждения регистрации. Не получили письмо? Проверьте папку "Спам"</div>
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

export default ConfirmEmail

const _ = {
    Wrapper: styled("div")({
        maxWidth: 500,
        margin: "0 20px"
    })
}