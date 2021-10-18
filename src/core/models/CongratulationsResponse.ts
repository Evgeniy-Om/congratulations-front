type CongratulationItem = {
    bday_name: string
    alert_datetime: string
    notify_by_email: boolean
    notify_by_push: boolean
    comment: string
}

export type CongratulationsResponse = {
    count: number
    next: string
    previous: string
    results: CongratulationItem[]
}