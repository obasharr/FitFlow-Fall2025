import { getEmail } from "./auth";

interface FavoritesResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export async function getFavorites(userId: string): Promise<string[]> {
  try {
    const response = await fetch("/api/favorites/get-favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    const data = (await response.json()) as FavoritesResponse;

    if (!data.success) {
      console.error("Error fetching favorites:", data.message);
      return [];
    }

    return (data.data || []).map((fav: any) => fav.exercise_name);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
}

export async function addFavorite(
  userId: string,
  exerciseName: string,
): Promise<boolean> {
  try {
    const response = await fetch("/api/favorites/add-favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, exerciseName }),
    });

    const data = (await response.json()) as FavoritesResponse;

    if (!data.success) {
      console.error("Error adding favorite:", data.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error adding favorite:", error);
    return false;
  }
}

export async function removeFavorite(
  userId: string,
  exerciseName: string,
): Promise<boolean> {
  try {
    const response = await fetch("/api/favorites/remove-favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, exerciseName }),
    });

    const data = (await response.json()) as FavoritesResponse;

    if (!data.success) {
      console.error("Error removing favorite:", data.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error removing favorite:", error);
    return false;
  }
}

export function getUserIdFromEmail(email: string | null): string | null {
  if (!email) return null;
  // For now, we'll use email as the user identifier
  // In a real app, you'd want to store the actual user ID
  return email;
}

export function getCurrentUserId(): string | null {
  const email = getEmail();
  return getUserIdFromEmail(email);
}
