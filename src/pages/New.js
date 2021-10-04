import {useAppDispatch, useAppSelector} from "../core/hooks"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import {DatePicker, LocalizationProvider} from "@mui/lab"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import ruLocale from "date-fns/locale/ru"
import {addBirthdayItem, changeBirthdayItem} from "../core/store/birthdaySlice"
import {Button, TextField} from "@mui/material"
import {css} from "@emotion/css"
import {Link} from "react-router-dom"
import {Controller, useForm} from "react-hook-form"
import {LOGIN_FORM_DEFAULT_VALUES as DEFAULT_VALUES} from "../core/constants"


export default function New() {
    const {list, editId} = useAppSelector((state) => state.birthdays)
    let defValues = {date: null}
    if (editId) {
        defValues = list.find(item => item._id === editId)
        console.log(defValues)
    }
    const {register, handleSubmit, control} = useForm({
        defaultValues: defValues
    })
    const dispatch = useAppDispatch()

    const onSubmit = (data) => {
        dispatch(addBirthdayItem(data))
    }
    return (
        <div>
            <Link to="/" className={css({textDecoration: "none"})}>
                <Button variant="outlined" component="span" startIcon={<ArrowBackIosIcon/>}>
                    Назад
                </Button>
            </Link>

            <h2>Новая запись</h2>
            <hr/>

            <br/>
            <br/>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/*React Hook Form контролирует DatePicker из Material UI, который в свою очередь рендерит TextField*/}
                <Controller
                    name="date"
                    rules={{required: true}}
                    control={control}
                    render={({field: {value = "", onChange}}) =>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                            <DatePicker
                                disableFuture
                                label="Дата рождения *"
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


                <TextField {...register("name")} variant="outlined" placeholder="Имя именинника"/>
                <Button type="submit">Отправить</Button>
            </form>
        </div>
    )
}