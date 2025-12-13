import { LoginRequest, SignupRequest, AuthResponse } from "@shared/api";

async function apiCall(
  endpoint: string,
  method: string,
  body?: unknown,
): Promise<AuthResponse> {
  try {
    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = (await response.json()) as AuthResponse;

    if (!response.ok) {
      console.error(`API error: ${response.status}`, data);
      return {
        success: false,
        message:
          data.message || `Request failed with status ${response.status}`,
      };
    }

    return data;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
}

export async function login(
  email: string,
  password: string,
): Promise<AuthResponse> {
  return apiCall("/login", "POST", {
    email,
    password,
  } as LoginRequest);
}

export async function signup(
  email: string,
  password: string,
  username: string,
): Promise<AuthResponse> {
  return apiCall("/signup", "POST", {
    email,
    password,
    username,
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

export function saveUsername(username: string): void {
  localStorage.setItem("username", username);
  const email = getEmail();
  if (email) {
    localStorage.setItem(`username_${email}`, username);
  }
}

export function getUsername(): string | null {
  const email = getEmail();
  if (email) {
    const userSpecificUsername = localStorage.getItem(`username_${email}`);
    if (userSpecificUsername) {
      return userSpecificUsername;
    }
  }
  return localStorage.getItem("username");
}

export function clearUsername(): void {
  localStorage.removeItem("username");
  const email = getEmail();
  if (email) {
    localStorage.removeItem(`username_${email}`);
  }
}

export function saveEmail(email: string): void {
  localStorage.setItem("email", email);
}

export function getEmail(): string | null {
  return localStorage.getItem("email");
}

export function clearEmail(): void {
  localStorage.removeItem("email");
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

export function saveProfilePicture(pictureUrl: string): void {
  const email = getEmail();
  if (email) {
    localStorage.setItem(`profile_picture_${email}`, pictureUrl);
  }
}

export function getProfilePicture(): string {
  const email = getEmail();
  if (email) {
    const picture = localStorage.getItem(`profile_picture_${email}`);
    if (picture) {
      return picture;
    }
  }
  return "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F92b137ad3047419da61c243feb037232?format=webp&width=800";
}

export function clearProfilePicture(): void {
  const email = getEmail();
  if (email) {
    localStorage.removeItem(`profile_picture_${email}`);
  }
}
