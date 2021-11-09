import {FormProvider, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import ButtonsSocials from "../components/ButtonsSocials"
import TextField_ReactHookForm from "../components/TextField_ReactHookForm"
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
        <Styled.Wrapper>
            {isError && <Styled.Error>Такой емейл уже зарегистрирован</Styled.Error>}
            <FormProvider {...methods} >
                <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                    <Styled.Inner>
                        <TextField_ReactHookForm name="email" type="email" label="Эл. почта" required/>
                        <TextField_ReactHookForm name="password" type="password" label="Пароль" required/>
                        <TextField_ReactHookForm name="repeat" type="password" label="Повторите пароль" required/>
                        <Button type="submit" variant="contained">Регистрация</Button>
                        <Styled.AgreementLinkContainer>
                            Регистрируясь вы принимаете условия <Styled.AgreementLink to="/agreement">пользовательского
                            соглашения</Styled.AgreementLink>
                        </Styled.AgreementLinkContainer>
                        <Styled.RegistrationLink to="/login">
                            Уже зарегистрированы?
                        </Styled.RegistrationLink>
                        <ButtonsSocials/>
                    </Styled.Inner>
                </form>
            </FormProvider>
        </Styled.Wrapper>
    )
}

// Styled Components
const Styled = {
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
    AgreementLink: styled(Link)(({theme}) => ({
        color: theme.palette.text.primary,
    })),
    Error: styled('div')(({theme}) => ({
        marginBottom: "20px",
        color: theme.palette.error.main,
    })),
}