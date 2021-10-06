import $api from "../api";
import type {CongratulationsResponse} from "../models/CongratulationsResponse"

export default class CongratulationsService {
    static fetchBirthday() {
        return $api.get<CongratulationsResponse>('/congratulations')
    }
}