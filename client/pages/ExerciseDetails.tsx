import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Heart, ChevronRight } from "lucide-react";
import { getProfilePicture } from "@/lib/auth";

interface ExerciseData {
  title: string;
  image: string;
  targetMusclesImage: string;
  instructions: string[];
  equipment: string[];
  tips?: string;
}

const exerciseData: Record<string, ExerciseData> = {
  squats: {
    title: "Squat Details",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F69f6d8a6486247f29bb4e94cd18f204a?format=webp&width=800",
    targetMusclesImage: "https://api.builder.io/api/v1/image/assets/TEMP/ed628151645cac14e74cfe247487061653dd4caf?width=264",
    instructions: [
      "1. Begin by placing your feet just outside shoulder-width apart and slightly angled outward.",
      "1.5 Grab ahold a pair of dumbbells and clean them up to shoulder height, palms facing in, and elbows facing forward.",
      "2. Keep your weight evenly distributed through your feet throughout the exercise.",
      "3. Begin to descend by reaching your hips slightly back.",
      "4. Your knees should track outward over your second toe and slightly forward as you descend while keeping your core braced to avoid any rounding in the spine.",
      "5. You should continue to descend to a deep enough depth that allows your spine to remain neutral before extending your hips and knees back to the starting position.",
    ],
    equipment: ["Bodyweight", "Optional: Dumbells"],
    tips: "Keep your core engaged throughout the movement. Your knees should track over your toes and not cave inward. Start with lighter weight to master the form before adding weight.",
  },
  lunges: {
    title: "Lunge Details",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F8326114f1f9d462fab98d01e12d5cd02?format=webp&width=800",
    targetMusclesImage: "https://api.builder.io/api/v1/image/assets/TEMP/4f5cf1bdfca0ff6f6f8b06dd8749a773ef018228?width=266",
    instructions: [
      "1. Stand in an upright posture with your feet hip-width apart",
      "1.5 Hold a pair of dumbbells with your palms facing in",
      "2. Shift your weight to your stance leg as the other leg begins to step forward.",
      "3. Initiate contact, heel first. with the stepping leg until the foot is firmly planted and the back heel is lifted off the floor.",
      "4. While maintaining an upright torso, descend your back knee towards the ground keeping your front heel on the ground.",
      "5. Raise your back knee once the front thigh has become parallel with the floor and push off your front forefoot to return to the starting position.",
    ],
    equipment: ["Bodyweight", "Optional: Dumbells"],
  },
  "wall-sits": {
    title: "Wall Sit Details",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F57d8afe90d014f7faadb21aff027be30?format=webp&width=800",
    targetMusclesImage: "https://api.builder.io/api/v1/image/assets/TEMP/3e8435d5f8e2be354d74469460e56decc950059b?width=264",
    instructions: [
      "1. Press your back against a wall and bend your knees to a 90 degree angle.",
      "1.5  Place a weighted plate on top of your thighs.",
      "2. Extend your arms in front of your shoulders.",
      "3. Hold the position for an allotted time.",
    ],
    equipment: ["Bodyweight", "Optional: Weighted Plate"],
  },
};

export default function ExerciseDetails() {
  const navigate = useNavigate();
  const { exerciseName } = useParams<{ exerciseName: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [profilePicture, setProfilePicture] = useState(getProfilePicture());

  useEffect(() => {
    const handleStorageChange = () => {
      setProfilePicture(getProfilePicture());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const exercise = exerciseName ? exerciseData[exerciseName] : null;

  if (!exercise) {
    return (
      <div className="min-h-screen bg-[#FAF2E9] flex items-center justify-center">
        <p className="text-black text-lg">Exercise not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF2E9] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 h-16">
        <button
          onClick={() => navigate(-1)}
          className="w-5 h-5 flex items-center justify-center rounded-full bg-[#FAF2E9] hover:bg-gray-100 transition"
        >
          <ChevronLeft className="w-5 h-5 text-black" strokeWidth={2} />
        </button>

        <h1 className="font-display text-[32px] font-normal text-black text-center absolute left-1/2 -translate-x-1/2 tracking-[-0.32px] leading-[150%]">
          FitFlow
        </h1>

        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="flex items-center justify-center"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "fill-black text-black" : "text-black fill-none"
            }`}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Main content - scrollable */}
      <div className="flex-1 overflow-y-auto pb-6">
        {/* Exercise Title */}
        <div className="px-4 py-2 text-center">
          <h2 className="text-xl font-bold text-black leading-[140%]">{exercise.title}</h2>
        </div>

        {/* Exercise Image */}
        <div className="px-4 py-4 flex justify-center">
          <img
            src={exercise.image}
            alt={exercise.title}
            className="w-[149px] h-[148px] object-cover"
          />
        </div>

        {/* Target Muscles Section */}
        <div className="px-6 py-4">
          <h3 className="text-xl font-bold text-black mb-4 leading-[150%] tracking-[-0.2px]">Target Muscles</h3>
          <div className="flex justify-center">
            <img
              src={exercise.targetMusclesImage}
              alt="Target muscles diagram"
              className="w-[132px] h-[130px] object-contain"
            />
          </div>
        </div>

        {/* Instructions Section */}
        <div className="px-6 py-4">
          <h3 className="text-xl font-bold text-black mb-3 leading-[150%] tracking-[-0.2px]">Instructions</h3>
          <div className="space-y-2">
            {exercise.instructions.map((instruction, index) => (
              <p key={index} className="text-[10px] font-bold text-black leading-[140%]">
                {instruction}
              </p>
            ))}
          </div>
        </div>

        {/* Equipment Section */}
        <div className="px-6 py-4">
          <h3 className="text-xl font-bold text-black mb-2 leading-[150%] tracking-[-0.2px]">Equipment</h3>
          {exercise.equipment.map((item, index) => (
            <p key={index} className="text-xs font-bold text-black leading-[150%] tracking-[-0.12px]">
              {item}
            </p>
          ))}
        </div>

        {/* Tips Section */}
        {exercise.tips && (
          <div className="px-6 py-2">
            <button
              onClick={() => setShowTips(!showTips)}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-3">
                <span className="text-[15px] font-bold text-black leading-[140%]">+</span>
                <span className="text-[15px] font-bold text-black leading-[140%]">Tips</span>
              </div>
              <ChevronRight
                className={`w-[9px] h-[15px] text-black transition-transform ${
                  showTips ? "rotate-90" : ""
                }`}
                strokeWidth={2}
              />
            </button>

            {showTips && (
              <div className="mt-4 px-4 py-4 bg-white rounded-lg border border-[#E0E0E0]">
                <p className="text-sm text-black leading-relaxed">
                  {exercise.tips}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
