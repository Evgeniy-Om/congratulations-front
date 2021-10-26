import {FormProvider, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import SocialsButtons from "../components/SocialsButtons"
import ReactHookFormTextField from "../components/RHookFormTextField"
import {registrationValidationSchema} from "../core/yupValidastionSchemes"
import {Button, styled} from "@mui/material"
import {Link, useHistory} from "react-router-dom"
import type {RegistrationFormInputs} from "../core/types/globalTypes"
import { useRegistrationMutation } from "../core/api/services/auth"
import {useAppSelector} from "../core/hooks"

export default function Registration() {
    const [registration, {isError}] = useRegistrationMutation()
    const {authStatus} = useAppSelector((state) => state.congratulations)

    const history = useHistory()
    const methods = useForm<RegistrationFormInputs>({
        mode: "onTouched",
        resolver: yupResolver(registrationValidationSchema),
        defaultValues: {
            email: "sdfds@dsf.ru",
            password: "123212d",
            repeat: "123212d"
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
            .catch((error) => console.error('rejected', error))
    }
    return (
        <Styled.Wrapper>
            {isError && <Styled.Error>Такой емейл уже зарегистрирован</Styled.Error>}
            <FormProvider {...methods} >
                <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                    <Styled.Inner>
                        <ReactHookFormTextField name="email" type="email" label="Эл. почта"/>
                        <ReactHookFormTextField name="password" type="password" label="Пароль"/>
                        <ReactHookFormTextField name="repeat" type="password" label="Повторите пароль"/>
                        <Button type="submit" variant="contained">Регистрация</Button>
                        <Styled.AgreementLinkContainer>
                            Регистрируясь вы принимаете условия <Styled.AgreementLink to="/agreement">пользовательского
                            соглашения</Styled.AgreementLink>
                        </Styled.AgreementLinkContainer>
                        <Styled.RegistrationLink to="/login">
                            Уже зарегистрированы?
                        </Styled.RegistrationLink>
                        <SocialsButtons/>
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