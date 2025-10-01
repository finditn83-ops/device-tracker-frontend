import axios from "axios";

// =====================
// API CONFIG
// =====================

// ✅ Backend base URL (Netlify ENV → fallback localhost for dev)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

// ✅ Automatically attach JWT if available
API.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem("auth")) || null;
  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

// =====================
// AUTH
// =====================

// Frontend: /auth/login → Backend: /auth/login
export const login = async (email, password, username) => {
  const res = await API.post("/auth/login", { email, username, password });
  return res.data;
};

// Frontend: /register → Backend: /auth/register
export const register = async (username, email, password, role) => {
  const res = await API.post("/auth/register", { username, email, password, role });
  return res.data;
};

// =====================
// ADMIN + RESET FLOW
// =====================

// ✅ Step 1: Request reset link
export const requestPasswordReset = async (targetEmail) => {
  const res = await API.post("/reset-password", { targetEmail });
  return res.data;
};

// ✅ Step 2: Complete reset
export const resetPassword = async (token, newPassword) => {
  const res = await API.post("/reset-password", { token, newPassword });
  return res.data;
};

// =====================
// REPORTER
// =====================

// Frontend: /reporter/track → Backend: /track-device
export const trackDevice = async (deviceData) => {
  const res = await API.post("/track-device", deviceData);
  return res.data;
};

// Frontend: /reporter/locate/:id → Backend: /device/:imei/locate
export const locateDevice = async (imei) => {
  const res = await API.get(`/device/${imei}/locate`);
  return res.data;
};

// Frontend: /reporter/ring → Backend: /device/:imei/ring
export const ringDevice = async (imei) => {
  const res = await API.post(`/device/${imei}/ring`, {});
  return res.data;
};

// =====================
// POLICE
// =====================

// Frontend: /police/device/:id → Backend: /device/:imei
export const getDevice = async (imei) => {
  const res = await API.get(`/device/${imei}`);
  return res.data;
};

// =====================
// EXPORT DEFAULT
// =====================
export default API;
