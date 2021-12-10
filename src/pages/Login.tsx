import {Button as MUIButton, Checkbox as MUICheckbox, FormControlLabel, styled} from "@mui/material"
import {FormProvider, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import SocialButton from "../components/SocialButton"
import TextField from "../components/TextField"
import {loginValidationSchema} from "../core/yupValidastionSchemes"
import type {LoginFormInputs} from "../core/types/globalTypes"
import {useLoginMutation} from "../core/api/services/authService"
import {useAppDispatch} from "../core/hooks"
import {changeAuthStatus} from "../core/store/congratulationsSlice"
import {useState} from "react"
import {EMAIL_DEFAULT, PASSWORD_DEFAULT} from "../core/constants"
import { Link } from "react-router-dom"

export default function Login() {
    const [login, {isError}] = useLoginMutation()
    const [errorMessage, setErrorMessage] = useState("")
    const dispatch = useAppDispatch()
    const methods = useForm<LoginFormInputs>({
        mode: "onBlur",
        resolver: yupResolver(loginValidationSchema),
        defaultValues: {
            email: EMAIL_DEFAULT,
            password: PASSWORD_DEFAULT,
        },
    })

    const onSubmit = async (credentials: LoginFormInputs) => {
        login({
            email: credentials.email,
            password: credentials.password
        }).unwrap()
            .then((payload) => {
                console.log(payload)
                if (credentials.rememberMe) {
                    localStorage.setItem("access_token", payload.tokens.access)
                    localStorage.setItem("exp_access", `${payload.tokens.access_live}UTC`)
                    localStorage.setItem("refresh_token", payload.tokens.refresh)
                    localStorage.setItem("email", payload.email)
                } else {
                    localStorage.removeItem("access_token")
                    localStorage.removeItem("exp_access")
                    localStorage.removeItem("refresh_token")
                    localStorage.removeItem("email")
                    sessionStorage.setItem("access_token", payload.tokens.access)
                    sessionStorage.setItem("exp_access", `${payload.tokens.access_live}UTC`)
                    sessionStorage.setItem("refresh_token", payload.tokens.refresh)
                    sessionStorage.setItem("email", payload.email)
                }
                dispatch(changeAuthStatus("private"))
                // history.push("/")
            })
            .catch((error) => {
                if (error?.data?.detail === "Email is not verified") {
                    setErrorMessage("Подтвердите свой емейл")
                }
                if (error?.data?.detail === "Invalid credentials, try again") {
                    setErrorMessage("Неверно указана почта или пароль")
                }
                console.error('rejected', error)
            })
    }
    return (
        <_.Wrapper>
            {isError && <_.Error>{errorMessage}</_.Error>}
            <FormProvider {...methods} >
                <_.Form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                    <TextField name="email" type="email" label="Эл. почта" required/>
                    <TextField name="password" type="password" label="Пароль" required/>
                    <_.RecoveryPassword to="/auth/password-reset-email/">
                        Забыли пароль?
                    </_.RecoveryPassword>
                    <_.Label
                        {...methods.register("rememberMe")}
                        control={<MUICheckbox defaultChecked/>}
                        label={"Запомнить меня"}
                    />
                    <MUIButton type="submit" variant="contained">Вход</MUIButton>
                    <_.RegistrationLink to="/registration">
                        Ещё не зарегистрированы?
                    </_.RegistrationLink>
                    <SocialButton/>
                </_.Form>
            </FormProvider>
        </_.Wrapper>
    )
}

const _ = {
    Wrapper: styled("div")({
        textAlign: "center",
    }),
    Form: styled("form")({
        display: "flex",
        flexDirection: "column",
    }),
    Error: styled('div')(({theme}) => ({
        marginBottom: "20px",
        color: theme.palette.error.main,
    })),
    RegistrationLink: styled(Link)(({theme}) => ({
        margin: "15px 0",
        color: theme.palette.text.primary,
    })),
    Label: styled(FormControlLabel)({
        margin: "0 auto 10px",
    }),
    RecoveryPassword: styled(Link)(({theme}) => ({
        alignSelf: "end",
        marginTop: -20,
        marginBottom: 20,
        color: theme.palette.primary.light,
        textDecoration: "none",
        fontSize: 13,
        "&:hover": {
            textDecoration: "underline"
        }
    })),
}
