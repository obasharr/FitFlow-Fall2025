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
  "dumbbell-bench-press": {
    title: "Dumbbell Bench Press Details",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fbb0d31f9c6eb41b9ab69c879a3fd2438?format=webp&width=800",
    targetMusclesImage: "https://api.builder.io/api/v1/image/assets/TEMP/a8dfcc21308e254d009d6ea203955bcf029505ac?width=264",
    instructions: [
      "1. Lie your back onto a bench while squeezing your shoulder blades together and placing your heels firmly on the ground underneath your knees.",
      "2. The bench should be in contact with your head, shoulders, and butt at all times.",
      "3. Position the dumbbells so that they are just outside shoulder-width apart.",
      "4. Keeping your core braced by breathing into your stomach and flexing the abdominal muscles, extend your elbows while keeping them at a 45 degree angle from your torso.",
      "5. Once your arms are fully extended over the shoulders, exhale to return the dumbbells back to the starting position.",
    ],
    equipment: ["Dumbbells", "Bench (Floor as as substitute)"],
    tips: "Flaring your elbows out can sometimes help you lift heavier weights, but it places more tension on your shoulders. The ideal position can vary slightly from person to person, but try to keep your elbows around 45 degrees from your torso, and make small adjustments from there.",
  },
  "svend-press": {
    title: "Svend Press Details",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fdb3050ea7f204a08b6480ad3640c75fb?format=webp&width=800",
    targetMusclesImage: "https://api.builder.io/api/v1/image/assets/TEMP/a8dfcc21308e254d009d6ea203955bcf029505ac?width=264",
    instructions: [
      "1. Stand in an upright posture with your feet shoulder-width apart.",
      "2. Press two light barbell plates between your palms and position them in the middle of your chest just below shoulder height.",
      "3. Continue to press the barbell plates together as you extend your arms forward keeping the plates in front of the middle of your chest.",
      "4. You should remain in an upright posture as you flex your elbows to return the barbell plates back to the starting position.",
    ],
    equipment: ["Weight plate"],
    tips: "Don't overdue it with a heavy weight",
  },
  "push-up": {
    title: "Push Up Details",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Ffd2f81f981d54bcfbfff4addeebeaad5?format=webp&width=800",
    targetMusclesImage: "https://api.builder.io/api/v1/image/assets/TEMP/a8dfcc21308e254d009d6ea203955bcf029505ac?width=264",
    instructions: [
      "1. Start with your elbows fully extended and your hands placed on the floor just outside shoulder-width apart.",
      "2. Brace your core by breathing into your stomach and flexing the abdominal muscles to create a straight and rigid posture from your heels to your shoulders.",
      "3. With your hips and knees extended throughout the exercise, flex your elbows to descend your chest to the floor while keeping your elbows at a 45 degree angle to your torso.",
      "4. Return to the starting position after your chest has reached the floor.",
    ],
    equipment: ["Body Weight"],
    tips: "Don't allow your hips to sag or raise up during this exercise. It's very common to see this especially as you become fatigued during your set. Keeping your core engaged will help you keep your spine in a neutral position. It can also help to think of this exercise as a plank first, and the movement as a secondary piece to this exercise.",
  },
  "dumbbell-fly": {
    title: "Dumbbell Fly Details",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F79e1e3e8f4a540739c5c9fa5e33d3494?format=webp&width=800",
    targetMusclesImage: "https://api.builder.io/api/v1/image/assets/TEMP/b7b48059ce93bda69e742bce22c368089bcd8f7b?width=264",
    instructions: [
      "1. Lie your back onto a bench while squeezing your shoulder blades together and placing your heels firmly on the ground underneath your knees.",
      "2. The bench should be in contact with your head, shoulders, and butt at all times.",
      "3. Position the dumbbells so that they are over your shoulders, palms facing inward, and your elbows are slightly bent.",
      "4. Keeping your core braced by breathing into your stomach and flexing the abdominal muscles, laterally lower the dumbbells in a wide arc to the sides while keeping your elbows slightly bent.",
      "5. Once the dumbbells have been lowered to the same height as your chest, exhale to return the dumbbells back to the starting position.",
    ],
    equipment: ["Dumbbells", "Bench (Floor as substitute)"],
    tips: "Extending your arms away from your body increases the tension placed on your joint's and muscles. Keep the resistance for this exercise fairly light, and focus on moving slowly, and controlling the movement before you add more resistance.",
  },
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
  inchworm: {
    title: "Inchworm Details",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F33c4a57068e7433cab5d952b4ee21b40?format=webp&width=800",
    targetMusclesImage: "https://api.builder.io/api/v1/image/assets/TEMP/1e3d91ce68ec47b59f2298b6f8536842d38bc683?width=264",
    instructions: [
      "1. Stand upright with your feet shoulder width apart.",
      "2. Lower your hands so that your palms are just in front of your toes and begin to walk your hands forward until you've created a straight line from your shoulders to your heels..",
      "3. Tiptoe your toes back up towards your hands before standing back upright to the starting position.",
    ],
    equipment: ["Bodyweight"],
  },
  deadlift: {
    title: "Deadlift Details",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F660d876d196d4a868dfe9480930f21d1?format=webp&width=800",
    targetMusclesImage: "https://api.builder.io/api/v1/image/assets/TEMP/2cd72be2dc7452fb50f955ee7868d9f90ae4fee5?width=264",
    instructions: [
      "1. Stand in an upright posture with your feet at shoulder-width apart and angled out slightly positioning a loaded barbell an inch away from the front of your lower legs.",
      "2. Hinge at the hips and flex your knees to drop down allowing your shins to drop forward to touch the barbell.",
      "3. With your arms extended, grip the barbell with either double overhand grip or alternate grip next to your lower legs while keeping your chest up.",
      "4. Maintain this rigid spinal posture throughout the exercise.",
      "5. Pull the barbell in a vertical path next to your body by extending your hips and knees until you are back to a standing upright posture.",
      "6. Lower the barbell in a duplicate path it came up with.",
    ],
    equipment: ["Barbells"],
  },
  "leg-curls": {
    title: "Leg Curl Details",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Ff3473ce01d304083b7b8fd1c00537903?format=webp&width=800",
    targetMusclesImage: "https://api.builder.io/api/v1/image/assets/TEMP/b9041f06c003bd9da9b69f5a3982912723f12eca?width=264",
    instructions: [
      "1. Sit upright in a leg curl machine while positioning the top support pad just above your knees and placing it just above the back of your ankles onto the lower pad.",
      "2. Grab ahold of the handles for additional support.",
      "3. Flex your knees to lower your heels towards towards the floor in a downward arc.",
      "4. Once you can no longer flex your knees, return to the starting position.",
    ],
    equipment: ["Leg Curl Machine"],
  },
  "hip-thrust": {
    title: "Hip Thrust Details",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F3c6a4908e987488bb9fbbbb178fd482b?format=webp&width=800",
    targetMusclesImage: "https://api.builder.io/api/v1/image/assets/TEMP/ae45c09f80694871d5afb7b32e605724e1154ec4?width=264",
    instructions: [
      "1. Lie flat on your back with your feet firmly on the ground and hip-width apart.",
      "2. Place your arms to your side with your palms on the ground.",
      "3. Slightly tilt your hips upward while placing tension in the abdomen to keep the back flush with the floor.",
      "4. Begin extending your hips by flexing your glutes until your hips are fully extended or there is a straight alignment from your knees to your shoulders.",
      "5. Control the movement as you descend your hips back to the ground.",
    ],
    equipment: ["Bodyweight"],
  },
  "leg-kickback": {
    title: "Leg Kickback Details",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F9a48327a311d4a67ae30c784a7a0f33c?format=webp&width=800",
    targetMusclesImage: "https://api.builder.io/api/v1/image/assets/TEMP/54a324930c243212104e8149112b458d3dc1a993?width=264",
    instructions: [
      "1. Get into a kneeling push-up position with your hands underneath your shoulders and your knees underneath your hips bent to 90 degrees.",
      "2. Brace your core to keep a neutral spine.",
      "3. Keeping your ankles bent to 90 degrees, extend your right hip by flexing your right glute to elevate your right foot off the ground.",
      "4. Lift your leg until the hamstrings are in line with the back while maintaining the 90-degree angle bend. Contract the glutes during this movement and hold the top position for a brief moment.",
      "5. Return to the starting position and repeat with the opposite side.",
    ],
    equipment: ["Bodyweight"],
  },
  "cable-hip-extension": {
    title: "Cable Hip Extension Details",
    image: "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fe194c5965736472db87ab1a8803a7594?format=webp&width=800",
    targetMusclesImage: "https://api.builder.io/api/v1/image/assets/TEMP/54a324930c243212104e8149112b458d3dc1a993?width=264",
    instructions: [
      "1. Place a pulley at the lowest position with an ankle cuff attachment and wrap it around your right ankle.",
      "2. Stand upright facing the pulley with your feet hip-width apart and grab ahold of the steel frame.",
      "3. Brace your core to maintain a neutral spine.",
      "4. Keeping your right leg extended with the knee slightly flexed, extend it behind you by flexing your right glute.",
      "5. Return to the starting position and repeat with the opposite leg.",
    ],
    equipment: ["Hi-Lo Pulley Cable"],
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
