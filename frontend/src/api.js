import { MockSocket, handleMockRequest } from "./mock";

export const API_URL = "http://127.0.0.1:8000";
export const WS_URL = "ws://127.0.0.1:8000";  // websocket farkli sema kullaniyor

// portfolio sitesinde backend calismiyor, sahte veriyle gosteriyoruz
export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

// profil fotosu / mesaj gorseli adresi: demo'da hazir url, gercekte API_URL onunde
export function mediaUrl(path) {
    if (!path) return null;
    if (DEMO_MODE) return path;

    return `${API_URL}${path}`;
}

export function apiFetch(path, method = "GET", body = null) {
    if (DEMO_MODE) {
        return handleMockRequest(path, method, body);
    }

    const token = localStorage.getItem("token");

    const headers = {};

    if (token) {
        headers.Authorization = `Token ${token}`;
    }

    if (method === "POST") {
        headers["Content-Type"] = "application/json";

        return fetch(`${API_URL}${path}`, {
            method,
            headers,
            body: JSON.stringify(body)
        });
    }

    return fetch(`${API_URL}${path}`, {
        method,
        headers
    });
}

// sohbet acilinca cagriliyor: demo'da sahte soket, gercekte gercek websocket
export function createChatSocket(chatId) {
    if (DEMO_MODE) {
        return new MockSocket(chatId);
    }

    const token = localStorage.getItem("token");
    return new WebSocket(`${WS_URL}/ws/chat/${chatId}/${token}/`);
}
