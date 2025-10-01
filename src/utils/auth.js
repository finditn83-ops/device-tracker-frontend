// Get token from storage
export function getToken() {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
}

// Get user role from storage
export function getRole() {
  return localStorage.getItem("role") || sessionStorage.getItem("role");
}

// Save token & role
export function saveAuth(token, role, remember = true) {
  if (remember) {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  } else {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", role);
  }
}

// Clear token & role
export function clearAuth() {
  localStorage.clear();
  sessionStorage.clear();
}

// Check if JWT expired
export function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // decode JWT payload
    const now = Date.now() / 1000; // current time in seconds
    return payload.exp < now;
  } catch (err) {
    return true; // invalid token = treat as expired
  }
}
