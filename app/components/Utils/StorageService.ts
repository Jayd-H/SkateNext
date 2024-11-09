import AsyncStorage from "@react-native-async-storage/async-storage";
import { TRICK_DATA } from "../Data/trickData";
import { useState, useEffect } from "react";

type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Master";

export interface TrickState {
  [trickId: string]: number;
}

interface InfoState {
  [infoId: string]: boolean;
}

interface CalorieSession {
  timestamp: number;
  duration: number;
  caloriesBurned: number;
}

interface DailyCalorieLog {
  date: string;
  sessions: CalorieSession[];
  totalCalories: number;
}

export const STORAGE_KEYS = {
  TRICK_STATES: "trick_states",
  INFO_STATES: "info_states",
  USER_AGE: "user_age",
  USER_WEIGHT: "user_weight",
  SETUP_COMPLETE: "setup_complete",
  CALORIE_LOGS: "calorie_logs",
} as const;

const BOSS_TRICKS = {
  ollie: { id: "ollie", difficulty: 2 },
  kickflip: { id: "kickflip", difficulty: 6 },
  treflip: { id: "treflip", difficulty: 10 },
} as const;

class StorageService {
  static async isSetupComplete(): Promise<boolean> {
    try {
      const setupComplete = await AsyncStorage.getItem(
        STORAGE_KEYS.SETUP_COMPLETE
      );
      return setupComplete === "true";
    } catch (error) {
      console.error("Error checking setup status:", error);
      return false;
    }
  }

  static async initializeWithSkillLevel(
    skillLevel: SkillLevel,
    age: number,
    weight: number
  ): Promise<void> {
    try {
      const initialTrickStates: TrickState = {};
      const initialInfoStates: InfoState = {};

      TRICK_DATA.forEach((trick) => {
        initialTrickStates[trick.id] = 0;
      });

      if (skillLevel === "Master" || skillLevel === "Advanced") {
        initialTrickStates[BOSS_TRICKS.ollie.id] = 2;
        initialTrickStates[BOSS_TRICKS.kickflip.id] = 2;

        if (skillLevel === "Master") {
          initialTrickStates[BOSS_TRICKS.treflip.id] = 2;
        }

        TRICK_DATA.forEach((trick) => {
          if (
            parseInt(trick.difficulty) < 6 &&
            initialTrickStates[trick.id] !== 2
          ) {
            initialTrickStates[trick.id] = 1;
          }
        });
      } else if (skillLevel === "Intermediate") {
        initialTrickStates[BOSS_TRICKS.ollie.id] = 2;

        TRICK_DATA.forEach((trick) => {
          if (
            parseInt(trick.difficulty) < 3 &&
            initialTrickStates[trick.id] !== 2
          ) {
            initialTrickStates[trick.id] = 1;
          }
        });
      }

      await Promise.all([
        AsyncStorage.setItem(
          STORAGE_KEYS.TRICK_STATES,
          JSON.stringify(initialTrickStates)
        ),
        AsyncStorage.setItem(
          STORAGE_KEYS.INFO_STATES,
          JSON.stringify(initialInfoStates)
        ),
        AsyncStorage.setItem(STORAGE_KEYS.USER_AGE, JSON.stringify(age)),
        AsyncStorage.setItem(STORAGE_KEYS.USER_WEIGHT, JSON.stringify(weight)),
        AsyncStorage.setItem(STORAGE_KEYS.SETUP_COMPLETE, "true"),
      ]);
    } catch (error) {
      console.error("Error initializing storage:", error);
      throw error;
    }
  }

  static async getTrickStates(): Promise<TrickState> {
    try {
      const states = await AsyncStorage.getItem(STORAGE_KEYS.TRICK_STATES);
      return states ? JSON.parse(states) : {};
    } catch (error) {
      console.error("Error getting trick states:", error);
      return {};
    }
  }

  static async getInfoStates(): Promise<InfoState> {
    try {
      const states = await AsyncStorage.getItem(STORAGE_KEYS.INFO_STATES);
      return states ? JSON.parse(states) : {};
    } catch (error) {
      console.error("Error getting info states:", error);
      return {};
    }
  }

