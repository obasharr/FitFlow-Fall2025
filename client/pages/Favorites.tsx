import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { getProfilePicture, getEmail } from "@/lib/auth";
import { getFavorites } from "@/lib/favorites";
import { exerciseDataForFavorites } from "@/lib/exercise-data";

export default function Favorites() {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(getProfilePicture());
  const [favoriteExercises, setFavoriteExercises] = useState<
    { name: string; image: string; displayName: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleStorageChange = () => {
      setProfilePicture(getProfilePicture());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const loadFavorites = async () => {
      const email = getEmail();
      if (email) {
        const favorites = await getFavorites(email);
        const exercisesWithData = favorites
          .map((exerciseName) => {
            const exerciseData = exerciseDataForFavorites[exerciseName];
            if (exerciseData) {
              return {
                name: exerciseName,
                image: exerciseData.image,
                displayName: exerciseData.title,
              };
            }
            return null;
          })
          .filter((ex) => ex !== null) as {
          name: string;
          image: string;
          displayName: string;
        }[];

        setFavoriteExercises(exercisesWithData);
      }
      setIsLoading(false);
    };

    loadFavorites();
  }, []);

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

      {/* Title */}
      <div className="px-4 py-6 text-center">
        <h2 className="text-2xl font-bold text-black">Favorites</h2>
      </div>

      {/* Main content - scrollable */}
      <div className="flex-1 overflow-y-auto px-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-black text-lg">Loading...</p>
          </div>
        ) : favoriteExercises.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-black text-lg">No favorites yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 py-4">
            {favoriteExercises.map((exercise) => (
              <div
                key={exercise.name}
                className="flex items-center gap-4 bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/exercise/${exercise.name}`)}
              >
                {/* Circular Image */}
                <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                  <img
                    src={exercise.image}
                    alt={exercise.displayName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Exercise Name */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-black">
                    {exercise.displayName}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Spacer */}
        <div className="h-6" />
      </div>
    </div>
  );
}
