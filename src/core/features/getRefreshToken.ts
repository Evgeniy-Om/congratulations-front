export default function getRefreshToken() {
    const token = localStorage.getItem("refresh_token")
    if (token) {
        return {refresh: `${token}`}
    }
    return {}
}