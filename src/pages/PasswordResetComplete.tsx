import {FormProvider, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import TextField from "../components/TextField"
import {PasswordResetCompleteValidationSchema} from "../core/yupValidastionSchemes"
import {Button, styled} from "@mui/material"
import {usePasswordResetCompleteMutation} from "../core/api/services/authService"
import {useState} from "react"
import BackButton from "../components/BackButton"

export default function PasswordResetComplete() {
    const [passwordResetComplete, {isSuccess, isError}] = usePasswordResetCompleteMutation()
    const [errorMessage, setErrorMessage] = useState("")

    const methods = useForm<{ password: string, token: string, uidb64: string }>({
        mode: "onTouched",
        resolver: yupResolver(PasswordResetCompleteValidationSchema),
    })

    const onSubmit = (data: { password: string, repeat: string }) => {
        const pathSplit = window.location.pathname.split("/")
        console.log(pathSplit)
        console.log({
            password: data.password,
            token: pathSplit[4],
            uidb64: pathSplit[3],
        })
        passwordResetComplete({
            password: data.password,
            token: pathSplit[4],
            uidb64: pathSplit[3],
        }).unwrap()
            .then(() => {
                // console.log(authStatus)
                // history.push("/confirm")
            })
            .catch((error) => {
                if (error.data.detail === "The reset link is invalid") {
                    setErrorMessage("Данная ссылка уже недействительна")
                }
                console.error('rejected', error)
            })
    }
    return (
        <>
            <BackButton/>
            <_.Wrapper>
                {isSuccess && <_.Success>Пароль успешно обновлён</_.Success>}
                {isError && <_.Error>{errorMessage}</_.Error>}
                <h3>Задайте новый пароль</h3>
                <FormProvider {...methods} >
                    <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                        <_.Inner>
                            <TextField name="password" type="password" label="Пароль" required/>
                            <TextField name="repeat" type="password" label="Повторите пароль" required/>
                            <Button type="submit" variant="contained">Отправить</Button>
                        </_.Inner>
                    </form>
                </FormProvider>
            </_.Wrapper>
        </>
    )
}


const _ = {
    Wrapper: styled("div")({
        textAlign: "center",
    }),
    Inner: styled("div")({
        display: "flex",
        flexDirection: "column",
    }),
    Success: styled('div')(({theme}) => ({
        marginBottom: "20px",
        color: theme.palette.success.main,
    })),
    Error: styled('div')(({theme}) => ({
        marginBottom: "20px",
        color: theme.palette.error.main,
    })),
}