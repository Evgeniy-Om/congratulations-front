import {Button, Checkbox} from "@mui/material"
import {useForm} from "react-hook-form"
import {SchemaOf, string, object, bool} from 'yup'
import {yupResolver} from "@hookform/resolvers/yup"
import {FC, useState} from "react"
import SocialsButtons from "../../components/SocialsButtons"
import * as Styled from "./styled"


interface IFormInputs {
    email: string
    password: string
    rememberMe: boolean | undefined
}

const DEFAULT_VALUES = {
    email: "demo@demo.com",
    password: "demo1234",
}

const schema: SchemaOf<IFormInputs> = object().shape({
    email: string()
        .required("Обязательное поле")
        .max(100, 'Пароль должен быть меньше 100 символов')
        .email("Неверный формат эл. почты"),
    password: string()
        .required("Обязательное поле")
        .min(6, 'Пароль должен быть не менее 6 символов')
        .max(50, 'Пароль должен быть меньше 50 символов'),
    rememberMe: bool()
})

const Login: FC = () => {
    const [error, setError] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm<IFormInputs>({
        mode: "onBlur",
        resolver: yupResolver(schema),
        defaultValues: DEFAULT_VALUES,
    })

    const onSubmit = (data: IFormInputs) => {
        setError(false) // Под вопросом нужно ли
        console.log(data)
        if (data.email !== DEFAULT_VALUES.email ||
            data.password !== DEFAULT_VALUES.password) {
            setError(true)
        }
    }
    return (
        <Styled.Wrapper>
            {error && <Styled.ErrorLoginOrPassword>Неверно указана почта или пароль</Styled.ErrorLoginOrPassword>}
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Styled.FormInner>
                    <Styled.Input
                        {...register("email")}
                        type="email"
                        variant="outlined"
                        label="Эл. почта"
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                        required
                    />
                    <Styled.Input
                        {...register("password")}
                        variant="outlined"
                        label="Пароль"
                        type="password"
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                        required
                    />
                    <Styled.Label
                        {...register("rememberMe")}
                        control={<Checkbox defaultChecked/>}
                        label="Запомнить меня"/>
                    <Button type="submit" variant="contained">Вход</Button>
                    <Styled.RegistrationLink to="/new">
                        Ещё не зарегистрированы?
                    </Styled.RegistrationLink>
                    <SocialsButtons/>
                </Styled.FormInner>
            </form>
        </Styled.Wrapper>
    )
}

export default Login