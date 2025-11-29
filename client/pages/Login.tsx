import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
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

        {/* Description */}
        <div className="text-center mb-12 max-w-sm">
          <p className="text-base text-black leading-relaxed">
            Here the user has the option to Log in, Sign-Up, or view Legal Information
          </p>
        </div>

        {/* Form container */}
        <div className="w-full max-w-sm">
          {/* Log In heading */}
          <h2 className="text-xl font-normal text-black text-center mb-6">
            Log In
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {/* Email input */}
            <Input
              type="email"
              placeholder="email@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 rounded-lg border border-[#E0E0E0] bg-white placeholder:text-[#828282] text-black text-sm px-4 py-2"
            />

            {/* Password input */}
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 rounded-lg border border-[#E0E0E0] bg-white placeholder:text-[#828282] text-black text-sm px-4 py-2"
            />

            {/* Log In button */}
            <Button
              type="submit"
              className="w-full h-10 bg-[#32402F] hover:bg-[#2a3427] text-white font-medium text-sm rounded-lg py-2.5"
            >
              Log In
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
            {/* Google button */}
            <Button
              variant="outline"
              className="w-full h-10 bg-[#EEE] border-0 hover:bg-[#E0E0E0] rounded-lg flex items-center justify-center gap-2 py-2.5"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7346 15.0813L13.7155 15.2051L16.7429 17.4969L16.9527 17.5174C18.8789 15.7789 19.9895 13.221 19.9895 10.1871Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10.1991 19.9314C12.9526 19.9314 15.2642 19.0455 16.9526 17.5175L13.7345 15.0814C12.8733 15.6682 11.7175 16.0779 10.1991 16.0779C7.5023 16.0779 5.2134 14.3395 4.39747 11.9367L4.27787 11.9466L1.12991 14.3273L1.08875 14.4392C2.76576 17.6946 6.21048 19.9314 10.1991 19.9314Z"
                    fill="#34A853"
                  />
                  <path
                    d="M4.3976 11.9367C4.18231 11.3166 4.05771 10.6522 4.05771 9.96571C4.05771 9.27915 4.18231 8.61479 4.38627 7.99472L4.38057 7.86266L1.19316 5.44373L1.08888 5.4922C0.397698 6.84311 0.00109863 8.36014 0.00109863 9.96571C0.00109863 11.5713 0.397698 13.0882 1.08888 14.4391L4.3976 11.9367Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M10.1991 3.85336C12.1141 3.85336 13.4058 4.66168 14.1424 5.33718L17.0205 2.59107C15.2529 0.985496 12.9526 0 10.1991 0C6.21048 0 2.76576 2.23672 1.08875 5.49214L4.38614 7.99466C5.2134 5.59183 7.5023 3.85336 10.1991 3.85336Z"
                    fill="#EB4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="text-sm font-medium text-black">Continue with Google</span>
            </Button>

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
              <span className="text-sm font-medium text-black">Continue with Apple</span>
            </Button>
          </div>

          {/* Sign up link */}
          <div className="text-center mb-8">
            <p className="text-xs">
              <span className="text-[#828282]">DON'T HAVE AN ACCOUNT?</span>{" "}
              <span className="font-semibold text-black">SIGN UP</span>
            </p>
          </div>

          {/* Footer text */}
          <p className="text-center text-xs text-[#828282] leading-relaxed">
            By clicking continue, you agree to our{" "}
            <span className="text-black font-normal">Terms of Service</span> and{" "}
            <span className="text-black font-normal">Privacy Policy</span>
          </p>
        </div>
      </div>

      {/* Home indicator (mobile) */}
      <div className="flex justify-center items-center pb-6 pt-4">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
}
