import $api from "../api";
import type {CongratulationsResponse} from "../models/CongratulationsResponse"

export default class CongratulationsService {
    static fetchCongratulations() {
        return $api.get<CongratulationsResponse>('/congratulations')
    }
}