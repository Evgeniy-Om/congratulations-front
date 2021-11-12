function clearStorages () {
    localStorage.removeItem("access_token")
    localStorage.removeItem("exp_access")
    localStorage.removeItem("refresh_token")
    sessionStorage.removeItem("access_token")
    sessionStorage.removeItem("exp_access")
}

export default clearStorages