import {FormProvider, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import SocialButton from "../components/SocialButton"
import TextField from "../components/TextField"
import {registrationValidationSchema} from "../core/yupValidastionSchemes"
import {Button, styled} from "@mui/material"
import {Link, useHistory} from "react-router-dom"
import type {RegistrationFormInputs} from "../core/types/globalTypes"
import { useRegistrationMutation } from "../core/api/services/authService"
import {useAppSelector} from "../core/hooks"
import {EMAIL_DEFAULT, PASSWORD_DEFAULT} from "../core/constants"

export default function Registration() {
    const [registration, {isError}] = useRegistrationMutation()
    const {authStatus} = useAppSelector((state) => state.congratulations)

    const history = useHistory()
    const methods = useForm<RegistrationFormInputs>({
        mode: "onTouched",
        resolver: yupResolver(registrationValidationSchema),
        defaultValues: {
            email: EMAIL_DEFAULT,
            password: PASSWORD_DEFAULT,
            repeat: PASSWORD_DEFAULT
        },
    })

    const onSubmit = (data: RegistrationFormInputs) => {
        console.log(data)
        registration({
            email: data.email,
            password: data.password
        }).unwrap()
            .then(() => {
                console.log(authStatus)
                history.push("/confirm")
            })
            .catch((error) => {
                console.error('rejected', error)
            })
    }
    return (
        <_.Wrapper>
            {isError && <_.Error>Такой емейл уже зарегистрирован</_.Error>}
            <FormProvider {...methods} >
                <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                    <_.Inner>
                        <TextField name="email" type="email" label="Эл. почта" required/>
                        <TextField name="password" type="password" label="Пароль" required/>
                        <TextField name="repeat" type="password" label="Повторите пароль" required/>
                        <Button type="submit" variant="contained">Регистрация</Button>
                        <_.AgreementLinkContainer>
                            Регистрируясь вы принимаете условия <_.AgreementLink to="/agreement">пользовательского
                            соглашения</_.AgreementLink>
                        </_.AgreementLinkContainer>
                        <_.LoginLink to="/login">
                            Уже зарегистрированы?
                        </_.LoginLink>
                        <SocialButton/>
                    </_.Inner>
                </form>
            </FormProvider>
        </_.Wrapper>
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
    LoginLink: styled(Link)(({theme}) => ({
        margin: "15px 0",
        color: theme.palette.text.primary,
    })),
    AgreementLinkContainer: styled("div")({
        marginTop: "20px",
    }),
    AgreementLink: styled(Link)(({theme}) => ({
        color: theme.palette.text.primary,
    })),
    Error: styled('div')(({theme}) => ({
        marginBottom: "20px",
        color: theme.palette.error.main,
    })),
}