export type RegistrationFormInputs = {
    email: string
    password: string
    repeat: string
}

export type LoginFormInputs = {
    email: string
    password: string
    rememberMe: boolean | undefined
};