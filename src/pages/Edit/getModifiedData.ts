import {CongratulationItem} from "../../core/types/globalTypes"

export default function getModifiedData(data: CongratulationItem, idEditableItem: number) {
    return {
        ...data,
        id: idEditableItem,
        alert_datetime: new Date(data.alert_datetime).toJSON(),
    }
}