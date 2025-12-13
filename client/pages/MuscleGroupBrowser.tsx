import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronLeft } from "lucide-react";

export default function MuscleGroupBrowser() {
  const navigate = useNavigate();
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Page Title */}
        <div className="px-4 py-2 text-center">
          <h2 className="text-2xl font-bold text-black">Muscle Group Browser</h2>
        </div>


        {/* Filter Pills */}
        <div className="flex gap-2 px-4 py-2 overflow-x-auto scrollbar-hide">
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

        {/* Muscle Groups List */}
        <div className="px-4 py-4 flex-1">
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

                  {/* Text Content */}
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
    </div>
  );
}
