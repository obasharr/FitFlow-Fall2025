import { RequestHandler } from "express";
import { SignupRequest, LoginRequest, AuthResponse } from "@shared/api";
import { createUser, getUserByEmail } from "../lib/supabase";

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
    const { email, password } = req.body as SignupRequest;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
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
    const user = await createUser(email, passwordHash);

    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
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
