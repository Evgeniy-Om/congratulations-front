import React from 'react'
import {Button as MUIButton} from "@mui/material"
import Link from "../components/Link"

function ConfirmEmail() {
    return (
        <>
            <div>Вам на почту отправлено письмо с ссылкой для подтверждения регистрации. Не получили письмо? Проверьте папку "Спам</div>
            <Link to="/login">
                <MUIButton
                    variant="outlined"
                    >
                    Войти в приложение
                </MUIButton>
            </Link>
        </>
    )
}

export default ConfirmEmail