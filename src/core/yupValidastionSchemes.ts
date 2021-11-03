import {bool, object, ref, SchemaOf, string, date} from "yup"
import {LoginFormInputs, NewCongratulationInputs, RegistrationFormInputs} from "./types/globalTypes"
import parseDateString from "./features/parseDateString"

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
        .matches(/^(?<user>([a-z0-9]([\w-]{0,61}[a-z0-9])?\.?)+[a-z0-9]+)@/img, "Неверный формат имени пользователя")
        .matches(/@(?<nameSite>([a-z0-9]([\w-]{0,61}[a-z0-9])?\.)+|([а-я0-9]([а-я0-9_-]{0,61}[а-я0-9])?\.)+)(?<topLevelDomain>[a-z]{2,63}|[а-я]{2,63})$/img, "Неверный формат домена"),
    password: string()
        .required("Обязательное поле")
        .min(6, 'Пароль должен быть не менее 6 символов')
        .max(50, 'Пароль должен быть не более 50 символов')
        .matches(/^\S.*/, "Пароль не может начинаться с пробела")
        .matches(/.*\S$/, "Пароль не может заканчиваться пробелом"),
    repeat: string()
        .required("Обязательное поле")
        .oneOf([ref('password'), null], 'Пароль не совпадает'),
})

export const NewCongratulationValidationSchema: SchemaOf<NewCongratulationInputs> = object().shape({
    bday_name: string()
        .required("Обязательное поле"),
    alert_datetime: date()
        .transform(parseDateString)
        .nullable()
        .typeError("Неверный формат даты")
        .required("Обязательное поле")
        .min(new Date(),"Дата поздравления должна быть в будущем"),
    notify_by_email: bool(),
    comment: string(),
})