import { useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Heart, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF2E9] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 h-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition"
        >
          <ChevronLeft className="w-6 h-6 text-black" strokeWidth={2} />
        </button>

        <h1 className="font-display text-xl font-normal text-black text-center flex-1">
          FitFlow
        </h1>

        <div className="w-8 h-8 flex-shrink-0" />
      </div>

      {/* Main content - scrollable */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center">
        {/* Profile image */}
        <div className="w-44 h-44 rounded-full bg-gray-400 flex-shrink-0 overflow-hidden my-8">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F92b137ad3047419da61c243feb037232?format=webp&width=800"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Username */}
        <h2 className="text-2xl font-bold text-black mt-4 mb-2">Username</h2>

        {/* Email */}
        <p className="text-2xl font-bold text-black mb-8">Email@email.com</p>

        {/* Favorites Card */}
        <Link
          to="/favorites"
          className="w-full max-w-sm px-4 mb-8 hover:opacity-75 transition-opacity"
        >
          <div className="bg-white rounded-lg p-6 shadow-sm flex gap-6 items-center cursor-pointer hover:shadow-md transition">
            <div className="flex flex-col items-center gap-4">
              <Heart className="w-10 h-10 fill-[#32402F] text-[#32402F]" />
              <Dumbbell className="w-10 h-10 text-[#32402F]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-black">Favorites</h3>
              <p className="text-lg font-bold text-black">6 Exercises</p>
            </div>
          </div>
        </Link>

        {/* Action buttons */}
        <div className="w-full max-w-sm px-4 flex flex-col gap-3 mb-8">
          <Button
            className="bg-[#465342] hover:bg-[#3a4536] text-white font-bold text-lg py-6 rounded-full w-full h-auto"
            asChild
          >
            <Link to="/edit-profile">Edit Profile</Link>
          </Button>

          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="border-2 border-[#32402F] bg-transparent hover:bg-gray-100 text-white font-bold text-lg py-6 rounded-full w-full h-auto"
            style={{
              backgroundColor: "#465342",
            }}
          >
            Sign Out
          </Button>
        </div>

        {/* Spacer */}
        <div className="h-6" />
      </div>
    </div>
  );
}
