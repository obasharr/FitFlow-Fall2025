import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { login, signup, saveAuthToken } from "@/lib/auth";
import { initializeGoogleSignIn, authenticateWithGoogle } from "@/lib/google-auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Google Sign-In
    initializeGoogleSignIn(async (token: string) => {
      await handleGoogleSignIn(token);
    });
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
        ? await signup(email, password)
        : await login(email, password);

      if (response.success && response.token) {
        saveAuthToken(response.token);
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

            {/* Apple button */}
            <Button
              variant="outline"
              className="w-full h-10 bg-[#EEE] border-0 hover:bg-[#E0E0E0] rounded-lg flex items-center justify-center gap-2 py-2.5"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black"
              >
                <path d="M17.05 13.5C16.8 14.3 16.35 15.15 15.7 15.95C14.95 16.95 14.3 17.5 13.75 17.5C13.1 17.5 12.75 17.2 12.15 17.2C11.55 17.2 11.15 17.5 10.65 17.5C10.1 17.5 9.5 17 8.7 15.95C6.9 13.7 6 11.35 6 8.9C6 5.45 8.15 3.55 10.35 3.55C11 3.55 11.65 3.85 12.15 4.05C12.5 4.2 12.8 4.3 13 4.3C13.15 4.3 13.5 4.2 13.95 3.9C14.7 3.4 15.2 3.15 16 3.15C16.9 3.15 17.6 3.7 18.05 4.75C17.05 5.3 16.5 6.4 16.5 7.6C16.5 9.15 17.25 10.5 18.5 11.25C18.3 11.8 17.7 13 17.05 13.5Z" />
              </svg>
              <span className="text-sm font-medium text-black">
                Continue with Apple
              </span>
            </Button>
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
                {isSignup ? "ALREADY HAVE AN ACCOUNT?" : "DON'T HAVE AN ACCOUNT?"}
              </span>{" "}
              <span className="font-semibold text-black">
                {isSignup ? "LOG IN" : "SIGN UP"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Home indicator (mobile) */}
      <div className="flex justify-center items-center pb-6 pt-4">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
}
