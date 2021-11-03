export default function getRefreshToken() {
    const token = sessionStorage.getItem("refresh_token") ?? localStorage.getItem("refresh_token")
    if (token) {
        return {refresh: `${token}`}
    }
    return {}
}