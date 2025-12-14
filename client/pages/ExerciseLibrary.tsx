import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getProfilePicture } from "@/lib/auth";

export default function ExerciseLibrary() {
  const navigate = useNavigate();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [profilePicture, setProfilePicture] = useState(getProfilePicture());

  useEffect(() => {
    const handleStorageChange = () => {
      setProfilePicture(getProfilePicture());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const muscleGroups = [
    {
      name: "Chest",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/9aff6cd3c48575c912d56c2be1d384441017ba7c?width=152",
    },
    {
      name: "Back",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/ff3b40add17eb28ffaae35ff9448bc1df4cec8e3?width=152",
    },
    {
      name: "Arms",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/9b1c429c47afc18473b2d7f1d73ba9f59ca928a2?width=152",
    },
    {
      name: "Calves",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/cb46a244aaceadc60b49a6d21705bdbb360dee4a?width=152",
    },
  ];

  const basicExercises = [
    {
      name: "Push-Ups",
      description: "Wide push-up, In...",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/8b540e670edaaec579bafc3b1ce61671582dc789?width=296",
    },
    {
      name: "Squats",
      description: "Front squat, Sum...",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/68b91da69c4d1c10ce4803a3e0542bee4d16d810?width=296",
    },
    {
      name: "Sit Ups",
      description: "Straight",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/8d2685c51fd8a4886fabf3334dd85d93301f255a?width=296",
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
            src={profilePicture}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
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
                    index === carouselIndex
                      ? "bg-black opacity-80"
                      : "bg-black opacity-20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Muscle Group Section */}
        <div className="py-4">
          <Link
            to="/muscle-library"
            className="flex items-center justify-between px-4 mb-4 hover:opacity-75 transition-opacity cursor-pointer"
          >
            <h2 className="text-base font-bold text-black">Muscle Group</h2>
            <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#F5F5F5]">
              <ChevronRight className="w-3.5 h-3.5 text-black" />
            </div>
          </Link>

          <div className="flex gap-6 overflow-x-auto px-4 pb-2 scrollbar-hide">
            {muscleGroups.map((group, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 flex-shrink-0"
              >
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <p className="text-sm font-medium text-black text-center">
                  {group.name}
                </p>
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
            {basicExercises.map((exercise, index) => {
              const isSquats = exercise.name.toLowerCase() === "squats";

              if (isSquats) {
                return (
                  <Link
                    key={index}
                    to={`/exercise/squats`}
                    className="flex flex-col gap-3 flex-shrink-0 bg-white rounded-lg p-3 w-48 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <img
                      src={exercise.image}
                      alt={exercise.name}
                      className="w-full h-40 rounded-lg object-cover"
                    />
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm text-black font-normal">
                        {exercise.name}
                      </p>
                      <p className="text-base font-medium text-black line-clamp-2">
                        {exercise.description}
                      </p>
                    </div>
                  </Link>
                );
              }

              return (
                <div
                  key={index}
                  className="flex flex-col gap-3 flex-shrink-0 bg-white rounded-lg p-3 w-48 cursor-default opacity-75"
                >
                  <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="w-full h-40 rounded-lg object-cover"
                  />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm text-black font-normal">
                      {exercise.name}
                    </p>
                    <p className="text-base font-medium text-black line-clamp-2">
                      {exercise.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Spacer */}
        <div className="h-8" />
      </div>
    </div>
  );
}
