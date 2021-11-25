import type {CongratulationItem} from "../../core/types/globalTypes"
import {FormProvider, SubmitHandler} from "react-hook-form"
import {Button as MUIButton, styled} from "@mui/material"
import {useForm} from "react-hook-form"
import {
    useDeleteCongratulationMutation,
    useEditCongratulationMutation,
    useGetCongratulationsQuery,
} from "../../core/api/services/congratulationsService"
import {RouteComponentProps, useHistory} from "react-router-dom"
import {yupResolver} from "@hookform/resolvers/yup"
import {FormCongratulationValidationSchema} from "../../core/yupValidastionSchemes"
import {getDefaultValues} from "./getDefaultValues"
import getId from "./getId"
import getModifiedData from "./getModifiedData"
import FormCongratulation from "../../components/FormCongratulation/FormCongratulation"
import MUIDeleteIcon from "@mui/icons-material/Delete"
import BackButton from "../../components/BackButton";

export default function Edit({match}: RouteComponentProps<{ id: string }>) {
    const idEditableItem = getId(match)
    const {editableItem} = useGetCongratulationsQuery(undefined, {
        selectFromResult: ({data}) => ({
            editableItem: data?.find((item) => item.id === idEditableItem),
        }),
    })
    const [deleteCongratulation] = useDeleteCongratulationMutation()
    const methods = useForm<CongratulationItem>({
        mode: "onBlur",
        resolver: yupResolver(FormCongratulationValidationSchema),
        defaultValues: getDefaultValues(editableItem),
    })
    const [editCongratulation, {isSuccess, isLoading, isError}] = useEditCongratulationMutation()
    const history = useHistory()

    const onSubmit: SubmitHandler<CongratulationItem> = (data) => {
        const modifiedData = getModifiedData(data, idEditableItem)
        console.log(modifiedData)
        editCongratulation(modifiedData)
            .unwrap()
            .then((payload) => {
                // console.log(payload)
            })
            .catch((error) => console.error('rejected', error))
    }
    return (
        <div>
            <_.Buttons>
                <BackButton/>
                <MUIButton
                    aria-label="delete"
                    variant="outlined"
                    component="span"
                    endIcon={<_.DeleteIcon/>}
                    onClick={() => {
                        deleteCongratulation(idEditableItem).then(() => {
                            history.push("/")
                        })
                    }}>
                    Удалить
                </MUIButton>

            </_.Buttons>

            <h2>Редактирование</h2>
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
    Buttons: styled("div")({
        display: "flex",
        justifyContent: "space-between",
    }),
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
    DeleteIcon: styled(MUIDeleteIcon)(({theme}) => ({
        color: theme.palette.primary.light,
    })),
}
