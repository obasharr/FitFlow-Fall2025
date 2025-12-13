/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Authentication request/response types
 */
export interface SignupRequest {
  email: string;
  password: string;
  username: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    username?: string;
  };
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}

/**
 * Google OAuth request/response types
 */
export interface GoogleAuthRequest {
  token: string;
}

export interface GoogleAuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
  };
}

export interface UpdateUsernameRequest {
  email: string;
  newUsername: string;
}

export interface UpdateUsernameResponse {
  success: boolean;
  message: string;
}

export interface UpdateProfilePictureRequest {
  email: string;
  imageData: string;
}

export interface UpdateProfilePictureResponse {
  success: boolean;
  message: string;
  imageUrl?: string;
}
