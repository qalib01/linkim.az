export async function apiRequest({ url, method = 'GET', body, headers = {} }) {
    let defaultHeaders = { "Content-Type": "application/json", }
    let allHeaders = { ...defaultHeaders, ...headers }

    try {
        const req = await fetch(url, {
            method,
            headers: allHeaders,
            body: body ? JSON.stringify(body) : null,
        });

        let res = await req.json();
        return res;
    } catch (error) {
        console.error('API request error:', error.message);
        return {
            type: 'error',
            message: 'Texniki problem baş verdi. Zəhmət olmasa, daha sonra yenidən cəhd edin!'
        }
    }
}