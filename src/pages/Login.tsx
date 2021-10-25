import {Button as MUIButton, FormControlLabel, styled} from "@mui/material"
import {FormProvider, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import SocialsButtons from "../components/SocialsButtons"
import ReactHookFormTextField from "../components/RHookFormTextField"
import {LOGIN_FORM_DEFAULT_VALUES as DEFAULT_VALUES} from "../core/constants"
import {loginValidationSchema} from "../core/yupValidastionSchemes"
import {Link, useHistory} from "react-router-dom"
import type {LoginFormInputs} from "../core/global-types"
import {useLoginMutation} from "../core/api/services/auth"
import ReactHookFormCheckbox from "../components/RHookFormCheckbox"
import {useAppDispatch} from "../core/hooks"
import {changeAuthStatus} from "../core/store/congratulationsSlice"

export default function Login() {
    const [login, {isError}] = useLoginMutation()
    const history = useHistory()
    const dispatch = useAppDispatch()
    const methods = useForm<LoginFormInputs>({
        mode: "onBlur",
        resolver: yupResolver(loginValidationSchema),
        defaultValues: DEFAULT_VALUES,
    })

    const onSubmit = async (credentials: LoginFormInputs) => {
        login({
            email: "sdfds@dsf.ru",
            password: "123212d",
            // email: credentials.email,
            // password: credentials.password
        }).unwrap()
            .then((payload) => {
                console.log(payload)
                if (credentials.rememberMe) {
                    localStorage.setItem("access_token", payload.tokens.access)
                    localStorage.setItem("exp_access", `${payload.tokens.access_live}UTC`)
                } else {
                    sessionStorage.setItem("access_token", payload.tokens.access)
                    sessionStorage.setItem("exp_access", `${payload.tokens.access_live}UTC`)
                }
                localStorage.setItem("refresh_token", payload.tokens.refresh)
                dispatch(changeAuthStatus("private"))
                history.push("/")
            })
            .catch((error) => console.error('rejected', error))
    }
    return (
        <Styled.Wrapper>
            {isError && <Styled.Error>Неверно указана почта или пароль</Styled.Error>}
            <FormProvider {...methods} >
                <Styled.Form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                    <ReactHookFormTextField name="email" type="email" label="Эл. почта"/>
                    <ReactHookFormTextField name="password" type="password" label="Пароль"/>
                    <ReactHookFormCheckbox name="rememberMe" label="Запомнить меня"/>
                    <MUIButton type="submit" variant="contained">Вход</MUIButton>
                    <Styled.RegistrationLink to="/registration">
                        Ещё не зарегистрированы?
                    </Styled.RegistrationLink>
                    <SocialsButtons/>
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
