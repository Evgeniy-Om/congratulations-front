import {FormProvider, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import SocialsButtons from "../../components/SocialsButtons"
import * as S from "./styled"
import ReactHookFormTextField from "../../components/RHookFormTextField"
import {RegistrationFormInputsTypes} from "../../core/types"
import {registrationValidationSchema} from "../../core/schemes"
import {Button} from "@mui/material"
import {useHistory} from "react-router-dom"

function Registration() {
    const history = useHistory()
    const methods = useForm<RegistrationFormInputsTypes>({
        mode: "onBlur",
        resolver: yupResolver(registrationValidationSchema),
    })

    const onSubmit = (data: RegistrationFormInputsTypes) => {
        console.log(data)
        history.push("/home")
    }
    return (
        <S.Wrapper>
            <FormProvider {...methods} >
                <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                    <S.Inner>
                        <ReactHookFormTextField name="email" type="email" label="Эл. почта"/>
                        <ReactHookFormTextField name="password" type="password" label="Пароль"/>
                        <ReactHookFormTextField name="repeat" type="password" label="Повторите пароль"/>
                        <Button type="submit" variant="contained">Регистрация</Button>
                        <S.AgreementLinkContainer>
                            Регистрируясь вы принимаете условия <S.AgreementLink to="/agreement">пользовательского
                            соглашения</S.AgreementLink>
                        </S.AgreementLinkContainer>
                        <S.RegistrationLink to="/login">
                            Уже зарегистрированы?
                        </S.RegistrationLink>
                        <SocialsButtons/>
                    </S.Inner>
                </form>
            </FormProvider>
        </S.Wrapper>
    )
}

export default Registration