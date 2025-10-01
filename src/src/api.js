const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function register(user) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  return res.json();
}

export async function login(credentials) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });
  return res.json();
}

export async function trackDevice(data, token) {
  const res = await fetch(`${BASE_URL}/track-device`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getDevice(imei, token) {
  const res = await fetch(`${BASE_URL}/device/${imei}`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  return res.json();
}

export async function locateDevice(imei, token) {
  const res = await fetch(`${BASE_URL}/device/${imei}/locate`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  return res.json();
}

export async function ringDevice(imei, token) {
  const res = await fetch(`${BASE_URL}/device/${imei}/ring`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` }
  });
  return res.json();
}

export async function resetPassword(data, token) {
  const res = await fetch(`${BASE_URL}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}
