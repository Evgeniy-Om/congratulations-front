export type getCongratulationsResponse = {
    id: number
    bday_name: string
    alert_datetime: string
    notify_by_email: boolean
    notify_by_push: boolean
    comment: string
}

export type LoginResponse = {
    email: string
    tokens: {
        access: string
        refresh: string
    }
}

export type RefreshResponse = {
    access: string
}