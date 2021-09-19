import {useAppDispatch, useAppSelector} from "../store/hooks"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import {DatePicker, LocalizationProvider} from "@mui/lab"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import ruLocale from "date-fns/locale/ru"
import {changeBirthdayItem} from "../store/birthdaySlice"
import {Button, TextField} from "@mui/material"
import {css} from "@emotion/css"
import AddIcon from "@mui/icons-material/Add"
import {Link} from "react-router-dom"

function New() {
    const {name, date} = useAppSelector((state) => state.birthdays.list[0])
    const dispatch = useAppDispatch()
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
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                <DatePicker
                    disableFuture
                    label="Дата рождения *"
                    openTo="year"
                    mask="__.__.____"
                    views={['year', 'month', 'day']}
                    value={date}
                    onChange={(newValue) => {
                        dispatch(changeBirthdayItem(Number(newValue)))
                    }}
                    renderInput={({...params}) => (
                        <TextField
                            {...params}
                            inputProps={{...params.inputProps, placeholder: 'dd/mm/yyyy', required: true }}
                        />
                    )}
                />
            </LocalizationProvider>
        </div>
    )
}

export default New