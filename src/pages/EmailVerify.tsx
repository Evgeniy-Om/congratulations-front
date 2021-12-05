import React, {useEffect} from 'react'
import {Button as MUIButton, styled} from '@mui/material'
import Link from '../components/Link'
import {changeEmailVerifyStatus} from '../core/store/congratulationsSlice'
import {useAppDispatch} from '../core/hooks'
import {authApi, useRepeatEmailVerifyMutation} from '../core/api/services/authService'

function EmailVerify({privatePage}: { privatePage: boolean }) {
    const search = window.location.search
    const {isSuccess, isError} = authApi.useEmailVerifyQuery(search)
    const [repeatEmailVerify] = useRepeatEmailVerifyMutation()

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isSuccess) {
            dispatch(changeEmailVerifyStatus(true))
        }
    }, [isSuccess])
    return (
        <_.Wrapper>
            {isError &&
            <>
                <div>Истёк срок жизни ссылки. Попробуйте снова</div>
                <MUIButton
                    variant="outlined"
                    onClick={() => {
                        const email = sessionStorage.getItem('email') ?? localStorage.getItem('email')
                        if (email) {
                            repeatEmailVerify({email})
                        }

                    }}
                >
                    Отправить письмо повторно
                </MUIButton>
            </>
            }
            {isSuccess && <div>Емейл подтверждён!</div>}
            {privatePage
                ?
                <Link to="/">
                    <MUIButton
                        variant="outlined"
                    >
                        На главную
                    </MUIButton>
                </Link>
                :
                <Link to="/login">
                    <MUIButton
                        variant="outlined"
                    >
                        Войти в приложение
                    </MUIButton>
                </Link>
            }

        </_.Wrapper>
    )
}

export default EmailVerify

const _ = {
    Wrapper: styled('div')({
        maxWidth: 500,
        margin: '0 20px',
    }),
}