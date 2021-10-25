export default function isActiveAccessToken () {
    if (sessionStorage.getItem("access_token")) {
        if (sessionStorage.getItem("exp_access")) {
            const today = new Date().getTime()
            const expirationDate: string = sessionStorage.getItem("exp_access")!
            const difference = new Date(expirationDate).getTime() - today
             if (difference > 3000) return true
        }
    }
    if (localStorage.getItem("access_token")) {
        if (localStorage.getItem("exp_access")) {
            const today = new Date().getTime()
            const expirationDate: string = localStorage.getItem("exp_access")!
            const difference = new Date(expirationDate).getTime() - today
            if (difference > 3000) return true
        }
    }
    return false
}