export type RegistrationFormInputs = {
    email: string
    password: string
    repeat: string
}

export type LoginFormInputs = {
    email: string
    password: string
    rememberMe: boolean | undefined
}

export type LoginRequest = {
    email: string
    password: string
}

export type LoginResponse = {
    Success: string,
    access_token: string
}
