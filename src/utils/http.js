export async function fetchFaqs() {
    const res = await fetch('http://localhost:1007/faqs');
    const data = await res.json();

    if (!res.ok) {
        throw new Error('Failed to fetch places!')
    }

    return data;
}
export async function fetchTeam() {
    const res = await fetch('http://localhost:1007/team');
    const data = await res.json();

    if (!res.ok) {
        throw new Error('Failed to fetch places!')
    }

    return data;
}