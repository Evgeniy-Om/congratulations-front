function getUidb64(pathname: string) {
    const uidb64 = pathname.match(/(?<=MQ\/).+(?=\/)/)
    if (uidb64 === null) return null
    return uidb64[0]
}

export default getUidb64