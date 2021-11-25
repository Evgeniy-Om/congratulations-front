import {Button, styled} from "@mui/material"
import BackButton from "../components/BackButton"
import {useSupportEmailMutation} from "../core/api/services/authService"
import {Link} from "react-router-dom"
import {FormProvider, useForm} from "react-hook-form"
import {SupportFormInputs} from "../core/types/globalTypes"
import {yupResolver} from "@hookform/resolvers/yup"
import {SupportValidationSchema} from "../core/yupValidastionSchemes"
import TextField from "../components/TextField"

function Support() {
    const [sendSupportEmail, {isSuccess, isError}] = useSupportEmailMutation()

    const methods = useForm<SupportFormInputs>({
        mode: "onTouched",
        resolver: yupResolver(SupportValidationSchema),
        defaultValues: {
            email: sessionStorage.getItem("email") ?? localStorage.getItem("email") ?? "",
        },
    })

    const onSubmit = (data: SupportFormInputs) => {
        console.log(data)
        sendSupportEmail({
            email: data.email,
            name: data.name,
            body: data.comment,
        }).unwrap()
            .then(() => {
            })
            .catch((error) => {
                console.error('rejected', error)
            })
    }

    if (isSuccess) return (
        <>
            Спасибо за обращение
            <BackButton/>
        </>
    )

    return (
        <div>
            <BackButton/>

            <h2>Поддержка</h2>
            <hr/>
            <br/>
            <br/>
            <_.Wrapper>
                <FormProvider {...methods} >
                    <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                        <_.Inner>
                            <TextField name="name" type="text" label="Имя" required/>
                            <TextField name="email" type="email" label="Эл. почта" required/>
                            <TextField
                                name="comment"
                                type="text"
                                label="Опишите, пожалуйста, вашу проблему"
                                isWatch={true}
                                multiline
                                rows={4}
                                maxLength={250}
                                required
                            />
                            <Button type="submit" variant="contained">Отправить</Button>
                        </_.Inner>
                    </form>
                </FormProvider>
            </_.Wrapper>
        </div>
    )
}

export default Support

const _ = {
    Wrapper: styled("div")({
        display: "flex",
        flexDirection: "column",
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