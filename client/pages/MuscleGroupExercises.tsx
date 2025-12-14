import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { getProfilePicture } from "@/lib/auth";

interface Exercise {
  name: string;
  image: string;
}

interface MuscleGroupData {
  name: string;
  exercises: Exercise[];
}

const muscleGroupData: Record<string, MuscleGroupData> = {
  chest: {
    name: "Chest",
    exercises: [
      {
        name: "Dumbbell Bench Press",
        image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F0fe73a05f33044d5a64255af51e28720?format=webp&width=800",
      },
      {
        name: "Svend Press",
        image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F0b8a1ec5565c442f9b79ee592ea05aa6?format=webp&width=800",
      },
      {
        name: "Push Up",
        image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F675e35b579804de5b1400c570e5bd315?format=webp&width=800",
      },
      {
        name: "Dumbbell Fly",
        image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F79e1e3e8f4a540739c5c9fa5e33d3494?format=webp&width=800",
      },
    ],
  },
  quads: {
    name: "Quads",
    exercises: [
      {
        name: "Squats",
        image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F589b59f9d5ec478b834f6d7e8f7e538f?format=webp&width=800",
      },
      {
        name: "Lunges",
        image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F1685e37c741d4960938ff84a132b5295?format=webp&width=800",
      },
      {
        name: "Wall Sits",
        image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F43009d39720f46c69866e7a32a4b710c?format=webp&width=800",
      },
    ],
  },
  hamstrings: {
    name: "Hamstrings",
    exercises: [
      {
        name: "Inchworm",
        image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F6f3a4cba7ec148e9b93fc7b5ad76e836?format=webp&width=800",
      },
      {
        name: "Deadlift",
        image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fc647cd23ad274dba9f44363c829a20f5?format=webp&width=800",
      },
      {
        name: "Leg Curls",
        image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F50a156c2aebc4329b5d5f68d4e7813be?format=webp&width=800",
      },
    ],
  },
  glutes: {
    name: "Glutes",
    exercises: [
      {
        name: "Hip Thrust",
        image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F24d8d5c9c94247a796c7fc0903fde757?format=webp&width=800",
      },
      {
        name: "Leg Kickback",
        image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fe0456bdfa67a480393d225cceb70fea5?format=webp&width=800",
      },
      {
        name: "Cable Hip Extension",
        image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fba424ac979b84cd894196ae45829943f?format=webp&width=800",
      },
    ],
  },
};

export default function MuscleGroupExercises() {
  const navigate = useNavigate();
  const { muscleName } = useParams<{ muscleName: string }>();
  const [profilePicture, setProfilePicture] = useState(getProfilePicture());

  useEffect(() => {
    const handleStorageChange = () => {
      setProfilePicture(getProfilePicture());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const muscleGroup = muscleName ? muscleGroupData[muscleName.toLowerCase()] : null;

  if (!muscleGroup) {
    return (
      <div className="min-h-screen bg-[#FAF2E9] flex items-center justify-center">
        <p className="text-black text-lg">Muscle group not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF2E9] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 h-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FAF2E9] hover:bg-gray-100 transition"
        >
          <ChevronLeft className="w-6 h-6 text-black" strokeWidth={2} />
        </button>

        <h1 className="font-display text-xl font-normal text-black text-center flex-1">
          FitFlow
        </h1>

        <div className="w-6 h-6 rounded-full bg-gray-400 flex-shrink-0 overflow-hidden">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Page Title */}
      <div className="px-4 py-2 text-center">
        <h2 className="text-xl font-bold text-black">{muscleGroup.name}</h2>
      </div>

      {/* Exercise List */}
      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="flex flex-col gap-6">
          {muscleGroup.exercises.map((exercise, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/exercise/${exercise.name.toLowerCase().replace(/\s+/g, "-")}`)}
            >
              {/* Circular Image */}
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Exercise Name */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-black">{exercise.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
