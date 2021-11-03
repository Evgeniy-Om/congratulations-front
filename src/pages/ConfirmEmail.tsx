import React from 'react'
import {Button as MUIButton} from "@mui/material"
import ReactRouterDomLink from "../components/ReactRouterDomLink"

function ConfirmEmail() {
    return (
        <>
            <div>Вам на почту отправлено письмо со ссылкой на подтверждение емейла</div>
            <ReactRouterDomLink to="/login">
                <MUIButton
                    variant="outlined"
                    >
                    Войти в приложение
                </MUIButton>
            </ReactRouterDomLink>
        </>
    )
}

export default ConfirmEmail