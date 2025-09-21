import { apiRequest, setAuthToken } from './client.js';

export async function login({ email, password }) {
	const data = await apiRequest('/auth/login', {
		method: 'POST',
		body: { email, password },
	});
	if (data?.token) setAuthToken(data.token);
	return data;
}

export async function register({ firstName, lastName, role, email, password }) {
  const data = await apiRequest('/auth/register', {
    method: 'POST',
    body: { firstName, lastName, role, email, password },
  });
  if (data?.token) setAuthToken(data.token);
  return data;
}

export function logout() {
	setAuthToken('');
}


