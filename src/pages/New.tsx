import {useAppDispatch, useAppSelector} from "../core/hooks"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import {DatePicker, LocalizationProvider} from "@mui/lab"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import ruLocale from "date-fns/locale/ru"
import {addBirthdayItem, changeBirthdayItem} from "../core/store/birthdaySlice"
import {Button, Checkbox as MUICheckbox, FormControlLabel, styled, TextField} from "@mui/material"
import {css} from "@emotion/css"
import {Controller, useForm} from "react-hook-form"
import ReactRouterDomLink from "../components/ReactRouterDomLink"
import {Link} from "react-router-dom"
import {NewCongratulationInputs} from "../core/global-types"

export type SubmitPropsType = {
    name: string
    date: number
    isCheckedEmail: boolean
}

export default function New() {
    // const {list, editId} = useAppSelector((state) => state.birthdays)

    const {register, handleSubmit, control} = useForm<NewCongratulationInputs>({
        // defaultValues: editId ? list.find(item => item._id === editId) : {date: null}
        defaultValues: {alert_datetime: null}
    })
    // const dispatch = useAppDispatch()

    const onSubmit = (data: NewCongratulationInputs) => {
        // dispatch(addBirthdayItem(data))
        console.log(data)
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <TextField {...register("bday_name")} variant="outlined" placeholder="Кого поздравить?"/>
                <Styled.Label
                    control={<MUICheckbox {...register("notify_by_email")} defaultChecked/>}
                    label="Уведомить по e-mail"/>
                <Styled.Label
                    control={<MUICheckbox {...register("notify_by_push")} disabled/>}
                    label="Отправить push-уведомление"/>
                <Button type="submit">Отправить</Button>
            </form>
        </div>
    )
}

// Styled Components
const Styled = {
    Label: styled(FormControlLabel)({
        margin: "0 auto 10px",
    }),
}
