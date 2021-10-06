import {CongratulationItem} from "./CongratulationItem"

export type CongratulationsResponse = {
    count: number
    next: string
    previous: string
    results: CongratulationItem[]
}