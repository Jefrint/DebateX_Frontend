const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "";

const defaultHeaders = {
  "Content-Type": "application/json",
};

function getAuthHeaders() {
  if (typeof window === "undefined") {
    return {};
  }

  const token = window.localStorage.getItem("debatex_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function buildUrl(path) {
  if (!path) {
    throw new Error("API endpoint is not configured.");
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function apiRequest(path, options = {}) {
  const url = buildUrl(path);
  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload !== null
        ? payload.message || payload.error || "Request failed"
        : payload || "Request failed";

    throw new Error(message);
  }

  return payload;
}

export function getConfiguredEndpoint(name, fallback = "") {
  const value = import.meta.env[name];
  return value || fallback;
}
