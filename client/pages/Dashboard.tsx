import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProfilePicture } from "@/lib/auth";

export default function Dashboard() {
  const [profilePicture, setProfilePicture] = useState(getProfilePicture());

  useEffect(() => {
    const handleStorageChange = () => {
      setProfilePicture(getProfilePicture());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF2E9] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 h-16">
        {/* FitFlow title */}
        <h1 className="font-display text-xl font-normal text-black text-center flex-1">
          FitFlow
        </h1>

        {/* Profile image */}
        <div className="w-8 h-8 rounded-full bg-gray-400 flex-shrink-0 overflow-hidden">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-start pt-8 px-6">
        {/* Pills section */}
        <div className="w-full flex flex-col items-center gap-4 mb-12">
          {/* Exercise Library pill */}
          <Button
            className="bg-[#32402F] hover:bg-[#2a3427] text-white font-bold text-lg px-8 py-6 rounded-full h-auto whitespace-nowrap"
            asChild
          >
            <Link to="/exercise-library">Exercise Library</Link>
          </Button>

          {/* Muscle Group Library pill */}
          <Button
            className="bg-[#32402F] hover:bg-[#2a3427] text-white font-bold text-lg px-8 py-6 rounded-full h-auto whitespace-nowrap"
            asChild
          >
            <Link to="/muscle-library">Muscle Group Library</Link>
          </Button>

          {/* Profile pill */}
          <Button
            variant="outline"
            className="border-2 border-[#32402F] bg-[#465342] hover:bg-[#3a4536] text-white font-bold text-lg px-8 py-6 rounded-full h-auto whitespace-nowrap"
            asChild
          >
            <Link to="/profile">Profile</Link>
          </Button>
        </div>

        {/* Featured image */}
        <div className="w-full max-w-sm">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/d222dfb404d27794ed9836fdcf2af76df37b213d?width=666"
            alt="Workout"
            className="w-full h-auto rounded-2xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
