export default function getAccessToken() {
    const token = sessionStorage.getItem("access_token") ?? localStorage.getItem("access_token")
    if (token) {
        return {Authorization: `Bearer ${token}`}
    }
    return {}
}