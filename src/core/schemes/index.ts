import {bool, object, SchemaOf, string} from "yup"
import {LoginFormInputsTypes} from "../types"

export const loginValidationSchema: SchemaOf<LoginFormInputsTypes> = object().shape({
    email: string()
        .required("Обязательное поле")
        .max(100, 'Пароль должен быть меньше 100 символов')
        .email("Неверный формат эл. почты"),
    password: string()
        .required("Обязательное поле")
        .min(6, 'Пароль должен быть не менее 6 символов')
        .max(50, 'Пароль должен быть меньше 50 символов'),
    rememberMe: bool(),
})