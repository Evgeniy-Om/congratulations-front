import type {CongratulationItem} from "../../core/types/globalTypes"
import {FormProvider, SubmitHandler} from "react-hook-form"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import {Button as MUIButton, styled} from "@mui/material"
import {useForm} from "react-hook-form"
import Link_ReactRouterDom from "../../components/Link_ReactRouterDom"
import {useEditCongratulationMutation, useGetCongratulationsQuery} from "../../core/api/services/congratulations"
import {RouteComponentProps} from "react-router-dom"
import {yupResolver} from "@hookform/resolvers/yup"
import {NewCongratulationValidationSchema} from "../../core/yupValidastionSchemes"
import {getDefaultValues} from "./getDefaultValues"
import getId from "./getId"
import getModifiedData from "./getModifiedData"
import FormNewOrEdit from "../../components/FormNewOrEdit"

export default function Edit({match}: RouteComponentProps<{ id: string }>) {
    const idEditableItem = getId(match)
    const {editableItem} = useGetCongratulationsQuery(undefined, {
        selectFromResult: ({data}) => ({
            editableItem: data?.find((item) => item.id === idEditableItem),
        }),
    })
    const methods = useForm<CongratulationItem>({
        mode: "onBlur",
        resolver: yupResolver(NewCongratulationValidationSchema),
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
            <Link_ReactRouterDom to="/">
                <MUIButton variant="outlined" component="span" startIcon={<ArrowBackIosIcon/>}>
                    Назад
                </MUIButton>
            </Link_ReactRouterDom>

            <h2>Новая запись</h2>
            <hr/>

            <br/>
            <br/>

            <FormProvider {...methods} >
                <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                    <FormNewOrEdit page="Edit"/>
                </form>
            </FormProvider>

            <Styled.Info>
                {isSuccess && <div>Данные успешно сохранены!</div>}
                {isLoading && <div>Сохраняем ....</div>}
                {isError && <div>Какая-то ошибка</div>}
            </Styled.Info>
        </div>
    )
}

// Styled Components
const Styled = {
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
