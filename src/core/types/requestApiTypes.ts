export type LoginRequest = {
    email: string
    password: string
}

export type RegistrationRequest = {
    email: string
    password: string
}

export type AddCongratulationRequest = {
    bday_name: string
    alert_datetime: string
    notify_by_email: boolean | undefined
    comment: string | undefined
}