import { useState } from "react";
import { Menu, Search, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ExerciseLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);

  const muscleGroups = [
    {
      name: "Chest",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/9aff6cd3c48575c912d56c2be1d384441017ba7c?width=152",
    },
    {
      name: "Back",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/ff3b40add17eb28ffaae35ff9448bc1df4cec8e3?width=152",
    },
    {
      name: "Arms",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/9b1c429c47afc18473b2d7f1d73ba9f59ca928a2?width=152",
    },
    {
      name: "Calves",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/cb46a244aaceadc60b49a6d21705bdbb360dee4a?width=152",
    },
  ];

  const basicExercises = [
    {
      name: "Push-Ups",
      description: "Wide push-up, In...",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/8b540e670edaaec579bafc3b1ce61671582dc789?width=296",
    },
    {
      name: "Squats",
      description: "Front squat, Sum...",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/68b91da69c4d1c10ce4803a3e0542bee4d16d810?width=296",
    },
    {
      name: "Sit Ups",
      description: "Straight",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/81a56dcfb637132efc7284facee41a9e6522b116?width=296",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF2E9] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 h-16">
        <button className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition">
          <Menu className="w-6 h-6 text-[#32402F]" strokeWidth={2} />
        </button>

        <h1 className="font-display text-xl font-normal text-black text-center flex-1">
          FitFlow
        </h1>

        <div className="w-8 h-8 rounded-full bg-gray-400 flex-shrink-0 overflow-hidden">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/65afb3d062ebd8f0f4c37664eda420f2777add9d?width=48"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Search bar */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 px-4 py-2.5 border-2 border-[#32402F] rounded-lg bg-[#F5F5F5]">
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

        {/* Pre-Workout Banner */}
        <div className="px-4 py-4">
          <div
            className="w-full h-40 rounded-lg bg-cover bg-center flex flex-col justify-between p-5 relative"
            style={{
              backgroundImage: `url('https://api.builder.io/api/v1/image/assets/TEMP/032a7927e65c8453f49f989e97dd6b5f06b895c7?width=686')`,
            }}
          >
            <h3 className="text-2xl font-bold text-black">Pre-Workout</h3>

            {/* Pagination dots */}
            <div className="flex gap-1.5 items-center">
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full ${
                    index === carouselIndex ? "bg-black opacity-80" : "bg-black opacity-20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Muscle Group Section */}
        <div className="py-4">
          <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-base font-bold text-black">Muscle Group</h2>
            <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#F5F5F5]">
              <ChevronRight className="w-3.5 h-3.5 text-black" />
            </div>
          </div>

          <div className="flex gap-6 overflow-x-auto px-4 pb-2 scrollbar-hide">
            {muscleGroups.map((group, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-shrink-0">
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <p className="text-sm font-medium text-black text-center">{group.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Basic Exercises Section */}
        <div className="py-4">
          <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-base font-bold text-black">Basic Exercises</h2>
            <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#F5F5F5]">
              <ChevronRight className="w-3.5 h-3.5 text-black" />
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
            {basicExercises.map((exercise, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 flex-shrink-0 bg-white rounded-lg p-3 w-48"
              >
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="w-full h-40 rounded-lg object-cover"
                />
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm text-black font-normal">{exercise.name}</p>
                  <p className="text-base font-medium text-black line-clamp-2">
                    {exercise.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div className="h-8" />
      </div>

      {/* Home indicator */}
      <div className="flex justify-center items-center pb-4 pt-2">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
}
