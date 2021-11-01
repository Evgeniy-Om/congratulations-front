import {bool, object, ref, SchemaOf, string} from "yup"
import {LoginFormInputs, NewCongratulationInputs, RegistrationFormInputs} from "./types/globalTypes"

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
        .max(100, 'Email должен быть не более 100 символов')
        .matches(/^(?<user>([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.?)+[a-z0-9]+)@(?<nameSite>([A-Z0-9]([A-Z0-9-]{0,61}[A-Z0-9])?\.)+)(?<topLevelDomain>[A-Z]{2,63})$/img, "Неверный формат эл. почты"),
    password: string()
        .required("Обязательное поле")
        .min(6, 'Пароль должен быть не менее 6 символов')
        .max(50, 'Пароль должен быть не более 50 символов'),
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
    comment: string(),
})