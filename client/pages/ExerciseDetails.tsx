import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Heart, ChevronRight } from "lucide-react";

export default function ExerciseDetails() {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showTips, setShowTips] = useState(false);

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

        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition"
        >
          <Heart
            className={`w-6 h-6 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-black"
            }`}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Main content - scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* Exercise Title */}
        <div className="px-4 py-6 text-center">
          <h2 className="text-3xl font-bold text-black">Squat Details</h2>
        </div>

        {/* Exercise Video/Image */}
        <div className="px-4 py-4">
          <div className="relative rounded-2xl overflow-hidden h-48 bg-gray-800">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/06479bc03cd3efc20ee9ed9698c175cf69b4e493?width=496"
              alt="Squat exercise"
              className="w-full h-full object-cover"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center opacity-90 hover:opacity-100 transition cursor-pointer">
                <div className="w-0 h-0 border-l-8 border-l-transparent border-r-0 border-t-5 border-t-transparent border-b-5 border-b-transparent ml-1">
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0"
                    style={{
                      borderLeft: "8px solid #000",
                      borderTop: "5px solid transparent",
                      borderBottom: "5px solid transparent",
                      marginLeft: "2px",
                    }}
                  />
                </div>
                <svg
                  className="w-6 h-6 text-black ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Target Muscles Section */}
        <div className="px-4 py-6">
          <h3 className="text-2xl font-bold text-black mb-4">Target Muscles</h3>
          <div className="grid grid-cols-4 gap-3">
            <div className="flex flex-col items-center">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/c27e1430ba182c4c74da89686e37ad339e65991f?width=138"
                alt="Legs"
                className="w-full h-auto"
              />
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/e6ebe4f9991597a525bf3c1f10a63d4c46f50398?width=150"
                alt="Quadriceps"
                className="w-full h-auto"
              />
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/74bcab3179d55a52809327044acd1040bd974d3a?width=148"
                alt="Glutes"
                className="w-full h-auto"
              />
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/d378ca6ff41a4a2642cc7ab5dd941b5d371d508a?width=132"
                alt="Hamstrings"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="px-4 py-6">
          <h3 className="text-2xl font-bold text-black mb-4">Instructions</h3>
          <div className="space-y-3">
            <p className="text-sm font-bold text-black leading-relaxed">
              1. Stand with your feet shoulder-width apart and bar resting on
              upper back
            </p>
            <p className="text-sm font-bold text-black leading-relaxed">
              2.Keep chest up and tighten your core
            </p>
            <p className="text-sm font-bold text-black leading-relaxed">
              3. Lower your hips back and down until thighs are parallel to the
              floor
            </p>
            <p className="text-sm font-bold text-black leading-relaxed">
              4. Push through your heels to return to standing
            </p>
            <p className="text-sm font-bold text-black leading-relaxed">
              5.Maintain neutral spine throughout the movement
            </p>
          </div>
        </div>

        {/* Equipment Section */}
        <div className="px-4 py-6">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/dfb9710b2957d1c18cfa6b6f6aad0c60d868ae6c?width=578"
            alt="Equipment"
            className="w-full h-auto"
          />
        </div>

        {/* Tips Section */}
        <div className="px-4 py-4 mb-4">
          <button
            onClick={() => setShowTips(!showTips)}
            className="flex items-center justify-between w-full px-6 py-4 bg-white rounded-lg border border-[#E0E0E0] hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-black">+</span>
              <span className="text-lg font-bold text-black">Tips</span>
            </div>
            <ChevronRight
              className={`w-5 h-5 text-black transition-transform ${
                showTips ? "rotate-90" : ""
              }`}
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

        {/* Spacer */}
        <div className="h-6" />
      </div>
    </div>
  );
}
