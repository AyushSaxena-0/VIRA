import { mockDashboard, mockInsights, mockSkillGap } from "@/lib/mocks";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function request(path, options = {}, retries = 2) {
  const token = localStorage.getItem("vira_token");

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
          ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...options.headers,
        },
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.detail || "Request failed");
      }

      return response.json();
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }
      await wait(500 * (attempt + 1));
    }
  }
}

export async function login(email, password) {
  try {
    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem("vira_token", data.access_token);
    return data;
  } catch {
    const fallback = {
      access_token: "demo-token",
      user: mockDashboard.user,
    };
    localStorage.setItem("vira_token", fallback.access_token);
    return fallback;
  }
}

export async function fetchDashboardData() {
  try {
    return await request("/dashboard-data");
  } catch {
    return mockDashboard;
  }
}

export async function fetchAiInsights() {
  try {
    return await request("/ai-insights");
  } catch {
    return mockInsights;
  }
}

export async function fetchSkillGap(role = "AI/ML Engineer") {
  try {
    return await request(`/skill-gap?role=${encodeURIComponent(role)}`);
  } catch {
    return mockSkillGap;
  }
}

export async function evaluateInterview(payload) {
  return request("/interview-evaluate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function analyzeResume(file) {
  const formData = new FormData();
  formData.append("file", file);
  return request("/analyze-resume", {
    method: "POST",
    body: formData,
  });
}
