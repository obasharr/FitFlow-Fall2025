import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoadingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-play: transition to login page after 3 seconds
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#32402F] flex flex-col items-center justify-center px-6">
      {/* FitFlow Logo with Loading Spinner */}
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="font-display text-5xl font-normal text-black text-center opacity-90">
          FitFlow
        </h1>

        {/* Loading spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-gray-600 border-opacity-30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-black rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
