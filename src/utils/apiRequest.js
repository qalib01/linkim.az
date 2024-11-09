export async function apiRequest({ url, method = 'GET', body, headers = {} }) {
    let defaultHeaders = { "Content-Type": "application/json", }
    let allHeaders = { ...defaultHeaders, ...headers }

    try {
        const res = await fetch(url, {
            method,
            headers: allHeaders,
            body: body ? JSON.stringify(body) : null,
            credentials: 'include'
        });

        let data = await res.json();
        return {
            status: res.status,
            data
        };
    } catch (error) {
        console.error('API request error:', error.message);
        return {
            type: 'error',
            message: 'Texniki problem baş verdi. Zəhmət olmasa, daha sonra yenidən cəhd edin!',
        };
    };
};