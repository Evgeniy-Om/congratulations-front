import {Button as MUIButton, Button, styled} from "@mui/material"
import BackButton from "../components/BackButton"
import {RegistrationFormInputs} from "../core/types/globalTypes"
import {FormProvider, useForm} from "react-hook-form"
import TextField from "../components/TextField"
import {Link} from "react-router-dom"
import {
    usePasswordChangeMutation,
    useRepeatEmailVerifyMutation,
} from "../core/api/services/authService"
import {yupResolver} from "@hookform/resolvers/yup"
import {ChangePasswordValidationSchema} from "../core/yupValidastionSchemes"
import {useAppDispatch, useAppSelector, useIsEmailVerify} from "../core/hooks"
import {changeAuthStatus} from "../core/store/congratulationsSlice"

function Account() {
    const [passwordChange] = usePasswordChangeMutation()
    const [repeatEmailVerify] = useRepeatEmailVerifyMutation()
    const {isEmailVerify} = useAppSelector((state) => state.congratulations)
    const dispatch = useAppDispatch()
    const accessToken = sessionStorage.getItem("access_token") ?? localStorage.getItem("access_token")

    useIsEmailVerify()

    const methods = useForm<RegistrationFormInputs>({
        mode: "onTouched",
        resolver: yupResolver(ChangePasswordValidationSchema),
    })

    const onSubmit = (data: { password: string, repeat: string }) => {
        if (accessToken) {
            passwordChange({password: data.password, access_token: accessToken})
                .unwrap()
                .then(() => {
                    dispatch(changeAuthStatus("public"))
                })
                .catch((error) => {
                    console.error('rejected', error)
                })
        }
    }
    return (
        <div>
            <BackButton/>

            <_.Wrapper>
                {
                    !isEmailVerify &&
                    <>
                        <h4>Для доступа к кабинету подтвердите емейл</h4>
                        <MUIButton
                            variant="contained"
                            onClick={() => {
                                const email = sessionStorage.getItem("email") ?? localStorage.getItem("email")
                                if (email) {
                                    repeatEmailVerify({email})
                                }

                            }}
                        >
                            Отправить письмо повторно
                        </MUIButton>
                    </>
                }
                {
                    isEmailVerify && <FormProvider {...methods} >
                        <h4>Смена пароля</h4>
                        <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                            <_.Inner>
                                <TextField name="password" type="password" label="Пароль" required/>
                                <TextField name="repeat" type="password" label="Повторите пароль" required/>
                                <Button type="submit" variant="contained">Изменить пароль</Button>
                            </_.Inner>
                        </form>
                    </FormProvider>
                }
                <_.Links>
                    <Link to="/support">
                        Связаться с поддержкой
                    </Link>


                    <Link to="/agreement">
                        Пользовательское соглашение
                    </Link>
                </_.Links>
            </_.Wrapper>
        </div>
    )
}

// _ Components
const _ = {
    Wrapper: styled("div")({
        textAlign: "center",
    }),
    Inner: styled("div")({
        display: "flex",
        flexDirection: "column",
    }),
    RegistrationLink: styled(Link)(({theme}) => ({
        margin: "15px 0",
        color: theme.palette.text.primary,
    })),
    AgreementLinkContainer: styled("div")({
        marginTop: "20px",
    }),
    Links: styled("div")(({theme}) => ({
        display: "flex",
        justifyContent: "space-around",
        height: 80,
        flexDirection: "column",
        "& > a": {
            color: theme.palette.text.primary,
        },
    })),
    Error: styled('div')(({theme}) => ({
        marginBottom: "20px",
        color: theme.palette.error.main,
    })),
}

export default Account
