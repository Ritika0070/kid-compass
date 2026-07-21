const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || `Request failed (${res.status})`);
  }

  return data;
}

export const authApi = {
  signup: ({ name, email, password }) =>
    request("/signup", { method: "POST", body: JSON.stringify({ name, email, password }) }),

  login: ({ email, password }) =>
    request("/login", { method: "POST", body: JSON.stringify({ email, password }) }),
};

export const profileApi = {
  get: (token) =>
    request("/profile", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  save: (profile, token) =>
    request("/profile", {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(profile),
    }),
};

export function authHeader(token) {
  return { Authorization: `Bearer ${token}` };
}
