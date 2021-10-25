// import {Controller, useForm} from "react-hook-form"
// import {DatePicker, LocalizationProvider} from "@mui/lab"
// import AdapterDateFns from "@mui/lab/AdapterDateFns"
// import ruLocale from "date-fns/locale/ru"
// import {useAppDispatch, useAppSelector} from "../core/hooks"
// import {TextField} from "@mui/material"
// import { changeBirthdayItem } from "../core/store/congratulationsSlice"
// import {FC, useEffect, useState} from "react"
//
//
// function Edit () {
//     const {control, handleSubmit, formState: {errors}} = useForm()
//     const [disabled, setDisabled] = useState(true)
//     const onSubmit = (data: any) => {
//         console.log(data)
//     }
//
//     useEffect(() => {
//         errors ? setDisabled(true) : setDisabled(false)
//         console.log(errors)
//     },[errors])
//
//     const {name, date} = useAppSelector((state) => state.birthdays.list[0])
//     const dispatch = useAppDispatch()
//
//     return (
//         <form onSubmit={handleSubmit(onSubmit)} autoComplete='on'>
//             <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
//                 <DatePicker
//                     disableFuture
//                     label="Дата рождения *"
//                     openTo="year"
//                     mask="__.__.____"
//                     views={['year', 'month', 'day']}
//                     value={date}
//                     onChange={(newValue) => {
//                         dispatch(changeBirthdayItem(Number(newValue)))
//                     }}
//                     renderInput={({...params}) => {
//                         console.log(params)
//                         return (
//                             <TextField
//                                 {...params}
//                                 inputProps={{
//                                     ...params.inputProps,
//                                     placeholder: 'dd/mm/yyyy',
//                                     required: true,
//                                 }}
//                                 helperText="Please enter your name"
//                             />
//                         )
//                     }}
//                 />
//             </LocalizationProvider>
//             <input type="submit" disabled={disabled}/>
//         </form>
//     )
// }
//
// export default Edit