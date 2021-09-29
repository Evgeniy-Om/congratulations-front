import {Button} from "@mui/material"
import {FormProvider, useForm} from "react-hook-form"
import {SchemaOf, string, object, bool} from 'yup'
import {yupResolver} from "@hookform/resolvers/yup"
import {useState} from "react"
import SocialsButtons from "../../components/SocialsButtons"
import * as Styled from "./styled"
import ReactHookFormTextField from "../../components/RHookFormTextField"
import { LoginFormInputsTypes } from "../../core/types"
import { LOGIN_FORM_DEFAULT_VALUES } from "../../core/constants"
import {loginValidationSchema} from "../../core/schemes"


function Login () {
    const [error, setError] = useState(false)
    const methods = useForm<LoginFormInputsTypes>({
        mode: "onBlur",
        resolver: yupResolver(loginValidationSchema),
        defaultValues: LOGIN_FORM_DEFAULT_VALUES,
    })

    const onSubmit = (data: LoginFormInputsTypes) => {
        setError(false) // Под вопросом нужно ли
        console.log(data)
        if (data.email !== LOGIN_FORM_DEFAULT_VALUES.email ||
            data.password !== LOGIN_FORM_DEFAULT_VALUES.password) {
            setError(true)
        }
    }
    return (
        <Styled.Wrapper>
            {error && <Styled.ErrorLoginOrPassword>Неверно указана почта или пароль</Styled.ErrorLoginOrPassword>}
            <FormProvider {...methods} >
                <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                    <Styled.FormInner>
                        <ReactHookFormTextField name="email" type="email" label="Эл. почта"/>
                        <ReactHookFormTextField name="password" type="password" label="Пароль"/>
                        <Button type="submit" variant="contained">Вход</Button>
                        <Styled.RegistrationLink to="/new">
                            Ещё не зарегистрированы?
                        </Styled.RegistrationLink>
                        <SocialsButtons/>
                    </Styled.FormInner>
                </form>
            </FormProvider>
        </Styled.Wrapper>
    )
}

export default Login