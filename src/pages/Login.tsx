import {Button as MUIButton, FormControlLabel, styled} from "@mui/material"
import {FormProvider, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import SocialsButtons from "../components/SocialsButtons"
import ReactHookFormTextField from "../components/RHookFormTextField"
import {LOGIN_FORM_DEFAULT_VALUES as DEFAULT_VALUES} from "../core/constants"
import {loginValidationSchema} from "../core/schemes"
import {Link, useHistory} from "react-router-dom"
import type {LoginFormInputs} from "../core/global-types"
import {useLoginMutation} from "../core/services/auth"
import ReactHookFormCheckbox from "../components/RHookFormCheckbox"

export default function Login() {
    const [login, {isError}] = useLoginMutation()
    const history = useHistory()
    const methods = useForm<LoginFormInputs>({
        mode: "onBlur",
        resolver: yupResolver(loginValidationSchema),
        defaultValues: DEFAULT_VALUES,
    })

    const onSubmit = async (credentials: LoginFormInputs) => {
        console.log(credentials.rememberMe)
        // const response = await login({
        //     email: "sdfds@dsf.ru",
        //     password: "123212d",
        //     // email: credentials.email,
        //     // password: credentials.password
        // })
        // if ("data" in response) {
        //     console.log(response.data.access_token)
        //     localStorage.setItem("access_token", response.data.access_token)
        //     history.push("/home")
        // }

        login({
            email: "sdfds@dsf.ru",
            password: "123212d",
            // email: credentials.email,
            // password: credentials.password
        }).unwrap()
            .then((payload) => {
                console.log(payload)
                credentials.rememberMe
                    ? localStorage.setItem("access_token", payload.tokens.access)
                    : sessionStorage.setItem("access_token", payload.tokens.access)
                localStorage.setItem("refresh_token", payload.tokens.refresh)
                // history.push("/home")
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
