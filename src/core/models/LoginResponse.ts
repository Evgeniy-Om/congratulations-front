export type LoginResponse = {
    email: string
    tokens: {
        access: string
        refresh: string
    }
}