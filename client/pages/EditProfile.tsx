import { useNavigate } from "react-router-dom";
import { ChevronLeft, Camera } from "lucide-react";
import { useState, useRef } from "react";
import { getProfilePicture, saveProfilePicture } from "@/lib/auth";

export default function EditProfile() {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(getProfilePicture());
  const fileInputRef = useRef<HTMLInputElement>(null);

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

        <h1 className="text-xl font-normal text-black text-center tracking-tight font-['Archivo_Black']">
          FitFlow
        </h1>

        <div className="w-5 h-5" />
      </div>

      {/* Title */}
      <div className="px-4 py-2 text-center mt-2">
        <h2 className="text-xl font-bold text-black">Edit Profile</h2>
      </div>

      {/* Profile Image */}
      <div className="flex justify-center mt-8 mb-6">
        <div className="relative">
          <div className="w-44 h-44 rounded-full overflow-hidden">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition"
          >
            <Camera className="w-6 h-6 text-[#FAF2E9] stroke-[#32402F]" strokeWidth={2} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  const base64String = event.target?.result as string;
                  setProfilePicture(base64String);
                  saveProfilePicture(base64String);
                };
                reader.readAsDataURL(file);
              }
            }}
            className="hidden"
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="px-6 flex flex-col gap-4 pb-8">
        {/* Username Section */}
        <div className="flex flex-col gap-2">
          <label className="text-left text-black font-bold text-[15px]">
            Change Username
          </label>
          <input
            type="text"
            placeholder="New Username (Optional)"
            className="h-10 px-4 border border-[#E0E0E0] rounded-lg text-sm text-[#828282] placeholder:text-[#828282] outline-none focus:border-[#32402F] transition"
          />
        </div>

        {/* Email Section */}
        <div className="flex flex-col gap-2">
          <label className="text-left text-black font-bold text-[15px]">
            Change Email
          </label>
          <input
            type="email"
            placeholder="New Email (Optional)"
            className="h-10 px-4 border border-[#E0E0E0] rounded-lg text-sm text-[#828282] placeholder:text-[#828282] outline-none focus:border-[#32402F] transition"
          />
        </div>

        {/* Change Password Section */}
        <div className="flex flex-col gap-2">
          <label className="text-left text-black font-bold text-[15px]">
            Change Password
          </label>
          <input
            type="password"
            placeholder="New Password (Optional)"
            className="h-10 px-4 border border-[#E0E0E0] rounded-lg text-sm text-[#828282] placeholder:text-[#828282] outline-none focus:border-[#32402F] transition"
          />
          <input
            type="password"
            placeholder="Confirm Password (Optional)"
            className="h-10 px-4 border border-[#E0E0E0] rounded-lg text-sm text-[#828282] placeholder:text-[#828282] outline-none focus:border-[#32402F] transition"
          />
        </div>

        {/* Save Button */}
        <button className="h-10 bg-[#32402F] text-white rounded-lg font-medium text-sm hover:bg-opacity-90 transition mt-2">
          Save Info
        </button>
      </div>
    </div>
  );
}
