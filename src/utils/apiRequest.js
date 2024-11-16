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
        return {
            type: 'error',
            message: 'Texniki problem baş verdi. Zəhmət olmasa, daha sonra yenidən cəhd edin!',
        };
    };
};