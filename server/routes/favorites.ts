import { Router } from "express";
import { supabaseRequest, getUserByEmail } from "../lib/supabase";

const router = Router();

interface FavoritesResponse {
  success: boolean;
  message?: string;
  data?: any;
}

// Get user favorites
router.post("/get-favorites", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID (email) is required",
      } as FavoritesResponse);
    }

    // Look up the user to get their actual UUID
    const user = await getUserByEmail(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      } as FavoritesResponse);
    }

    const result = await supabaseRequest<
      { id: string; exercise_name: string; created_at: string }[]
    >("GET", `/favorites?user_id=eq.${encodeURIComponent(user.id)}&select=*`);

    if (result.error) {
      return res.status(400).json({
        success: false,
        message: result.error.message,
      } as FavoritesResponse);
    }

    return res.json({
      success: true,
      data: result.data || [],
    } as FavoritesResponse);
  } catch (error) {
    console.error("Error getting favorites:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    } as FavoritesResponse);
  }
});

// Add favorite
router.post("/add-favorite", async (req, res) => {
  try {
    const { userId, exerciseName } = req.body;

    if (!userId || !exerciseName) {
      return res.status(400).json({
        success: false,
        message: "User ID and exercise name are required",
      } as FavoritesResponse);
    }

    const result = await supabaseRequest<
      | { id: string; user_id: string; exercise_name: string }[]
      | { id: string; user_id: string; exercise_name: string }
    >("POST", "/favorites", {
      user_id: userId,
      exercise_name: exerciseName,
    });

    if (result.error) {
      return res.status(400).json({
        success: false,
        message: result.error.message,
      } as FavoritesResponse);
    }

    return res.json({
      success: true,
      message: "Exercise added to favorites",
      data: result.data,
    } as FavoritesResponse);
  } catch (error) {
    console.error("Error adding favorite:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    } as FavoritesResponse);
  }
});

// Remove favorite
router.post("/remove-favorite", async (req, res) => {
  try {
    const { userId, exerciseName } = req.body;

    if (!userId || !exerciseName) {
      return res.status(400).json({
        success: false,
        message: "User ID and exercise name are required",
      } as FavoritesResponse);
    }

    const result = await supabaseRequest<null>(
      "DELETE",
      `/favorites?user_id=eq.${encodeURIComponent(userId)}&exercise_name=eq.${encodeURIComponent(exerciseName)}`
    );

    if (result.error) {
      return res.status(400).json({
        success: false,
        message: result.error.message,
      } as FavoritesResponse);
    }

    return res.json({
      success: true,
      message: "Exercise removed from favorites",
    } as FavoritesResponse);
  } catch (error) {
    console.error("Error removing favorite:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    } as FavoritesResponse);
  }
});

export default router;
