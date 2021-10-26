import React from 'react'
import {Button as MUIButton} from "@mui/material"
import ReactRouterDomLink from "../components/ReactRouterDomLink"

function ConfirmEmail() {
    return (
        <>
            <div>Вам на почту отправлен письмо с сылкой на подтверждение емейла</div>
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