const BASE_URL = 'http://localhost:3000/api/v1';

export const apiFetch = async (endpoint, method = 'GET', body = null, token = null) => {
    const url = `${BASE_URL}${endpoint}`;
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(url, options);

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorData.message}`);
    }

    return res.json();
};