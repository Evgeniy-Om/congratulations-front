import {isDate} from "date-fns"

// Валидация даты проходит в формате MM-dd-yyyy hh:mm, а input отдаёт в русской локали dd-MM-yyyy hh:mm
// В результате требуется поменять местами дни и месяцы.
// После этого делается повторная валидация Date. При этом проверяется существует ли реально такая дата.
// Чтобы не получилость, что несуществующая дата 31.11.2021 равна 01.12.2021. Если такое происходит, то выдаём ошибку
export default function parseDateString(value: any, originalValue: unknown) {
    if (typeof originalValue === "object") return originalValue
    if (typeof originalValue === "string") {
        const splitDate = originalValue.split(/[.\s]/)
        const resultDate = new Date(`${splitDate[1]}.${splitDate[0]}.${splitDate[2]} ${splitDate[3]}`)
        // console.log(splitDate)
        // console.log(resultDate)
        // console.log(new Date(resultDate).getDate() === Number(splitDate[0]))
        if (isDate(new Date(resultDate)) && resultDate.getDate() === Number(splitDate[0])) {
            return resultDate
        }
    }
    return ""
}