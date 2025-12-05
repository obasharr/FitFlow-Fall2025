import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function EditProfile() {
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

        <div className="w-8 h-8 rounded-full bg-gray-400 flex-shrink-0 overflow-hidden">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F92b137ad3047419da61c243feb037232?format=webp&width=800"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Title */}
      <div className="px-4 py-6 text-center">
        <h2 className="text-2xl font-bold text-black">Edit Profile</h2>
      </div>

      {/* Main content - scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* Spacer */}
        <div className="h-6" />
      </div>

      {/* Home indicator */}
      <div className="flex justify-center items-center pb-4 pt-2">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
}
