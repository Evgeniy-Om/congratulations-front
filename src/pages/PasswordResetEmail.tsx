import {Button as MUIButton, styled} from "@mui/material"
import {FormProvider, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import TextField from "../components/TextField"
import {PasswordResetEmailValidationSchema} from "../core/yupValidastionSchemes"
import {usePasswordResetEmailMutation} from "../core/api/services/authService"
import {useState} from "react"

export default function PasswordResetEmail() {
    const [passwordResetEmail, {isSuccess, isError}] = usePasswordResetEmailMutation()
    const [errorMessage, setErrorMessage] = useState("")
    const methods = useForm<{ email: string }>({
        mode: "onBlur",
        resolver: yupResolver(PasswordResetEmailValidationSchema),
    })

    const onSubmit = async (data: { email: string }) => {
        passwordResetEmail(data)
            .unwrap()
            .catch((error) => {
                if (error.data.error === "Email not found") {
                    setErrorMessage("Такой почты не существует")
                }
                console.error('rejected', error)
            })
    }
    return (
        <_.Wrapper>
            {isError && <_.Error>{errorMessage}</_.Error>}
            {isSuccess && <_.Success>Проверьте свой почтовый ящик</_.Success>}
            <h3>Отправить ссылку для восстановления пароля на емейл</h3>
            <FormProvider {...methods} >
                <_.Form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                    <TextField name="email" type="email" label="Эл. почта" required/>
                    <MUIButton type="submit" variant="contained">Отправить</MUIButton>
                </_.Form>
            </FormProvider>
        </_.Wrapper>
    )
}

const _ = {
    Wrapper: styled("div")({
        textAlign: "center",
    }),
    Form: styled("form")({
        display: "flex",
        flexDirection: "column",
    }),
    Error: styled('div')(({theme}) => ({
        marginBottom: "20px",
        color: theme.palette.error.main,
    })),
    Success: styled('div')(({theme}) => ({
        marginBottom: "20px",
        color: theme.palette.success.main,
    })),
}
