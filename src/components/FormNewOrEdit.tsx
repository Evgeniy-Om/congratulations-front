import {Controller, useFormContext} from "react-hook-form"
import {DateTimePicker, LocalizationProvider} from "@mui/lab"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import ruLocale from "date-fns/locale/ru"
import {getMaxDateCalendar} from "../core/features/getMaxDateCalendar"
import TextField_ReactHookForm from "./TextField_ReactHookForm"
import ReactHookFormCheckbox from "./RHookFormCheckbox"
import {Button as MUIButton, FormControlLabel, styled} from "@mui/material"
import {Link} from "react-router-dom"

export default function FormNewOrEdit({page}: PropsTypes) {
    const {control, watch} = useFormContext()
    const watchNameFields = watch("bday_name")
    const watchCommentFields = watch("comment")
    return (
        <Styled.Wrapper>
            {/*React Hook Form контролирует DatePicker из Material UI, который в свою очередь рендерит TextField*/}
            <Controller
                name="alert_datetime"
                rules={{required: true}}
                control={control}
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
                                    <TextField_ReactHookForm
                                        {...params}
                                        name="alert_datetime"
                                        label="Когда поздравить?"
                                        inputProps={{
                                            ...params.inputProps,
                                            placeholder: 'дд.мм.гггг чч:мм',
                                        }}
                                        required
                                    />
                                )
                            }}
                        />
                    </LocalizationProvider>
                }
            />

            {/*<TextField {...register("comment")}/>*/}
            <TextField_ReactHookForm
                name="bday_name"
                type="text"
                label="Кого поздравить?"
                isWatch={true}
                // inputProps={{
                //     maxlength: 10
                // }}
                required
            />

            <TextField_ReactHookForm
                name="comment"
                type="text"
                label="Комментарии"
                isWatch={true}
                multiline
                rows={4}
            />
            <ReactHookFormCheckbox
                name="notify_by_email"
                label="Уведомить по e-mail"
            />

            <MUIButton type="submit" variant="contained">
                {page === "New" ? "Создать" : "Изменить"}
            </MUIButton>

        </Styled.Wrapper>
    )
}

// Types
type PropsTypes = {
    page: "New" | "Edit"
}

// Styled Components
const Styled = {
    Wrapper: styled("div")({
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
}