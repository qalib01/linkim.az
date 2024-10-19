import { redirect } from "react-router";

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getAuthToken() {
    const token = localStorage.getItem('lToken');
    const tokenDuration = getTokenDuration();

    if (!token) {
        return null;
    }
    
    if (tokenDuration < 0) {
        return 'EXPIRED';
    }

    return token;
}



export function tokenLoader() {
    return getAuthToken();
}

export function checkUserLoginLoader(path) {
    const token = getAuthToken();

    if (token) {
        return redirect(`/p/${path}`)
    }

    return null;
}