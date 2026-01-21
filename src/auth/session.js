const TOKEN_KEY = "aurum.accessToken";

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return Boolean(getAccessToken());
}

// útil para tests o futuro login real
export function setAccessToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
}
