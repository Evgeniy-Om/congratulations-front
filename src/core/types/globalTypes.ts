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

export type CongratulationItem = {
    bday_name: string
    alert_datetime: Date
    notify_by_email: boolean | undefined
    comment: string | undefined
}

export type ChangePasswordFormInputs = {
    password: string
    repeat: string
}

export type SupportFormInputs = {
    name: string
    email: string
    comment: string | undefined
}

export type AuthStatus = "none" | "public" | "private"