import { RequestHandler } from "express";
import {
  SignupRequest,
  LoginRequest,
  AuthResponse,
  UpdateUsernameRequest,
  UpdateUsernameResponse,
  UpdateProfilePictureRequest,
  UpdateProfilePictureResponse,
} from "@shared/api";
import {
  createUser,
  getUserByEmail,
  updateUsername,
  updateProfilePictureUrl,
} from "../lib/supabase";

// Simple token generation (in production, use JWT)
function generateToken(userId: string): string {
  return Buffer.from(`${userId}:${Date.now()}`).toString("base64");
}

function hashPassword(password: string): string {
  // Simple hash for demo (in production, use bcrypt)
  return Buffer.from(password).toString("base64");
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export const handleSignup: RequestHandler = async (req, res) => {
  try {
    const { email, password, username } = req.body as SignupRequest;

    if (!email || !password || !username) {
      res.status(400).json({
        success: false,
        message: "Email, password, and username are required",
      } as AuthResponse);
      return;
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      } as AuthResponse);
      return;
    }

    // Create new user
    const passwordHash = hashPassword(password);
    const user = await createUser(email, passwordHash, username);

    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      message: "Welcome to FitFlow!",
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    } as AuthResponse);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Signup failed",
    } as AuthResponse);
  }
};

export const handleLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body as LoginRequest;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      } as AuthResponse);
      return;
    }

    // Get user from database
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      } as AuthResponse);
      return;
    }

    // Verify password
    if (!verifyPassword(password, user.password_hash)) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      } as AuthResponse);
      return;
    }

    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    } as AuthResponse);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
    } as AuthResponse);
  }
};

export const handleUpdateUsername: RequestHandler = async (req, res) => {
  try {
    const { email, newUsername } = req.body as UpdateUsernameRequest;

    if (!email || !newUsername) {
      res.status(400).json({
        success: false,
        message: "Email and new username are required",
      } as UpdateUsernameResponse);
      return;
    }

    const updatedUser = await updateUsername(email, newUsername);
    if (!updatedUser) {
      res.status(500).json({
        success: false,
        message: "Failed to update username",
      } as UpdateUsernameResponse);
      return;
    }

    res.status(200).json({
      success: true,
      message: "Username updated successfully",
    } as UpdateUsernameResponse);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update username";
    console.error("Update username error:", errorMessage);

    if (errorMessage === "Username already taken") {
      res.status(400).json({
        success: false,
        message: "Username already taken",
      } as UpdateUsernameResponse);
      return;
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
    } as UpdateUsernameResponse);
  }
};

export const handleUpdateProfilePicture: RequestHandler = async (req, res) => {
  try {
    const { email, imageData } = req.body as UpdateProfilePictureRequest;

    if (!email || !imageData) {
      res.status(400).json({
        success: false,
        message: "Email and image data are required",
      } as UpdateProfilePictureResponse);
      return;
    }

    // For now, store the base64 data directly as a data URL
    // In production, you might want to upload to a file storage service
    const updatedUser = await updateProfilePictureUrl(email, imageData);
    if (!updatedUser) {
      res.status(500).json({
        success: false,
        message: "Failed to update profile picture",
      } as UpdateProfilePictureResponse);
      return;
    }

    res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      imageUrl: updatedUser.profile_image_url,
    } as UpdateProfilePictureResponse);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update profile picture";
    console.error("Update profile picture error:", errorMessage);

    res.status(500).json({
      success: false,
      message: errorMessage,
    } as UpdateProfilePictureResponse);
  }
};
