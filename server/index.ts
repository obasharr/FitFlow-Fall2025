import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleSignup,
  handleLogin,
  handleUpdateUsername,
  handleUpdateProfilePicture,
} from "./routes/auth";
import { handleGoogleAuth } from "./routes/google-auth";
import favoritesRouter from "./routes/favorites";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Authentication routes
  app.post("/api/signup", handleSignup);
  app.post("/api/login", handleLogin);
  app.post("/api/google-auth", handleGoogleAuth);
  app.post("/api/update-username", handleUpdateUsername);
  app.post("/api/update-profile-picture", handleUpdateProfilePicture);

  // Favorites routes
  app.use("/api/favorites", favoritesRouter);

  return app;
}
