import {Controller, useFormContext} from "react-hook-form"
import {DateTimePicker, LocalizationProvider} from "@mui/lab"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import ruLocale from "date-fns/locale/ru"
import {getMaxDateCalendar} from "../../core/features/getMaxDateCalendar"
import TextField from "../TextField"
import {
    Button as MUIButton,
    Checkbox as MUICheckbox,
    FormControlLabel,
    styled,
    Tooltip,
} from "@mui/material"
import {Link} from "react-router-dom"
import CommentInput from "./CommentInput"
import NameInput from "./NameInput"
import MUIHelpOutlineIcon from '@mui/icons-material/HelpOutline'
import {useAppSelector, useIsEmailVerify} from "../../core/hooks"

export default function FormCongratulation({page}: PropsTypes) {
    const {register, control} = useFormContext()
    const {isEmailVerify} = useAppSelector((state) => state.congratulations)
    useIsEmailVerify()
    return (
        <_.Wrapper>
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
                                    <TextField
                                        {...params}
                                        name="alert_datetime"
                                        label="Когда поздравить?"
                                        datePlaceholder="дд.мм.гггг чч:мм"
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

            <NameInput/>
            <CommentInput/>
            <_.EmailCheckbox>
                {
                    !isEmailVerify &&
                    <>
                        <_.Label
                            {...register("notify_by_email")}
                            control={<MUICheckbox/>}
                            label={"Уведомить по e-mail"}
                            disabled={true}
                        />
                        <Tooltip
                            title="Подтвердите емейл, перейдя по ссылке из письма в вашем почтовом ящике. Если вы не получили письмо: 1. проверьте папку Спам, 2. либо повторно отправьте ссылку из личного кабинета сайта"
                            placement="bottom">
                            <MUIHelpOutlineIcon color="primary"/>
                        </Tooltip>
                    </>
                }
                {
                    isEmailVerify &&
                    <_.Label
                        {...register("notify_by_email")}
                        control={<MUICheckbox/>}
                        label={"Уведомить по e-mail"}
                    />
                }
            </_.EmailCheckbox>


            <MUIButton type="submit" variant="contained">
                {page === "New" ? "Создать" : "Изменить"}
            </MUIButton>

        </_.Wrapper>
    )
}

// Types
type PropsTypes = {
    page: "New" | "Edit"
}

// _ Components
const _ = {
    Wrapper: styled("div")({
        display: "flex",
        flexDirection: "column",
    }),
    Label: styled(FormControlLabel)({
        marginRight: 10,
    }),
    RegistrationLink: styled(Link)(({theme}) => ({
        margin: "15px 0",
        color: theme.palette.text.primary,
    })),
    EmailCheckbox: styled("div")({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    }),
}