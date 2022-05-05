export function getToken() {
    if (typeof (localStorage.token) !== "undefined") {
        return localStorage.token;
    }
    else if (typeof (sessionStorage.token) !== "undefined") {
        return sessionStorage.token;
    }
    return false;
}

export function deleteToken() {
    localStorage.clear();
    sessionStorage.clear();
}