  static async updateTrickState(trickId: string, state: number): Promise<void> {
    try {
      const currentStates = await this.getTrickStates();
      const updatedStates = {
        ...currentStates,
        [trickId]: state,
      };
      await AsyncStorage.setItem(
        STORAGE_KEYS.TRICK_STATES,
        JSON.stringify(updatedStates)
      );
    } catch (error) {
      console.error("Error updating trick state:", error);
      throw error;
    }
  }

  static async updateInfoState(infoId: string, state: boolean): Promise<void> {
    try {
      const currentStates = await this.getInfoStates();
      const updatedStates = {
        ...currentStates,
        [infoId]: state,
      };
      await AsyncStorage.setItem(
        STORAGE_KEYS.INFO_STATES,
        JSON.stringify(updatedStates)
      );
    } catch (error) {
      console.error("Error updating info state:", error);
      throw error;
    }
  }

  static async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.TRICK_STATES,
        STORAGE_KEYS.INFO_STATES,
        STORAGE_KEYS.USER_AGE,
        STORAGE_KEYS.USER_WEIGHT,
        STORAGE_KEYS.SETUP_COMPLETE,
        STORAGE_KEYS.CALORIE_LOGS,
      ]);
    } catch (error) {
      console.error("Error clearing data:", error);
      throw error;
    }
  }

  static async getUserStats(): Promise<{
    age: number;
    weight: number;
    skillLevel: SkillLevel;
  }> {
    try {
      const [age, weight] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER_AGE),
        AsyncStorage.getItem(STORAGE_KEYS.USER_WEIGHT),
      ]);

      return {
        age: age ? JSON.parse(age) : 0,
        weight: weight ? JSON.parse(weight) : 0,
        skillLevel: "Beginner", // You'll need to store and retrieve this
      };
    } catch (error) {
      console.error("Error getting user stats:", error);
      throw error;
    }
  }

  static async getCalorieLog(date: string): Promise<DailyCalorieLog | null> {
    try {
      const logs = await AsyncStorage.getItem(STORAGE_KEYS.CALORIE_LOGS);
      if (!logs) return null;

      const allLogs = JSON.parse(logs);
      return allLogs[date] || null;
    } catch (error) {
      console.error("Error getting calorie log:", error);
      throw error;
    }
  }

  static async updateCalorieLog(
    date: string,
    log: DailyCalorieLog
  ): Promise<void> {
    try {
      const logsStr = await AsyncStorage.getItem(STORAGE_KEYS.CALORIE_LOGS);
      const logs = logsStr ? JSON.parse(logsStr) : {};

      logs[date] = log;
      await AsyncStorage.setItem(
        STORAGE_KEYS.CALORIE_LOGS,
        JSON.stringify(logs)
      );
    } catch (error) {
      console.error("Error updating calorie log:", error);
      throw error;
    }
  }

  static async getAllCalorieLogs(): Promise<{
    [date: string]: DailyCalorieLog;
  }> {
    try {
      const logs = await AsyncStorage.getItem(STORAGE_KEYS.CALORIE_LOGS);
      return logs ? JSON.parse(logs) : {};
    } catch (error) {
      console.error("Error getting all calorie logs:", error);
      throw error;
    }
  }
}

export function useTrickStates() {
  const [trickStates, setTrickStates] = useState<TrickState>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTrickStates();
  }, []);

  const loadTrickStates = async () => {
    setIsLoading(true);
    const states = await StorageService.getTrickStates();
    setTrickStates(states);
    setIsLoading(false);
  };

  const updateTrickState = async (trickId: string, state: number) => {
    await StorageService.updateTrickState(trickId, state);
    setTrickStates((prev) => ({
      ...prev,
      [trickId]: state,
    }));
  };

  return { trickStates, isLoading, updateTrickState };
}

export function useInfoStates() {
  const [infoStates, setInfoStates] = useState<InfoState>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInfoStates();
  }, []);

  const loadInfoStates = async () => {
    setIsLoading(true);
    const states = await StorageService.getInfoStates();
    setInfoStates(states);
    setIsLoading(false);
  };

  const updateInfoState = async (infoId: string, state: boolean) => {
    await StorageService.updateInfoState(infoId, state);
    setInfoStates((prev) => ({
      ...prev,
      [infoId]: state,
    }));
  };

  return { infoStates, isLoading, updateInfoState };
}

export { StorageService };