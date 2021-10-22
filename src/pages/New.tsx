import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import {DatePicker, LocalizationProvider} from "@mui/lab"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import ruLocale from "date-fns/locale/ru"
import {Button, Checkbox as MUICheckbox, FormControlLabel, styled, TextField} from "@mui/material"
import {Controller, useForm} from "react-hook-form"
import ReactRouterDomLink from "../components/ReactRouterDomLink"
import {NewCongratulationInputs} from "../core/global-types"
import {useAddCongratulationMutation} from "../core/api/services/congratulations"
import {Link} from "react-router-dom"
import {yupResolver} from "@hookform/resolvers/yup"
import {loginValidationSchema, NewCongratulationValidationSchema} from "../core/yupValidastionSchemes"

export type SubmitPropsType = {
    name: string
    date: number
    isCheckedEmail: boolean
}

export default function New() {
    const [addCongratulation, {isSuccess, isLoading, isError}] = useAddCongratulationMutation()
    const {register, handleSubmit, control} = useForm<NewCongratulationInputs>({
        mode: "onTouched",
        // resolver: yupResolver(NewCongratulationValidationSchema),
        defaultValues: {alert_datetime: null}
    })

    const onSubmit = (data: NewCongratulationInputs) => {
        addCongratulation(data)
            .unwrap()
            .then((payload) => {
                console.log(payload)
            })
            .catch((error) => console.error('rejected', error))
    }
    return (
        <div>
            <ReactRouterDomLink to="/">
                <Button variant="outlined" component="span" startIcon={<ArrowBackIosIcon/>}>
                    Назад
                </Button>
            </ReactRouterDomLink>

            <h2>Новая запись</h2>
            <hr/>

            <br/>
            <br/>
            <Styled.Form noValidate onSubmit={handleSubmit(onSubmit)}>
                {/*React Hook Form контролирует DatePicker из Material UI, который в свою очередь рендерит TextField*/}
                <Controller
                    name="alert_datetime"
                    rules={{required: true}}
                    control={control}
                    render={({field: {value = "", onChange}}) =>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                            <DatePicker
                                disableFuture
                                label="Когда поздравить?"
                                openTo="year"
                                mask="__.__.____"
                                views={['year', 'month', 'day']}
                                value={value}
                                onChange={(e) => onChange(e)}
                                renderInput={({...params}) => {
                                    return (
                                    <TextField
                                        {...params}
                                        inputProps={{...params.inputProps, placeholder: 'dd/mm/yyyy', required: true}}
                                    />
                                )}}
                            />
                        </LocalizationProvider>
                    }
                />
                <TextField
                    {...register("bday_name")}
                    variant="outlined"
                    placeholder="Кого поздравить?"/>
                <Styled.Label
                    control={<MUICheckbox {...register("notify_by_email")} defaultChecked/>}
                    label="Уведомить по e-mail"/>
                <Styled.Label
                    control={<MUICheckbox {...register("notify_by_push")} disabled/>}
                    label="Отправить push-уведомление"/>
                <Button type="submit">Отправить</Button>
            </Styled.Form>
            <Styled.Info>
                {isSuccess && <div>Данные успешно сохранены!</div>}
                {isLoading && <div>Сохраняем ....</div>}
                {isError && <div>Автоматическую авторизацию на этой странице ещё не настроил. Залогинься</div>}
            </Styled.Info>

        </div>
    )
}

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
