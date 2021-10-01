import {Button, Checkbox} from "@mui/material"
import {FormProvider, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {useState} from "react"
import SocialsButtons from "../../components/SocialsButtons"
import * as S from "./styled"
import {Label} from "./styled"
import ReactHookFormTextField from "../../components/RHookFormTextField"
import {LoginFormInputsTypes} from "../../core/types"
import {LOGIN_FORM_DEFAULT_VALUES as DEFAULT_VALUES} from "../../core/constants"
import {loginValidationSchema} from "../../core/schemes"
import {useHistory} from "react-router-dom"

function Login() {
    const [error, setError] = useState(false)
    const history = useHistory()
    const methods = useForm<LoginFormInputsTypes>({
        mode: "onBlur",
        resolver: yupResolver(loginValidationSchema),
        defaultValues: DEFAULT_VALUES,
    })

    const onSubmit = (data: LoginFormInputsTypes) => {
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
        <S.Wrapper>
            {error && <S.Error>Неверно указана почта или пароль</S.Error>}
            <FormProvider {...methods} >
                <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                    <S.Inner>
                        <ReactHookFormTextField name="email" type="email" label="Эл. почта"/>
                        <ReactHookFormTextField name="password" type="password" label="Пароль"/>
                        <Label control={<Checkbox defaultChecked/>} label="Запомнить меня"/>
                        <Button type="submit" variant="contained">Вход</Button>
                        <S.RegistrationLink to="/registration">
                            Ещё не зарегистрированы?
                        </S.RegistrationLink>
                        <SocialsButtons/>
                    </S.Inner>
                </form>
            </FormProvider>
        </S.Wrapper>
    )
}

export default Login