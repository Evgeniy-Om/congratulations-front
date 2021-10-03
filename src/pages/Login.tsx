import {Button as MUIButton, Checkbox as MUICheckbox, FormControlLabel, styled} from "@mui/material"
import {FormProvider, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {useState} from "react"
import SocialsButtons from "../components/SocialsButtons"
import ReactHookFormTextField from "../components/RHookFormTextField"
import {LOGIN_FORM_DEFAULT_VALUES as DEFAULT_VALUES} from "../core/constants"
import {loginValidationSchema} from "../core/schemes"
import {Link, useHistory} from "react-router-dom"
import type { LoginFormInputs } from "../core/global-types"

export default function Login() {
    const [error, setError] = useState(false)
    const history = useHistory()
    const methods = useForm<LoginFormInputs>({
        mode: "onBlur",
        resolver: yupResolver(loginValidationSchema),
        defaultValues: DEFAULT_VALUES,
    })

    const onSubmit = (data: LoginFormInputs) => {
        setError(false) // Под вопросом нужно ли
        console.log(data)
        if (data.email !== DEFAULT_VALUES.email ||
            data.password !== DEFAULT_VALUES.password) {
            setError(true)
        } else {
            history.push("/home")
        }
    }
    return (
        <Styled.Wrapper>
            {error && <Styled.Error>Неверно указана почта или пароль</Styled.Error>}
            <FormProvider {...methods} >
                <Styled.Form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                    <ReactHookFormTextField name="email" type="email" label="Эл. почта"/>
                    <ReactHookFormTextField name="password" type="password" label="Пароль"/>
                    <Styled.Label control={<MUICheckbox defaultChecked/>} label="Запомнить меня"/>
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
