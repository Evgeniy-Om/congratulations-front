export default function getDefaultDate () {
    const t = new Date()
    t.setMinutes(t.getMinutes() + 60)
    return t
}



