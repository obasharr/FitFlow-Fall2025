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
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fbb0d31f9c6eb41b9ab69c879a3fd2438?format=webp&width=800",
    targetMusclesImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/a8dfcc21308e254d009d6ea203955bcf029505ac?width=264",
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
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fdb3050ea7f204a08b6480ad3640c75fb?format=webp&width=800",
    targetMusclesImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/a8dfcc21308e254d009d6ea203955bcf029505ac?width=264",
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
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Ffd2f81f981d54bcfbfff4addeebeaad5?format=webp&width=800",
    targetMusclesImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/a8dfcc21308e254d009d6ea203955bcf029505ac?width=264",
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
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F79e1e3e8f4a540739c5c9fa5e33d3494?format=webp&width=800",
    targetMusclesImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/b7b48059ce93bda69e742bce22c368089bcd8f7b?width=264",
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
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F69f6d8a6486247f29bb4e94cd18f204a?format=webp&width=800",
    targetMusclesImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/ed628151645cac14e74cfe247487061653dd4caf?width=264",
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
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F8326114f1f9d462fab98d01e12d5cd02?format=webp&width=800",
    targetMusclesImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/4f5cf1bdfca0ff6f6f8b06dd8749a773ef018228?width=266",
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
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F57d8afe90d014f7faadb21aff027be30?format=webp&width=800",
    targetMusclesImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/3e8435d5f8e2be354d74469460e56decc950059b?width=264",
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
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F33c4a57068e7433cab5d952b4ee21b40?format=webp&width=800",
    targetMusclesImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/1e3d91ce68ec47b59f2298b6f8536842d38bc683?width=264",
    instructions: [
      "1. Stand upright with your feet shoulder width apart.",
      "2. Lower your hands so that your palms are just in front of your toes and begin to walk your hands forward until you've created a straight line from your shoulders to your heels..",
      "3. Tiptoe your toes back up towards your hands before standing back upright to the starting position.",
    ],
    equipment: ["Bodyweight"],
  },
  deadlift: {
    title: "Deadlift Details",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F660d876d196d4a868dfe9480930f21d1?format=webp&width=800",
    targetMusclesImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/2cd72be2dc7452fb50f955ee7868d9f90ae4fee5?width=264",
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
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Ff3473ce01d304083b7b8fd1c00537903?format=webp&width=800",
    targetMusclesImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/b9041f06c003bd9da9b69f5a3982912723f12eca?width=264",
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
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F3c6a4908e987488bb9fbbbb178fd482b?format=webp&width=800",
    targetMusclesImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/ae45c09f80694871d5afb7b32e605724e1154ec4?width=264",
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
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F9a48327a311d4a67ae30c784a7a0f33c?format=webp&width=800",
    targetMusclesImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/54a324930c243212104e8149112b458d3dc1a993?width=264",
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
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fe194c5965736472db87ab1a8803a7594?format=webp&width=800",
    targetMusclesImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/54a324930c243212104e8149112b458d3dc1a993?width=264",
    instructions: [
      "1. Place a pulley at the lowest position with an ankle cuff attachment and wrap it around your right ankle.",
      "2. Stand upright facing the pulley with your feet hip-width apart and grab ahold of the steel frame.",
      "3. Brace your core to maintain a neutral spine.",
      "4. Keeping your right leg extended with the knee slightly flexed, extend it behind you by flexing your right glute.",
      "5. Return to the starting position and repeat with the opposite leg.",
    ],
    equipment: ["Hi-Lo Pulley Cable"],
  },
  "machine-hip-adductor": {
    title: "Machine Hip Adductor",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F1f6314a651ed412bafcb6f557ad58c8f?format=webp&width=800",
    targetMusclesImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/254ac9c2a7048513087c38b08fc2d8fd56760b59?width=264",
    instructions: [
      "1. Sit upright in a thigh abductor machine with your lower back pressed against the back pad.",
      "2. Bend your knees to a 90 degree angle and place your feet on the foot pedals in a wide position with your knees against the inner pads.",
      "3. Brace your core to keep your spine neutral and stationary as you press your knees through the pads to create an inward arc.",
      "4. Once the knee pads have been brought together, return to the starting position.",
    ],
    equipment: ["Thigh Adductor Machine"],
    tips: "Focus on feeling your inner thighs (adductors) work, not just moving the weight. Slow, controlled movements build strength better than rushing or clanging the weights.",
  },
  "lateral-box-jump": {
    title: "Lateral Box Jump",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F9b80737769c7432cb72cd7344433139d?format=webp&width=800",
    targetMusclesImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/44a4a81bf5980ec9d24d021525ba520321f291b3?width=264",
    instructions: [
      '1. Stand 3-6" away and perpendicular to the plyo box and place your feet hip-width apart.',
      "2. Begin hinging at your hips while simultaneously extending your arms behind you.",
      "3. Maintain a straight and rigid torso throughout while you descend and keep your heels firmly on the ground.",
      "4. Once you have reached the bottom of the movement, immediately explode upward by extending your hips and knees and swinging your arms forward.",
      "5. Push off more with your outside foot to move laterally to the top of the box.",
      "6. Absorb the impact by slightly flexing your hips and knees before jumping back to the starting position.",
    ],
    equipment: ["Box"],
    tips: "Aim for power and speed, not just height or distance. Protect joints by landing softly and staying athletic (hips over knees), not flat-footed.",
  },
  "butterfly-stretch": {
    title: "Butterfly Stretch",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F749507474cb94eabae7c06f8c6ed737d?format=webp&width=800",
    targetMusclesImage:
      "https://api.builder.io/api/v1/image/assets/TEMP/7022dae1aaea30eeefab11898e8994ebf3c4f975?width=264",
    instructions: [
      "1. Sit upright and bend your knees so that the soles of your feet are pressed together and pull your heels into your hips.",
      "2. Place your hands on top of your feet and slowly bend your torso forward until you feel a comfortable stretch on the inside of your thighs.",
      "3. Hold the stretch for 15-30 seconds.",
    ],
    equipment: ["Yoga matt"],
    tips: "Sit tall with a straight spine; engage your core to support your back. The stretch should be in your inner thighs and groin, not your knees.",
  },
  "palms-up-barbell-waist-curl": {
    title: "Palms-Up Barbell Wrist Curl",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fbbb38996db4d4fc0b1636a601aba2a25?format=webp&width=800",
    targetMusclesImage:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F36e33a6396eb4e168be97a72d86b4fd6?format=webp&width=800",
    instructions: [
      "1. Drop down into a tall kneeling position facing the side of a bench.",
      "2. Lower your forearms onto the bench, keeping them parallel with each other, while hanging your wrists off the bench on the other side.",
      "3. You will need to have a partner hand you the barbell or have the barbell in your hands before getting into position.",
      "4. Grip the barbell underneath so that your palms face the ceiling while keeping your forearms on the bench as you flex your wrists to raise the barbell.",
      "5. Lower back to the starting position.",
    ],
    equipment: ["Barbells"],
  },
  "plate-flips": {
    title: "Plate Flips",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F9a7e83cab498485bb4b4bf6d5b9f52b0?format=webp&width=800",
    targetMusclesImage:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fd8652257ec5c4f83b82befa3d7bf3cb5?format=webp&width=800",
    instructions: [
      "1. Stand in a location away from other exercisers with your feet roughly shoulder-width apart and a slight bend in your knees.",
      "2. Grasp the top of a bumper plate in one hand. Squeeze the lip of the bumper plate and hold it in front of you with your palms facing you.",
      "3. Engage your shoulders to explosively raise the weight up. Allow the bottom of the bumper plate to rotate up and away from you.",
      "4. Release the bumper plate and allow it to rotate in the air.",
      "5. Catch the top of the bumper plate after it flips and squeeze the lip of the plate.",
      "6. If you feel you are going to drop the bumper plate while it is still in your grasp, hinge into a squat position and place the weight on the floor.",
      "7. If you feel you are going to drop the bumper plate on the catch, step back and allow the weight to hit the floor. Do not try to recatch if you fumble an attempt.",
      "8. Maintain good posture by keeping your core engaged and your chest up.",
    ],
    equipment: ["Plates"],
  },
  "cable-wrist-curl": {
    title: "Cable Wrist Curl",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fa73fcd6d1582449e882cd11c83fb9dc3?format=webp&width=800",
    targetMusclesImage:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F36e33a6396eb4e168be97a72d86b4fd6?format=webp&width=800",
    instructions: [
      "1. Position and sit on a flat bench in front of the cable machine. Grasp the handle with both hands such that your palms are face up.",
      "2. Rest the back of your forearms on your legs such that your wrists are just past your knees.",
      "3. Release the tension in your forearm to allow the weight to descend slowly. Keep the bar in the palms of your hands, not your fingertips.",
      "4. Engage your forearms to raise the bar by curling your wrists up and toward you.",
      "5. Tense your forearms and hold this position for a moment at the top of the movement.",
      "6. Maintain good posture by keeping your forearms in contact with your legs and the weight in the palms of your hands throughout this exercise.",
      "7. You should feel this exercise in your forearms.",
    ],
    equipment: ["Hi-Lo Pulley Cable", "Rope Cable", "Flat Bench"],
  },
  "plate-pinch": {
    title: "Plate Pinch",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F22b183eb96c04bad92d8913297eb5427?format=webp&width=800",
    targetMusclesImage:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fd8652257ec5c4f83b82befa3d7bf3cb5?format=webp&width=800",
    instructions: [
      "1. Grasp the edge of a plate in a single hand between your thumb and fingers.",
      "2. Engage your shoulder to raise your arm out to the side.",
      "3. Squeeze the plate to prevent it from falling.",
      "4. Maintain this grasp for the duration of the exercise.",
      "5. Slowly place the weight on the floor by descending into a squat position as you finish the exercise.",
      "6. You should feel this exercise primarily in your forearms and shoulders.",
    ],
    equipment: ["Plates"],
  },
  "dumbbell-rear-delt-raise": {
    title: "Dumbbell Rear Delt Raise",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F0c661e1d08ac4b489063b365ab399570?format=webp&width=800",
    targetMusclesImage:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fdd0f028bfc5b45deb7d0f5b37fa3fe9f?format=webp&width=800",
    instructions: [
      "1. Grab a pair of dumbbells and stand in an upright posture with your feet at shoulder-width apart.",
      "2. Flex your knees and hinge at your hips to 90 degrees to position the dumbbells directly underneath your shoulders at knee height with your palms facing each other.",
      "3. Keeping your elbows slightly flexed and your back straight, raise the dumbbells out laterally with emphasis on tightening between your shoulder blades once the dumbbells reach shoulder height.",
      "4. Control the dumbbells as you return to the starting position.",
    ],
    equipment: ["Dumbbells"],
  },
  "dumbbell-back-fly": {
    title: "Dumbbell Back Fly",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fe73f890ca56e45558eb7831bf780c25d?format=webp&width=800",
    targetMusclesImage:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fdd0f028bfc5b45deb7d0f5b37fa3fe9f?format=webp&width=800",
    instructions: [
      "1. Grab a pair of dumbbells and position your chest on an incline bench while standing with knees slightly bent.",
      "2. Once in a comfortable position, position the dumbbells in front of your shoulders so your shoulders are at a 90 degree from your torso with palms facing forward.",
      "3. Keeping your elbows slightly flexed and your back straight, raise the dumbbells out laterally with emphasis on tightening between your shoulder blades once the dumbbells reach shoulder height.",
      "4. Control the dumbbells as you return to the starting position.",
    ],
    equipment: ["Dumbbells", "Incline Bench"],
  },
  "barbell-shoulder-press": {
    title: "Barbell Shoulder Press",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fb41775dbd32e4aff9df84d69bc407f94?format=webp&width=800",
    targetMusclesImage:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F58bc5031c1b943859596b90c2976b0ba?format=webp&width=800",
    instructions: [
      "1. Place the barbell at shoulder height and grab ahold the barbell shoulder-width apart.",
      "2. Quarter squat underneath the barbell and place the barbell on your upper chest.",
      "3. Turn your elbows underneath the barbell so that your forearms are vertical and your palms face upward before unracking the barbell and taking a step back.",
      "4. Begin to extend your arms overhead by pressing through your palms to lift the barbell vertically.",
      "5. The barbell should be aligned with your ears at full arm extension before descending it back to the starting position.",
    ],
    equipment: ["Barbells"],
  },
  "cable-row": {
    title: "Cable Row",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F75bfce957bd24b48b9a624e640228d6e?format=webp&width=800",
    targetMusclesImage:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F8f1528a0e40a414a8ccd457c0d0bc42d?format=webp&width=800",
    instructions: [
      "1. Position yourself on the bench, and place both feet on their respective foot plates. Bend your knees slightly.",
      "2. Lean forward, and grasp the handle with both hands, while keeping your back straight.",
      "3. Engage your back to pull the handles towards your torso.",
      "4. Simultaneously engage your lower back to lean back slightly.",
      "5. Pinch your shoulder blades together, and hold this position for a moment at the end of the movement.",
      "6. Slowly return to the starting position while maintaining tension in your back.",
    ],
    equipment: ["Row Cable"],
  },
  "dumbbell-row": {
    title: "Dumbbell Row",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F6628831781d04838abab430fe0d02e73?format=webp&width=800",
    targetMusclesImage:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F8f1528a0e40a414a8ccd457c0d0bc42d?format=webp&width=800",
    instructions: [
      "1. Place a dumbbell on each side of a flat bench.",
      "2. Place your right knee on top of the bench and right hand on the other side of the bench. Your torso should be parallel to the floor.",
      "3. Grasp a dumbbell with your left hand while keeping your back straight. The palm of your hand should face your torso.",
      "4. Pull the dumbbell straight up to the side of your torso. Engage the muscles in your back and breathe out as you perform this step. The torso should remain stationary as your arm moves.",
      "5. After a brief pause at the top of the movement, reverse this movement by lowering the dumbbell back to the starting position.",
    ],
    equipment: ["Dumbbells", "Flat Bench"],
  },
  "lat-pulldown": {
    title: "Lat Pulldown",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F626c1134f5954b599e21514d1c2224cd?format=webp&width=800",
    targetMusclesImage:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F8f1528a0e40a414a8ccd457c0d0bc42d?format=webp&width=800",
    instructions: [
      "1. Attach a bar to the pull-down pulley and grip it shoulder-width apart with your palms facing forward.",
      "2. Sit upright on the seat positioning your knees underneath the adjustable pad.",
      "3. Brace your core to maintain a neutral spine.",
      "4. With your arms extended overhead, flex your elbows to your the backside of your ribcage leaning back slightly.",
      "5. Extend your arms back to the starting position.",
    ],
    equipment: ["Lat Pulldown Cable"],
  },
  "pull-up": {
    title: "Pull Up",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fa04dd931e8264bdb84ac3215a4806e9b?format=webp&width=800",
    targetMusclesImage:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F051d928c3ada488d8a6d5bbb4cf95524?format=webp&width=800",
    instructions: [
      "1. Place your hands on the pull up bar with your palms facing away from your body.",
      "2. Brace your torso by breathing into your stomach and keeping your abdominal muscles flexed.",
      "3. Pull your chest up to the bar by flexing your elbows down into the backside of your ribcage.",
      "4. Once you have reached your chest to the bar, you will lower yourself back to the starting position.",
    ],
    equipment: ["Pull Up Bar"],
  },
  "barbell-curl": {
    title: "Barbell Curl",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F6474f488b5034abf85cdc2e4d11fce6c?format=webp&width=800",
    targetMusclesImage:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Feb0500fe98bb4b8eb5c6ff923d819a6c?format=webp&width=800",
    instructions: [
      "1. Stand in an upright posture grabbing ahold of a barbell shoulder-width apart with your palms facing away from your body just below waist height.",
      "2. Brace your core by breathing into your stomach and flexing your abdominal muscles as you begin to flex your elbows to raise the bar.",
      "3. Keep your elbows at your sides as you flex the barbell to shoulder height avoiding movement through your spine.",
      "4. Exhale and lower the barbell back to the starting position.",
    ],
    equipment: ["Barbells"],
  },
  "cross-body-hammer-curls": {
    title: "Cross Body Hammer Curls",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F553cb530b7ea4bbab49a0ff31f24ddc3?format=webp&width=800",
    targetMusclesImage:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F051d928c3ada488d8a6d5bbb4cf95524?format=webp&width=800",
    instructions: [
      "1. Grasp a dumbbell in each hand, and stand with your feet close to shoulder-width apart.",
      "2. Position each dumbbell in front of you with your palms facing your body.Bend your arms slightly at the elbow, and position your elbows close to shoulder-width apart.",
      "3. Raise one dumbbell in an arc toward your opposite shoulder by engaging the bicep of that arm. Lock your elbow in place for the duration of the exercise.",
      "4. Hold the dumbbell in position at the top of this movement for a moment. Maintain tension in your bicep as you bring the dumbbell back to position",
    ],
    equipment: ["Dumbbells"],
  },
  "cable-tricep-pushdown": {
    title: "Cable Tricep Pushdowns",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F431a39ee856b44a0bcc9d7a414ab5dab?format=webp&width=800",
    targetMusclesImage:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F051d928c3ada488d8a6d5bbb4cf95524?format=webp&width=800",
    instructions: [
      "1. Place pulley to the highest position with a straight or angled bar attachment.",
      "2. Grab ahold of the bar with an overhand grip, palms facing down, and pull your elbows to your sides and flexed to 90 degrees so your forearms are parallel with the floor.",
      "3. Brace your core to keep your spine neutral with your shoulders back, then extend your elbows while keeping them at your sides to completely extend your arms.",
      "4. Once you have reached full arm extension, flex your elbows back to the starting position.",
    ],
    equipment: ["Cable Machine", "Straight/Angled Bar Attachment"],
  },
  "one-arm-underhand-tricep-extension": {
    title: "One Arm Underhand Tricep Extension",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2Fb1455cd70c3c452b88c66b3fdc983b7b?format=webp&width=800",
    targetMusclesImage:
      "https://cdn.builder.io/api/v1/image/assets%2F2b2051e6b49f4e57abbdf7a6692fa1f3%2F051d928c3ada488d8a6d5bbb4cf95524?format=webp&width=800",
    instructions: [
      "1. Position your body such that one arm is in line with the cable. Grasp the handle with that hand such that your palm is facing up.Engage your tricep to bring the handle down by extending your arm at your elbow",
      "2. Allow your arm to rotate such that your palms are facing in towards you at the bottom of the movement. Tense your tricep and hold this position for a moment at the bottom of the movement",
      "3. Slowly allow the weight to return to the starting position while maintaining tension in your tricep.",
      "4. Maintain good body positioning by keeping your core engaged for stability, your elbow pinned to your side and your wrist straight throughout the movement.",
    ],
    equipment: ["Cable Machine", "Handle Attachment"],
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
          <h2 className="text-xl font-bold text-black leading-[140%]">
            {exercise.title}
          </h2>
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
          <h3 className="text-xl font-bold text-black mb-4 leading-[150%] tracking-[-0.2px]">
            Target Muscles
          </h3>
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
          <h3 className="text-xl font-bold text-black mb-3 leading-[150%] tracking-[-0.2px]">
            Instructions
          </h3>
          <div className="space-y-2">
            {exercise.instructions.map((instruction, index) => (
              <p
                key={index}
                className="text-[10px] font-bold text-black leading-[140%]"
              >
                {instruction}
              </p>
            ))}
          </div>
        </div>

        {/* Equipment Section */}
        <div className="px-6 py-4">
          <h3 className="text-xl font-bold text-black mb-2 leading-[150%] tracking-[-0.2px]">
            Equipment
          </h3>
          {exercise.equipment.map((item, index) => (
            <p
              key={index}
              className="text-xs font-bold text-black leading-[150%] tracking-[-0.12px]"
            >
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
                <span className="text-[15px] font-bold text-black leading-[140%]">
                  +
                </span>
                <span className="text-[15px] font-bold text-black leading-[140%]">
                  Tips
                </span>
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
