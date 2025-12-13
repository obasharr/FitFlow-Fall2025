import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  login,
  signup,
  saveAuthToken,
  saveUsername,
  saveEmail,
  saveProfilePicture,
  getProfilePicture,
} from "@/lib/auth";
import {
  initializeGoogleSignIn,
  authenticateWithGoogle,
} from "@/lib/google-auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Google Sign-In
    initializeGoogleSignIn(async (token: string) => {
      await handleGoogleSignIn(token);
    });

    // Render Google button after script loads
    const checkGoogleLoaded = setInterval(() => {
      const buttonContainer = document.getElementById("google-signin-button");
      if (window.google?.accounts?.id && buttonContainer) {
        window.google.accounts.id.renderButton(buttonContainer, {
          theme: "outline",
          size: "large",
          width: "100%",
          text: "signin_with",
        });
        clearInterval(checkGoogleLoaded);
      }
    }, 100);

    return () => clearInterval(checkGoogleLoaded);
  }, []);

  const handleGoogleSignIn = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await authenticateWithGoogle(token);

      if (response.success) {
        toast.success("Logged in with Google");
        navigate("/dashboard");
      } else {
        toast.error(response.message || "Google authentication failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Google auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = isSignup
        ? await signup(email, password, username)
        : await login(email, password);

      if (response.success && response.token) {
        saveAuthToken(response.token);
        if (response.user?.username) {
          saveUsername(response.user.username);
        }
        if (response.user?.email) {
          saveEmail(response.user.email);
        }
        if (isSignup) {
          // Set default profile picture for new accounts
          saveProfilePicture(getProfilePicture());
        }
        toast.success(response.message);
        navigate("/dashboard");
      } else {
        toast.error(response.message || "Authentication failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF2E9] flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 w-full max-w-full">
        {/* Logo */}
        <div className="mb-12">
          <h1 className="font-display text-5xl font-normal text-black tracking-tight">
            FitFlow
          </h1>
        </div>

        {/* Form container */}
        <div className="w-full max-w-sm">
          {/* Log In / Sign Up heading */}
          <h2 className="text-xl font-normal text-black text-center mb-6">
            {isSignup ? "Sign Up" : "Log In"}
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {/* Email input */}
            <Input
              type="email"
              placeholder="email@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              className="h-10 rounded-lg border border-[#E0E0E0] bg-white placeholder:text-[#828282] text-black text-sm px-4 py-2 disabled:opacity-50"
            />

            {/* Username input - only show on signup */}
            {isSignup && (
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required={isSignup}
                className="h-10 rounded-lg border border-[#E0E0E0] bg-white placeholder:text-[#828282] text-black text-sm px-4 py-2 disabled:opacity-50"
              />
            )}

            {/* Password input */}
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
              className="h-10 rounded-lg border border-[#E0E0E0] bg-white placeholder:text-[#828282] text-black text-sm px-4 py-2 disabled:opacity-50"
            />

            {/* Log In / Sign Up button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-[#32402F] hover:bg-[#2a3427] text-white font-medium text-sm rounded-lg py-2.5 disabled:opacity-50"
            >
              {isLoading ? "Loading..." : isSignup ? "Sign Up" : "Log In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[#E6E6E6]"></div>
            <span className="text-sm text-[#828282]">or</span>
            <div className="flex-1 h-px bg-[#E6E6E6]"></div>
          </div>

          {/* Social login buttons */}
          <div className="space-y-3 mb-8">
            {/* Google button container */}
            <div
              id="google-signin-button"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            />
          </div>

          {/* Sign up / Log in link */}
          <div className="text-center mb-8">
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              disabled={isLoading}
              className="text-xs hover:text-opacity-80 disabled:opacity-50 cursor-pointer"
            >
              <span className="text-[#828282]">
                {isSignup
                  ? "ALREADY HAVE AN ACCOUNT?"
                  : "DON'T HAVE AN ACCOUNT?"}
              </span>{" "}
              <span className="font-semibold text-black">
                {isSignup ? "LOG IN" : "SIGN UP"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
