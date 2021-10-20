export type addCongratulationRequest = {
    bday_name: string
    alert_datetime: string
    notify_by_email: boolean
    notify_by_push: boolean
    comment: string
}

export type LoginRequest = {
    email: string
    password: string
}