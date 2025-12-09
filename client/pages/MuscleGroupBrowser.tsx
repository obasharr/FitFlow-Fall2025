import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search, ChevronLeft } from "lucide-react";

export default function MuscleGroupBrowser() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = ["All", "Upper Body", "Core", "Low"];

  const muscleGroups = [
    {
      name: "Chest (Pectorals)",
      description: "Primary Push - 12 Exercises",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/b3de63ba60d25b4575600796a6c227f58f6b9964?width=164",
    },
    {
      name: "Back (Lats & Traps)",
      description: "Pull & Stabilize - 15 Exercises",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F50c591c58fc94bb49a89a3dfe992fcd5?format=webp&width=800",
    },
    {
      name: "Arms (Biceps & Triceps)",
      description: "Push, Pull, & Grip - 24 Exercises",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F65b6a8bedfa248128ee66727399471f8?format=webp&width=800",
    },
    {
      name: "Calves (Lower Leg)",
      description: "Propulsion & Stability - 6 Exercises",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F25a00711c34a484bab3082ed60e9d0e8?format=webp&width=800",
    },
  ];

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

      {/* Page Title */}
      <div className="px-6 py-2 text-center">
        <h2 className="text-2xl font-bold text-black">Muscle Group Browser</h2>
      </div>

      {/* Main content - scrollable */}
      <div className="flex-1 overflow-y-auto px-4">
        {/* Search bar */}
        <div className="py-4">
          <div className="flex items-center gap-3 px-4 py-3 border-2 border-[#32402F] rounded-lg bg-[#F5F5F5]">
            <Search className="w-6 h-6 text-[#828282] flex-shrink-0" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-[#828282] placeholder:text-[#828282] outline-none text-base"
            />
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-2 rounded-full font-bold text-base whitespace-nowrap transition ${
                selectedFilter === filter
                  ? "bg-[#32402F] text-white"
                  : "bg-[#32402F] bg-opacity-90 text-white hover:bg-opacity-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Muscle group cards */}
        <div className="flex flex-col gap-4 pb-6">
          {muscleGroups.map((group, index) => (
            <div
              key={index}
              className="flex gap-4 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              {/* Image */}
              <div className="flex-shrink-0 w-24 h-24">
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Text content */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-bold text-black mb-1">
                  {group.name}
                </h3>
                <p className="text-sm text-[#828282] font-medium">
                  {group.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
