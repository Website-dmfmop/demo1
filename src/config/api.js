/**
 * Centralized API Configuration & Authenticated Fetch Helper
 * 
 * Supports both Localhost development and Production environments safely:
 * - Development: Falls back to http://localhost:5000 if VITE_API_URL is unset.
 * - Production:  Falls back to '' (empty string) so browser requests use same-origin
 *                relative paths (/api/..., /uploads/...) routed via Nginx reverse proxy.
 */

const rawApiUrl = import.meta.env.VITE_API_URL;
let baseApiUrl;

if (rawApiUrl && typeof rawApiUrl === 'string' && rawApiUrl.trim() !== '') {
    baseApiUrl = rawApiUrl.trim();
} else if (import.meta.env.DEV) {
    baseApiUrl = 'http://localhost:5000';
} else {
    baseApiUrl = '';
}

// Normalize trailing slash (e.g. 'http://localhost:5000/' -> 'http://localhost:5000')
export const API_URL = baseApiUrl.endsWith('/') ? baseApiUrl.slice(0, -1) : baseApiUrl;

/**
 * Retrieves the active administrator JWT from sessionStorage.
 * Storage key matches the verified existing login mechanism ('adminToken').
 */
export const getAuthToken = () => {
    try {
        return sessionStorage.getItem('adminToken');
    } catch {
        return null;
    }
};

/**
 * Generates headers containing the Authorization Bearer token if present.
 * Preserves any existing custom headers passed in.
 */
export const getAuthHeaders = (extraHeaders = {}) => {
    const token = getAuthToken();
    const headers = { ...extraHeaders };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

/**
 * Authenticated fetch helper for Admin operations.
 * - Attaches Authorization: Bearer <token> when token exists.
 * - Preserves existing custom headers.
 * - Supports GET, POST, PUT, DELETE, PATCH.
 * - Correctly handles FormData without forcing Content-Type: application/json.
 */
export const authFetch = async (url, options = {}) => {
    const token = getAuthToken();
    const headers = { ...(options.headers || {}) };

    if (token && !headers['Authorization'] && !headers['authorization']) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Crucial rule: When sending FormData, NEVER specify Content-Type header
    // so the browser automatically sets multipart/form-data with the correct boundary.
    if (options.body instanceof FormData) {
        delete headers['Content-Type'];
        delete headers['content-type'];
    }

    return fetch(url, {
        ...options,
        headers
    });
};
