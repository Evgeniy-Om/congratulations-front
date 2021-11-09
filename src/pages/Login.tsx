import {Button as MUIButton, FormControlLabel, styled} from "@mui/material"
import {FormProvider, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import ButtonsSocials from "../components/ButtonsSocials"
import TextField_ReactHookForm from "../components/TextField_ReactHookForm"
import {loginValidationSchema} from "../core/yupValidastionSchemes"
import {Link, useHistory} from "react-router-dom"
import type {LoginFormInputs} from "../core/types/globalTypes"
import {useLoginMutation} from "../core/api/services/authService"
import Checkbox_ReactHookForm from "../components/Checkbox_ReactHookForm"
import {useAppDispatch} from "../core/hooks"
import {changeAuthStatus} from "../core/store/congratulationsSlice"
import {useState} from "react"
import {EMAIL_DEFAULT, PASSWORD_DEFAULT} from "../core/constants"

export default function Login() {
    const [login, {isError}] = useLoginMutation()
    const [errorMessage, setErrorMessage] = useState("")
    const history = useHistory()
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
                } else {
                    localStorage.removeItem("access_token")
                    localStorage.removeItem("exp_access")
                    localStorage.removeItem("refresh_token")
                    sessionStorage.setItem("access_token", payload.tokens.access)
                    sessionStorage.setItem("exp_access", `${payload.tokens.access_live}UTC`)
                    sessionStorage.setItem("refresh_token", payload.tokens.refresh)
                }
                dispatch(changeAuthStatus("private"))
                // history.push("/")
            })
            .catch((error) => {
                if (error.data.detail === "Email is not verified") {
                    setErrorMessage("Подтвердите свой емейл")
                }
                if (error.data.detail === "Invalid credentials, try again") {
                    setErrorMessage("Неверно указана почта или пароль")
                }
                console.error('rejected', error)
            })
    }
    return (
        <Styled.Wrapper>
            {isError && <Styled.Error>{errorMessage}</Styled.Error>}
            <FormProvider {...methods} >
                <Styled.Form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                    <TextField_ReactHookForm name="email" type="email" label="Эл. почта" required/>
                    <TextField_ReactHookForm name="password" type="password" label="Пароль" required/>
                    <Checkbox_ReactHookForm name="rememberMe" label="Запомнить меня"/>
                    <MUIButton type="submit" variant="contained">Вход</MUIButton>
                    <Styled.RegistrationLink to="/registration">
                        Ещё не зарегистрированы?
                    </Styled.RegistrationLink>
                    <ButtonsSocials/>
                </Styled.Form>
            </FormProvider>
        </Styled.Wrapper>
    )
}

// Styled Components
const Styled = {
    Wrapper: styled("div")({
        textAlign: "center",
    }),
    Form: styled("form")({
        display: "flex",
        flexDirection: "column",
    }),
    Label: styled(FormControlLabel)({
        margin: "0 auto 10px",
    }),
    Error: styled('div')(({theme}) => ({
        marginBottom: "20px",
        color: theme.palette.error.main,
    })),
    RegistrationLink: styled(Link)(({theme}) => ({
        margin: "15px 0",
        color: theme.palette.text.primary,
    })),
}
