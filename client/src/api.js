const API_BASE = "http://localhost:5000/api";

export async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    let body = options.body;

    if (body && typeof body !== "string") {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(body);
    }

    const response = await fetch(
        `${API_BASE}${endpoint}`,
        {
            ...options,
            headers,
            body
        }
    );

    const text = await response.text();

    let data = {};

    try {
        data = text ? JSON.parse(text) : {};
    } catch {
        data = {};
    }

    if (!response.ok) {
        throw new Error(
            data.message || "Request failed"
        );
    }

    return data;
}

export function apiGet(endpoint) {
    return apiRequest(endpoint);
}

export function apiPost(endpoint, body) {
    return apiRequest(endpoint, {
        method: "POST",
        body
    });
}

export function apiPut(endpoint, body) {
    return apiRequest(endpoint, {
        method: "PUT",
        body
    });
}

export function apiDelete(endpoint) {
    return apiRequest(endpoint, {
        method: "DELETE"
    });
}