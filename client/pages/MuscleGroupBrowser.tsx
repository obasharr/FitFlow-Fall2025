import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { getProfilePicture } from "@/lib/auth";

export default function MuscleGroupBrowser() {
  const navigate = useNavigate();
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
      name: "Chest (Pectorals)",
      description: "Primary Push",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F49f276c26e6a44889ab33112904fd889?format=webp&width=800",
      route: null,
    },
    {
      name: "Back (Lats & Traps)",
      description: "Pull & Stabilize",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fcd4dfe2c00e3432db017352c98148ce9?format=webp&width=800",
      route: null,
    },
    {
      name: "Arms (Biceps & Triceps)",
      description: "Push, Pull, & Grip",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F8853b2c1f5e546f1ab11e3beca3eceba?format=webp&width=800",
      route: null,
    },
    {
      name: "Quads",
      description: "Propulsion & Stability",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F1c89dd35feaa48789c9afbcda1ece2b1?format=webp&width=800",
      route: "/muscle/quads",
    },
    {
      name: "Abs",
      description: "Propulsion & Stability ",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Ff8b80b4747cf485a8cfbdc8bd10267d9?format=webp&width=800",
      route: null,
    },
    {
      name: "Lower Back",
      description: "Propulsion & Stability",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F36ebfc5c3b8347ad898fb20ff0f471e2?format=webp&width=800",
      route: null,
    },
    {
      name: "Shoulders",
      description: "Propulsion & Stability",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F3ab98f2ee4a54731aac4ad8d41c90ba9?format=webp&width=800",
      route: null,
    },
    {
      name: "Forearms",
      description: "Propulsion & Stability",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F220c136186c34edb9060f9279681354f?format=webp&width=800",
      route: null,
    },
    {
      name: "Glutes",
      description: "Propulsion & Stability",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F6cdc77e803e14757bb4af88ed8798b3a?format=webp&width=800",
      route: "/muscle/glutes",
    },
    {
      name: "Hamstrings",
      description: "Propulsion & Stability",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fc490ed1885764a95a0914bf44854b336?format=webp&width=800",
      route: "/muscle/hamstrings",
    },
    {
      name: "Cardio",
      description: "Propulsion & Stability",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fd02689a6faac4bae8d98c8dff016416b?format=webp&width=800",
      route: null,
    },
    {
      name: "Calves",
      description: "Propulsion & Stability",
      image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F8f386a2570de4381bde7f1f09493e9a0?format=webp&width=800",
      route: null,
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Page Title */}
        <div className="px-4 py-2 text-center">
          <h2 className="text-2xl font-bold text-black">Muscle Group Browser</h2>
        </div>


        {/* Muscle Groups List */}
        <div className="px-4 py-4 flex-1">
          <div className="flex flex-col gap-3 pb-6">
            {muscleGroups.map((group, index) => (
              <div
                key={index}
                onClick={() => group.route && navigate(group.route)}
                className={`flex gap-3 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition ${
                  group.route ? "cursor-pointer" : ""
                }`}
              >
                {/* Image */}
                <div className="flex-shrink-0 w-16 h-16">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                {/* Text Content */}
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-sm font-bold text-black">
                    {group.name}
                  </h3>
                  <p className="text-xs text-[#828282] font-medium">
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
