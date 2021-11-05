import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import {DateTimePicker, LocalizationProvider} from "@mui/lab"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import ruLocale from "date-fns/locale/ru"
import {Button, FormControlLabel, styled} from "@mui/material"
import {Controller, FormProvider, useForm} from "react-hook-form"
import ReactRouterDomLink from "../components/ReactRouterDomLink"
import {CongratulationItem} from "../core/types/globalTypes"
import {useEditCongratulationMutation, useGetCongratulationsQuery} from "../core/api/services/congratulations"
import {Link, RouteComponentProps} from "react-router-dom"
import {yupResolver} from "@hookform/resolvers/yup"
import {NewCongratulationValidationSchema} from "../core/yupValidastionSchemes"
import ReactHookFormTextField from "../components/RHookFormTextField"
import {getMaxDateCalendar} from "../core/features/getMaxDateCalendar"
import ReactHookFormCheckbox from "../components/RHookFormCheckbox"

export default function Edit({ match }: RouteComponentProps<TParams>) {
    const {data} = useGetCongratulationsQuery()
    const idItem = Number(match.params.id)
    const editItem = data?.find((item) => item.id === idItem)
    let defValues = {}
    if (editItem) {
        defValues = {
            alert_datetime: editItem.alert_datetime,
            bday_name: editItem.bday_name,
            comment: editItem.comment,
            notify_by_email: editItem.notify_by_email
        }
    }
    const [editCongratulation, {isSuccess, isLoading, isError}] = useEditCongratulationMutation()
    const methods = useForm<CongratulationItem>({
        mode: "onBlur",
        resolver: yupResolver(NewCongratulationValidationSchema),
        defaultValues: defValues,
    })

    // console.log(data?.find((item) => item.id === idItem))

    const onSubmit = (data: CongratulationItem) => {
        // console.log(data)
        const modifyData = {
            ...data,
            id: idItem,
            alert_datetime: new Date(data.alert_datetime).toJSON()
        }
        editCongratulation(modifyData)
            .unwrap()
            .then((payload) => {
                // console.log(payload)
            })
            .catch((error) => console.error('rejected', error))
    }
    return (
        <div>
            <div>{match.params.id}</div>
            <ReactRouterDomLink to="/">
                <Button variant="outlined" component="span" startIcon={<ArrowBackIosIcon/>}>
                    Назад
                </Button>
            </ReactRouterDomLink>

            <h2>Новая запись</h2>
            <hr/>

            <br/>
            <br/>
            <FormProvider {...methods} >
                <Styled.Form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                    {/*React Hook Form контролирует DatePicker из Material UI, который в свою очередь рендерит TextField*/}
                    <Controller
                        name="alert_datetime"
                        rules={{required: true}}
                        control={methods.control}
                        render={({field: {value, onChange}}) =>
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                                <DateTimePicker
                                    openTo="year"
                                    mask="__.__.____ __:__"
                                    views={['year', 'month', 'day', 'hours', 'minutes']}
                                    value={value}
                                    minDateTime={new Date()}
                                    maxDate={getMaxDateCalendar(10)}
                                    onChange={(e) => onChange(e)}
                                    minutesStep={5}
                                    inputFormat="dd.MM.yyyy HH:mm"
                                    renderInput={({...params}) => {
                                        return (
                                            <ReactHookFormTextField
                                                {...params}
                                                name="alert_datetime"
                                                label="Когда поздравить?"
                                                inputProps={{
                                                    ...params.inputProps,
                                                    placeholder: 'dd/mm/yyyy hh:mm',
                                                    required: true,
                                                }}
                                            />
                                        )
                                    }}
                                />
                            </LocalizationProvider>
                        }
                    />

                    <ReactHookFormTextField
                        name="bday_name"
                        type="text"
                        label="Кого поздравить?"
                        required
                    />
                    <ReactHookFormTextField
                        name="comment"
                        type="text"
                        label="Комментарии"
                        multiline
                        rows={4}
                    />
                    <ReactHookFormCheckbox
                        name="notify_by_email"
                        label="Уведомить по e-mail"
                    />

                    <Button type="submit">Отправить</Button>
                </Styled.Form>
            </FormProvider>
            <Styled.Info>
                {isSuccess && <div>Данные успешно сохранены!</div>}
                {isLoading && <div>Сохраняем ....</div>}
                {isError && <div>Какая-то ошибка</div>}
            </Styled.Info>

        </div>
    )
}

// Types
type TParams = { id: string }

// Styled Components
const Styled = {
    Wrapper: styled("div")({
        textAlign: "center",
    }),
    Form: styled("form")({
        display: "flex",
        flexDirection: "column",
    }),
    Label: styled(FormControlLabel)({
        margin: "0 auto 10px",
    }),
    RegistrationLink: styled(Link)(({theme}) => ({
        margin: "15px 0",
        color: theme.palette.text.primary,
    })),
    Info: styled("div")({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 50,

    }),
}