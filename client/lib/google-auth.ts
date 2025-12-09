import { GoogleAuthResponse } from "@shared/api";
import { saveAuthToken, saveEmail, saveUsername } from "./auth";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export function initializeGoogleSignIn(
  callback: (token: string) => void,
): void {
  // Load Google Sign-In library
  if (!document.getElementById("google-signin-script")) {
    const script = document.createElement("script");
    script.id = "google-signin-script";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response: any) => {
            if (response.credential) {
              callback(response.credential);
            }
          },
        });
      }
    };
    document.head.appendChild(script);
  }
}

export function renderGoogleSignInButton(containerId: string): void {
  if (window.google?.accounts?.id) {
    window.google.accounts.id.renderButton(
      document.getElementById(containerId),
      {
        theme: "outline",
        size: "large",
        width: "100%",
      },
    );
  }
}

export async function authenticateWithGoogle(
  token: string,
): Promise<GoogleAuthResponse> {
  try {
    const response = await fetch("/api/google-auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = (await response.json()) as GoogleAuthResponse;

    if (!response.ok) {
      console.error("Google auth error:", data);
      return {
        success: false,
        message: data.message || "Google authentication failed",
      };
    }

    if (data.success && data.token) {
      saveAuthToken(data.token);
      if (data.user?.email) {
        saveEmail(data.user.email);
      }
      if (data.user?.username) {
        saveUsername(data.user.username);
      }
    }

    return data;
  } catch (error) {
    console.error("Google auth request error:", error);
    return {
      success: false,
      message: "Failed to authenticate with Google",
    };
  }
}

// Type augmentation for window.google
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement | null, config: any) => void;
        };
      };
    };
  }
}
