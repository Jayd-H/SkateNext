import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StorageService } from "./StorageService";
import { calculateSkateboardMastery } from "./masteryCalculation";
import { TRICK_DATA } from "../Data/trickData";

interface UserStats {
  accountCreated: string;
  timeSkated: string;
  caloriesBurnt: string;
  avgSkateSession: string;
  skullsCollected: string;
  completionPercentage: string;
  isLoading: boolean;
}

export function useUserStats(): UserStats {
  const [stats, setStats] = useState<UserStats>({
    accountCreated: "",
    timeSkated: "",
    caloriesBurnt: "",
    avgSkateSession: "",
    skullsCollected: "",
    completionPercentage: "",
    isLoading: true,
  });

  const loadStats = async () => {
    try {
      setStats((prev) => ({ ...prev, isLoading: true }));

      const [trickStates, calorieLogs] = await Promise.all([
        StorageService.getTrickStates(),
        StorageService.getAllCalorieLogs(),
      ]);

      // Calculate skulls (mastered tricks count as 1, in-progress as 0.5)
      const skullsEarned = Object.values(trickStates).reduce((total, state) => {
        if (state === 2) return total + 1;
        if (state === 1) return total + 0.5;
        return total;
      }, 0);

      // Calculate time and calories from logs
      let totalTimeInMinutes = 0;
      let totalCalories = 0;
      let sessionCount = 0;

      Object.values(calorieLogs).forEach((dayLog) => {
        dayLog.sessions.forEach((session) => {
          totalTimeInMinutes += session.duration;
          totalCalories += session.caloriesBurned;
          sessionCount++;
        });
      });

      // Convert minutes to days
      const timeInDays = (totalTimeInMinutes / (24 * 60)).toFixed(1);

      // Calculate average session length in hours
      const avgSessionHours =
        sessionCount > 0
          ? (totalTimeInMinutes / sessionCount / 60).toFixed(1)
          : "0";

      // Format date in British format (DD/MM/YY)
      const today = new Date();
      const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
        today.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${today.getFullYear().toString().slice(-2)}`;

      setStats({
        accountCreated: formattedDate, // This should come from setup completion date
        timeSkated: `${timeInDays} Days`,
        caloriesBurnt: `${Math.round(totalCalories)}kcal`,
        avgSkateSession: `${avgSessionHours} Hours`,
        skullsCollected: `${Math.floor(skullsEarned)}/${TRICK_DATA.length}`,
        completionPercentage: `${calculateSkateboardMastery(trickStates)}%`,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error loading user stats:", error);
      setStats((prev) => ({ ...prev, isLoading: false }));
    }
  };

  // Refetch data whenever the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [])
  );

  return stats;
}
