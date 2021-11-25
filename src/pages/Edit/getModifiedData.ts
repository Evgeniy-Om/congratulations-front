import {CongratulationItem} from "../../core/types/globalTypes"

export default function getModifiedData(data: CongratulationItem, idEditableItem: number) {
    const notify_by_email = data.notify_by_email ?? false
    return {
        ...data,
        id: idEditableItem,
        alert_datetime: new Date(data.alert_datetime).toJSON(),
        notify_by_email: notify_by_email
    }
}