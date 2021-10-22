import {bool, object, ref, SchemaOf, string} from "yup"
import {LoginFormInputs, NewCongratulationInputs, RegistrationFormInputs} from "./global-types"

export const loginValidationSchema: SchemaOf<LoginFormInputs> = object().shape({
    email: string()
        .required("Обязательное поле")
        .email("Неверный формат эл. почты"),
    password: string()
        .required("Обязательное поле"),
    rememberMe: bool(),
})


export const registrationValidationSchema: SchemaOf<RegistrationFormInputs> = object().shape({
    email: string()
        .required("Обязательное поле")
        .max(100, 'Email должен быть меньше 100 символов')
        .matches(/^\w([\w\-.])+\w@([\w\-.])+\.[a-zA-Z]+$/, "Неверный формат эл. почты"),
    password: string()
        .required("Обязательное поле")
        .min(6, 'Пароль должен быть не менее 6 символов')
        .max(50, 'Пароль должен быть меньше 50 символов'),
    repeat: string()
        .required("Обязательное поле")
        .oneOf([ref('password'), null], 'Пароль не совпадает'),
})

export const NewCongratulationValidationSchema: SchemaOf<NewCongratulationInputs> = object().shape({
    bday_name: string()
        .required("Обязательное поле"),
    alert_datetime: string()
        .required("Обязательное поле"),
    notify_by_email: bool(),
    notify_by_push: bool(),
    comment: string(),
})