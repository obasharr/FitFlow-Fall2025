import { LoginRequest, SignupRequest, AuthResponse } from "@shared/api";

const API_URL = "/.netlify/functions/api";

async function apiCall(
  endpoint: string,
  method: string,
  body?: unknown
): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = (await response.json()) as AuthResponse;

  if (!response.ok) {
    return {
      success: false,
      message: data.message || "Request failed",
    };
  }

  return data;
}

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  return apiCall("/login", "POST", {
    email,
    password,
  } as LoginRequest);
}

export async function signup(
  email: string,
  password: string
): Promise<AuthResponse> {
  return apiCall("/signup", "POST", {
    email,
    password,
  } as SignupRequest);
}

export function saveAuthToken(token: string): void {
  localStorage.setItem("auth_token", token);
}

export function getAuthToken(): string | null {
  return localStorage.getItem("auth_token");
}

export function clearAuthToken(): void {
  localStorage.removeItem("auth_token");
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
