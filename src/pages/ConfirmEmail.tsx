import React from 'react'
import {Button as MUIButton} from "@mui/material"
import Link_ReactRouterDom from "../components/Link_ReactRouterDom"

function ConfirmEmail() {
    return (
        <>
            <div>Вам на почту отправлено письмо с ссылкой для подтверждения регистрации. Не получили письмо? Проверьте папку "Спам</div>
            <Link_ReactRouterDom to="/login">
                <MUIButton
                    variant="outlined"
                    >
                    Войти в приложение
                </MUIButton>
            </Link_ReactRouterDom>
        </>
    )
}

export default ConfirmEmail