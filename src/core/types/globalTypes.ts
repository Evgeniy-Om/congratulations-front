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

export type NewCongratulationInputs = {
    bday_name: string
    alert_datetime: string | null
    notify_by_email: boolean | undefined
    comment: string | undefined
}

export type AuthStatus = "none" | "public" | "private"