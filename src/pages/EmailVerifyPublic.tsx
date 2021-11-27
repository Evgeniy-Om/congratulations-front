import React, {useEffect} from 'react'
import {Button as MUIButton, styled} from "@mui/material"
import Link from "../components/Link"
import {changeEmailVerifyStatus} from "../core/store/congratulationsSlice"
import {useAppDispatch} from "../core/hooks"

function EmailVerifyPublic() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(changeEmailVerifyStatus(true))
    },[])
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

export default EmailVerifyPublic

const _ = {
    Wrapper: styled("div")({
        maxWidth: 500,
        margin: "0 20px"
    })
}