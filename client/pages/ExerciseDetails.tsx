import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Heart, ChevronRight } from "lucide-react";
import { getProfilePicture } from "@/lib/auth";

export default function ExerciseDetails() {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [profilePicture, setProfilePicture] = useState(getProfilePicture());
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);


  useEffect(() => {
    const handleStorageChange = () => {
      setProfilePicture(getProfilePicture());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
          <h2 className="text-xl font-bold text-black leading-[140%]">Squat Details</h2>
        </div>

        {/* Exercise Media (image with play overlay -> video) */}
        <div className="px-4 py-4 flex justify-center">
          <div className="relative w-[149px] h-[148px]">
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); setPlaying(true); }}
              className={`absolute inset-0 w-full h-full flex items-center justify-center rounded overflow-hidden focus:outline-none ${playing ? "hidden" : "block"}`}
              aria-label="Play video"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F69f6d8a6486247f29bb4e94cd18f204a?format=webp&width=800"
                alt="Squat exercise"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-90">
                  <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>

            <video
              ref={videoRef}
              src="https://cdn.builder.io/o/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fdb5904de7e7c4f4ab3563bb03cba3cca?alt=media&token=f5945f75-96df-470d-bfd7-c7d3a7f97b30&apiKey=2b2051e6b49f4e57abbdf7a6692fa1f3"
              controls
              autoPlay
              muted
              playsInline
              poster="https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F69f6d8a6486247f29bb4e94cd18f204a?format=webp&width=800"
              onEnded={() => setPlaying(false)}
              className={`w-full h-full object-cover rounded ${playing ? "block" : "hidden"}`}
            />
          </div>
        </div>

        {/* Target Muscles Section */}
        <div className="px-6 py-4">
          <h3 className="text-xl font-bold text-black mb-4 leading-[150%] tracking-[-0.2px]">Target Muscles</h3>
          <div className="flex justify-center">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/ed628151645cac14e74cfe247487061653dd4caf?width=264"
              alt="Target muscles diagram"
              className="w-[132px] h-[130px] object-contain"
            />
          </div>
        </div>

        {/* Instructions Section */}
        <div className="px-6 py-4">
          <h3 className="text-xl font-bold text-black mb-3 leading-[150%] tracking-[-0.2px]">Instructions</h3>
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-black leading-[140%]">
              1. Begin by placing your feet just outside shoulder-width apart and slightly angled outward.
            </p>
            <p className="text-[10px] font-bold text-black leading-[140%]">
              1.5 Grab ahold a pair of dumbbells and clean them up to shoulder height, palms facing in, and elbows facing forward.
            </p>
            <p className="text-[10px] font-bold text-black leading-[140%]">
              2. Keep your weight evenly distributed through your feet throughout the exercise.
            </p>
            <p className="text-[10px] font-bold text-black leading-[140%]">
              3. Begin to descend by reaching your hips slightly back.
            </p>
            <p className="text-[10px] font-bold text-black leading-[140%]">
              4. Your knees should track outward over your second toe and slightly forward as you descend while keeping your core braced to avoid any rounding in the spine.
            </p>
            <p className="text-[10px] font-bold text-black leading-[140%]">
              5. You should continue to descend to a deep enough depth that allows your spine to remain neutral before extending your hips and knees back to the starting position.
            </p>
          </div>
        </div>

        {/* Equipment Section */}
        <div className="px-6 py-4">
          <h3 className="text-xl font-bold text-black mb-2 leading-[150%] tracking-[-0.2px]">Equipment</h3>
          <p className="text-xs font-bold text-black leading-[150%] tracking-[-0.12px]">
            Bodyweight
          </p>
          <p className="text-xs font-bold text-black leading-[150%] tracking-[-0.12px]">
            Optional: Dumbells
          </p>
        </div>

        {/* Tips Section */}
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
                Keep your core engaged throughout the movement. Your knees
                should track over your toes and not cave inward. Start with
                lighter weight to master the form before adding weight.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
