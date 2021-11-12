import type {CongratulationItem} from "../../core/types/globalTypes"
import {FormProvider, SubmitHandler} from "react-hook-form"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import {Button as MUIButton, styled} from "@mui/material"
import {useForm} from "react-hook-form"
import Link from "../../components/Link"
import {useEditCongratulationMutation, useGetCongratulationsQuery} from "../../core/api/services/congratulationsService"
import {RouteComponentProps} from "react-router-dom"
import {yupResolver} from "@hookform/resolvers/yup"
import {FormCongratulationValidationSchema} from "../../core/yupValidastionSchemes"
import {getDefaultValues} from "./getDefaultValues"
import getId from "./getId"
import getModifiedData from "./getModifiedData"
import FormCongratulation from "../../components/FormCongratulation"

export default function Edit({match}: RouteComponentProps<{ id: string }>) {
    const idEditableItem = getId(match)
    const {editableItem} = useGetCongratulationsQuery(undefined, {
        selectFromResult: ({data}) => ({
            editableItem: data?.find((item) => item.id === idEditableItem),
        }),
    })
    const methods = useForm<CongratulationItem>({
        mode: "onBlur",
        resolver: yupResolver(FormCongratulationValidationSchema),
        defaultValues: getDefaultValues(editableItem),
    })
    const [editCongratulation, {isSuccess, isLoading, isError}] = useEditCongratulationMutation()

    const onSubmit: SubmitHandler<CongratulationItem> = (data) => {
        const modifiedData = getModifiedData(data, idEditableItem)
        editCongratulation(modifiedData)
            .unwrap()
            .then((payload) => {
                // console.log(payload)
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
                    <FormCongratulation page="Edit"/>
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
    Form: styled("form")({
        display: "flex",
        flexDirection: "column",
    }),
    Info: styled("div")({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 50,

    }),
}
