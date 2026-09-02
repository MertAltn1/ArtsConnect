const API_URL = "http://127.0.0.1:8000";

export function apiFetch(path, method = "GET", body = null) {
    const token = localStorage.getItem("token");

    const headers = {};

    if (token) {
        headers.Authorization = `Token ${token}`;
    }

    if (method === "GET") {
        return fetch(`${API_URL}${path}`, {
            method,
            headers
        });
    }

    if (method === "POST") {
        headers["Content-Type"] = "application/json";

        return fetch(`${API_URL}${path}`, {
            method,
            headers,
            body: JSON.stringify(body)
        });
    }
}
