import $api from "../api"
import type {AxiosResponse} from "axios"
import type {AuthResponse} from "../models/AuthResponse"

type Types = {
    email: string,
    password: string
}

export default class AuthService {
    static async login({email, password}: Types) {
        return $api.post<Types,AxiosResponse<AuthResponse>>('/login', {email, password})
    }
    static async registration({email, password}: Types) {
        return $api.post<Types,AxiosResponse<AuthResponse>>('/registration', {email, password})
    }
    static async logout() {
        return $api.post('/logout', )
    }
}