import { RequestHandler } from "express";
import { GoogleAuthRequest } from "@shared/api";
import { getUserByEmail, createUser } from "../lib/supabase";

interface GoogleTokenPayload {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  iat: number;
  exp: number;
}

// Simple JWT decoder (doesn't verify signature, just decodes)
// In production, you should verify the signature against Google's public keys
function decodeGoogleToken(token: string): GoogleTokenPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const decoded = JSON.parse(
      Buffer.from(parts[1], "base64").toString("utf-8"),
    ) as GoogleTokenPayload;

    // Basic validation - check if token has necessary fields
    if (!decoded.email || !decoded.aud) {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Error decoding Google token:", error);
    return null;
  }
}

function generateToken(userId: string): string {
  return Buffer.from(`${userId}:${Date.now()}`).toString("base64");
}

export const handleGoogleAuth: RequestHandler = async (req, res) => {
  try {
    const { token } = req.body as GoogleAuthRequest;

    if (!token) {
      res.status(400).json({
        success: false,
        message: "Google token is required",
      });
      return;
    }

    // Decode the Google token
    const payload = decodeGoogleToken(token);
    if (!payload) {
      res.status(400).json({
        success: false,
        message: "Invalid Google token",
      });
      return;
    }

    const { email } = payload;

    // Check if user exists
    let user = await getUserByEmail(email);

    if (!user) {
      // Create new user from Google account
      const newUser = await createUser(email, `google_${payload.sub}`);
      user = {
        id: newUser.id,
        email: newUser.email,
        password_hash: `google_${payload.sub}`,
      };
    }

    const authToken = generateToken(user.id);

    res.status(200).json({
      success: true,
      message: "Google login successful",
      token: authToken,
      user: {
        id: user.id,
        email: user.email,
        profile_image_url: (user as any).profile_image_url || undefined,
      },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};
