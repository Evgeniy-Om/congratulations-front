import {NewCongratulationInputs} from "./globalTypes"

export type addCongratulationRequest = NewCongratulationInputs

export type LoginRequest = {
    email: string
    password: string
}

export type RegistrationRequest = {
    email: string
    password: string
}