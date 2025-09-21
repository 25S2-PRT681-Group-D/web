// Lightweight API client with token handling

const DEFAULT_BASE_URL = import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:5010/api';

let authToken = null;

export function setAuthToken(token) {
	authToken = token;
	try {
		localStorage.setItem('agroscan_token', token || '');
	} catch (_) {
		// ignore
	}
}

export function loadAuthTokenFromStorage() {
	try {
		const saved = localStorage.getItem('agroscan_token');
		if (saved) authToken = saved;
	} catch (_) {
		// ignore
	}
}

export async function apiRequest(path, { method = 'GET', headers = {}, body, isFormData = false, baseUrl = DEFAULT_BASE_URL } = {}) {
	const url = path.startsWith('http') ? path : `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
	const finalHeaders = new Headers(headers);
	if (authToken) {
		finalHeaders.set('Authorization', `Bearer ${authToken}`);
	}
	if (!isFormData) {
		finalHeaders.set('Content-Type', 'application/json');
	}

	const response = await fetch(url, {
		method,
		headers: finalHeaders,
		body: isFormData ? body : body ? JSON.stringify(body) : undefined,
	});

	if (!response.ok) {
		let errorMessage = `Request failed with ${response.status}`;
		try {
			const txt = await response.text();
			errorMessage = txt || errorMessage;
		} catch (_) {}
		throw new Error(errorMessage);
	}

	const contentType = response.headers.get('content-type') || '';
	if (contentType.includes('application/json')) {
		return await response.json();
	}
	return await response.text();
}

// Initialize token at module load
loadAuthTokenFromStorage();

export default {
	apiRequest,
	setAuthToken,
	loadAuthTokenFromStorage,
};


