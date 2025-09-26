// src/api.js
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, { method = "GET", body, headers = {} } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // auto-logout on unauthorized
  if (res.status === 401) {
    localStorage.clear();
    // hard redirect to login
    window.location.href = "/";
    throw new Error("Unauthorized");
  }

  // try parse JSON
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { ok: res.ok, status: res.status, text };
  }
}

/* ===== Auth ===== */
export function apiLogin(email, password) {
  return request("/login", { method: "POST", body: { email, password } });
}

export function apiRegister(email, password, role = "reporter") {
  return request("/register", { method: "POST", body: { email, password, role } });
}

export function apiForgotPassword(email) {
  return request("/forgot-password", { method: "POST", body: { email } });
}

export function apiResetPassword(token, newPassword) {
  return request("/reset-password", { method: "POST", body: { token, newPassword } });
}

/* ===== Reports / Devices / Users ===== */
export function apiReportDevice({ imei, serial, description }) {
  return request("/report-device", { method: "POST", body: { imei, serial, description } });
}

export function apiGetReports() {
  return request("/reports");
}

export function apiGetUsers() {
  return request("/users");
}

export function apiGetDevices() {
  return request("/devices");
}

export function apiLocate(imei) {
  return request(`/device/${imei}/locate`);
}

export function apiRing(imei) {
  return request(`/device/${imei}/ring`, { method: "POST" });
}
