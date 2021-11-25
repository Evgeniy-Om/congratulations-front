export type LoginRequest = {
    email: string
    password: string
}

export type RegistrationRequest = {
    email: string
    password: string
}

export type ResetPasswordEmailRequest = {
    email: string
}

export type ResetPasswordCompleteRequest = {
    password: string
    token: string
    uidb64: string
}

export type SupportEmailRequest = {
    email: string
    name: string
    body: string
}

export type RepeatEmailVerifyRequest = {
    email: string
}

export type AddCongratulationRequest = {
    bday_name: string
    alert_datetime: string
    notify_by_email: boolean | undefined
    comment: string | undefined
}

export type EditCongratulationRequest = {
    id: number
    bday_name: string
    alert_datetime: string
    notify_by_email: boolean | undefined
    comment: string | undefined
}