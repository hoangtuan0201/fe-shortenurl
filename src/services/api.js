// src/services/api.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "https://be-shortenurl.onrender.com";

const api = axios.create({
    baseURL: `${API_BASE}/api`,
    timeout: 15000,
    headers: { "Content-Type": "application/json" }
});

// optional: cleaner error messages
api.interceptors.response.use(
    r => r,
    err => {
        const res = err.response;
        const msg =
            res?.data?.message ||
            res?.data?.error ||
            res?.statusText ||
            err.message ||
            "Network error";
        return Promise.reject({ status: res?.status, message: msg });
    }
);

// Create short link
export async function shortenUrl(longUrl) {
    const r = await api.post("/ShortUrl", { originalUrl: longUrl }); // <-- match casing
    return r.data;
}

// Admin list (open route on BE: GET /api/ShortUrl/all)
export async function getAdminUrls(page = 1, pageSize = 20) {
    const r = await api.get("/ShortUrl/all", { params: { page, pageSize } });
    const total = Number(r.headers["x-total-count"] || 0);
    return { items: r.data, total, page, pageSize };
}

export default api;
