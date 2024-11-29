import errorMessages from "../statusMessages/error";

export async function apiRequest({ url, method = 'GET', body, headers }) {
    try {
        const res = await fetch(url, {
            method,
            headers,
            body: body ? (headers ? JSON.stringify(body) : body) : null,
            credentials: 'include'
        });

        let data = await res.json();
        return {
            status: res.status,
            data
        };
    } catch (error) {
        console.error('API request error:', error.message);
        return errorMessages.GENERAL_ERROR;
    };
};