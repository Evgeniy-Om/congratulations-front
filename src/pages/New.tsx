import type {CongratulationItem} from "../core/types/globalTypes"
import type {SubmitHandler} from "react-hook-form"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import {Button as MUIButton, styled} from "@mui/material"
import {FormProvider, useForm} from "react-hook-form"
import Link from "../components/Link"
import {useAddCongratulationMutation} from "../core/api/services/congratulationsService"
import {yupResolver} from "@hookform/resolvers/yup"
import {FormCongratulationValidationSchema} from "../core/yupValidastionSchemes"
import getDefaultDate from "../core/features/getDefaultDate"
import FormCongratulation from "../components/FormCongratulation"

export default function New() {
    const [addCongratulation, {isSuccess, isLoading, isError}] = useAddCongratulationMutation()
    const methods = useForm<CongratulationItem>({
        mode: "onBlur",
        resolver: yupResolver(FormCongratulationValidationSchema),
        defaultValues: {alert_datetime: getDefaultDate()},
    })

    const onSubmit: SubmitHandler<CongratulationItem> = (data) => {
        const modifyData = {...data, alert_datetime: new Date(data.alert_datetime).toJSON()}
        addCongratulation(modifyData)
            .unwrap()
            .then((payload) => {
                console.log(payload)
            })
            .catch((error) => console.error('rejected', error))
    }
    return (
        <div>
            <Link to="/">
                <MUIButton variant="outlined" component="span" startIcon={<ArrowBackIosIcon/>}>
                    Назад
                </MUIButton>
            </Link>

            <h2>Новая запись</h2>
            <hr/>

            <br/>
            <br/>

            <FormProvider {...methods} >
                <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                    <FormCongratulation page="New" />
                </form>

            </FormProvider>


            <_.Info>
                {isSuccess && <div>Данные успешно сохранены!</div>}
                {isLoading && <div>Сохраняем ....</div>}
                {isError && <div>Какая-то ошибка</div>}
            </_.Info>

        </div>
    )
}

// _ Components
const _ = {
    Info: styled("div")({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 50,

    }),
}