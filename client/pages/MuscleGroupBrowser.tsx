import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronLeft } from "lucide-react";

export default function MuscleGroupBrowser() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = ["All", "Upper Body", "Core", "Low"];

  const muscleGroups = [
    {
      name: "Chest (Pectorals)",
      description: "Primary Push - 12 Exercises",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/845477f077f9d4fa9e2ab35fe08515df41fe04b2?width=708",
    },
    {
      name: "Back (Lats & Traps)",
      description: "Pull & Stabilize - 15 Exercises",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/672314b39499854ccc197d35c8d7da3cfab12c2f?width=708",
    },
    {
      name: "Arms (Biceps & Triceps)",
      description: "Push, Pull, & Grip - 24 Exercises",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/4d3b41e98dc5c20f267d92af0d68af170b1d25a8?width=708",
    },
    {
      name: "Quads",
      description: "Propulsion & Stability - 6 Exercises",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/f61e8f47e22a61557a06bf40c67e5dca9741e7e9?width=708",
    },
    {
      name: "Abs",
      description: "Propulsion & Stability - 6 Exercises",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/fdc400a9872b7948ced9e610132603715ec17966?width=708",
    },
    {
      name: "Shoulders (Deltoids)",
      description: "Push & Stabilize - 18 Exercises",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?width=708",
    },
    {
      name: "Hamstrings",
      description: "Pull & Stabilize - 10 Exercises",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?width=708",
    },
    {
      name: "Glutes",
      description: "Power & Stability - 14 Exercises",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?width=708",
    },
    {
      name: "Calves",
      description: "Propulsion & Stability - 6 Exercises",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?width=708",
    },
    {
      name: "Forearms",
      description: "Grip & Stability - 8 Exercises",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?width=708",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF2E9] flex flex-col max-w-[480px] mx-auto">
      {/* Status Bar Spacer (for mobile devices) */}
      <div className="h-11 md:h-0" />

      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4">
        <button
          onClick={() => navigate(-1)}
          className="w-5 h-5 rounded-full bg-[#FAF2E9] flex items-center justify-center flex-shrink-0"
          aria-label="Go back"
        >
          <ChevronLeft className="w-[7px] h-[14px] text-black" strokeWidth={3} />
        </button>

        <h1 className="text-xl font-normal text-black text-center tracking-tight font-['Archivo_Black']">
          FitFlow
        </h1>

        <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/65afb3d062ebd8f0f4c37664eda420f2777add9d?width=48"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      {/* Page Title */}
      <div className="px-4 text-center mt-2">
        <h2 className="text-xl font-bold text-black leading-[140%]">
          Muscle Group Browser
        </h2>
      </div>

      {/* Search Bar */}
      <div className="px-4 mt-5">
        <div className="flex items-center gap-3 px-4 h-10 border border-[#32402F] rounded-lg bg-white">
          <Search className="w-6 h-6 text-[#828282] flex-shrink-0" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-base text-black placeholder:text-[#828282] outline-none font-normal"
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-3 px-4 mt-4 overflow-x-auto scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-5 py-1.5 rounded-full font-bold text-xl whitespace-nowrap transition-all leading-[140%] ${
              selectedFilter === filter
                ? "bg-[#32402F] text-white"
                : "bg-[#4A5948] text-white hover:bg-[#32402F]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Scrollable Muscle Groups List */}
      <div className="flex-1 overflow-y-auto px-4 mt-6 pb-20">
        <div className="flex flex-col gap-9">
          {muscleGroups
            .filter((group) =>
              group.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((group, index) => (
              <button
                key={index}
                onClick={() => {}}
                className="flex items-center w-full bg-white rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)] overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-full h-auto object-cover"
                />
              </button>
            ))}
        </div>
      </div>

      {/* Home Indicator (for iOS-style bottom bar) */}
      <div className="flex justify-center items-center h-[34px] pb-5">
        <div className="w-[134px] h-[5px] bg-black rounded-full opacity-30" />
      </div>
    </div>
  );
}
