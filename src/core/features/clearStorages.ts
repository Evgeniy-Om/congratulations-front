function clearStorages () {
    localStorage.removeItem("access_token")
    localStorage.removeItem("exp_access")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("email")
    sessionStorage.removeItem("access_token")
    sessionStorage.removeItem("exp_access")
    sessionStorage.removeItem("email")
}

export default clearStorages