import {bool, object, ref, SchemaOf, string} from "yup"
import {LoginFormInputs, RegistrationFormInputs} from "./global-types"

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
        .email("Неверный формат эл. почты"),
    password: string()
        .required("Обязательное поле")
        .min(6, 'Пароль должен быть не менее 6 символов')
        .max(50, 'Пароль должен быть меньше 50 символов'),
    repeat: string()
        .required("Обязательное поле")
        .oneOf([ref('password'), null], 'Пароль не совпадает'),
})