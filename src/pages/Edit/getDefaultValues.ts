import {getCongratulationsResponse} from "../../core/types/responseApiTypes"

export function getDefaultValues(editableItem: getCongratulationsResponse | undefined) {
    if (!editableItem) return {}
    return {
        alert_datetime: new Date(editableItem.alert_datetime),
        bday_name: editableItem.bday_name,
        comment: editableItem.comment,
        notify_by_email: editableItem.notify_by_email,
    }
}