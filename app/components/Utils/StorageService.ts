import AsyncStorage from "@react-native-async-storage/async-storage";
import { TRICK_DATA } from "../Data/trickData";
import { useState, useEffect } from "react";
import { BackupService, IBackupData } from "./backupService";

type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Master";

export interface TrickState {
  [trickId: string]: number;
}

interface InfoState {
  [infoId: string]: boolean;
}

interface ModalVisitState {
  lucky: boolean;
  search: boolean;
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

interface RecentTrickUpdate {
  trickId: string;
  timestamp: number;
}

interface SafetyPopupPreferences {
  dontShowAgain: boolean;
  lastShownTimestamp: number;
}

interface BackupData {
  version: number;
  timestamp: number;
  trickStates: TrickState;
  infoStates: InfoState;
  modalVisits: ModalVisitState;
  userAge: number;
  userWeight: number;
  calorieLogs: { [date: string]: DailyCalorieLog };
  hapticsEnabled: boolean;
  recentTricks: RecentTrickUpdate[];
}

export const STORAGE_KEYS = {
  TRICK_STATES: "trick_states",
  INFO_STATES: "info_states",
  USER_AGE: "user_age",
  USER_WEIGHT: "user_weight",
  SETUP_COMPLETE: "setup_complete",
  CALORIE_LOGS: "calorie_logs",
  MODAL_VISITS: "modal_visits",
  TIMER_STATE: "timer_state",
  HAPTICS_ENABLED: "haptics_enabled",
  RECENT_TRICKS: "recent_tricks",
  SAFETY_POPUP_PREFS: "safety_popup_prefs",
  BLACKLISTED_TRICKS: "blacklisted_tricks",
} as const;

const BOSS_TRICKS = {
  ollie: { id: "ollie", difficulty: 2 },
  kickflip: { id: "kickflip", difficulty: 6 },
  treflip: { id: "treflip", difficulty: 10 },
} as const;

interface TimerState {
  isRunning: boolean;
  startTime: number | null;
  elapsedTime: number;
}

class StorageService {
  static async getAllDataForBackup(): Promise<string> {
    try {
      const [trickStates, userAge, userWeight, calorieLogs, hapticsEnabled] =
        await Promise.all([
          this.getTrickStates(),
          AsyncStorage.getItem(STORAGE_KEYS.USER_AGE),
          AsyncStorage.getItem(STORAGE_KEYS.USER_WEIGHT),
          this.getAllCalorieLogs(),
          this.getHapticsEnabled(),
        ]);

      const totalCalories = Object.values(calorieLogs).reduce(
        (sum, log) => sum + (log.totalCalories || 0),
        0
      );

      const backupData: Omit<IBackupData, "version"> = {
        trickStates,
        age: userAge ? parseInt(userAge) : 0,
        weight: userWeight ? parseInt(userWeight) : 0,
        totalCalories,
        hapticsEnabled,
      };

      return await BackupService.createBackup(backupData);
    } catch (error) {
      console.error("Error creating backup:", error);
      throw error;
    }
  }

  static validateBackupString(backupString: string): boolean {
    return BackupService.validateFormat(backupString);
  }

  static async restoreFromBackup(backupString: string): Promise<void> {
    try {
      const backupData = await BackupService.restoreFromBackup(backupString);

      await Promise.all([
        AsyncStorage.setItem(
          STORAGE_KEYS.TRICK_STATES,
          JSON.stringify(backupData.trickStates)
        ),
        AsyncStorage.setItem(STORAGE_KEYS.USER_AGE, backupData.age.toString()),
        AsyncStorage.setItem(
          STORAGE_KEYS.USER_WEIGHT,
          backupData.weight.toString()
        ),
        AsyncStorage.setItem(
          STORAGE_KEYS.HAPTICS_ENABLED,
          backupData.hapticsEnabled.toString()
        ),
        AsyncStorage.setItem(STORAGE_KEYS.SETUP_COMPLETE, "true"),
      ]);

      const initialStates = {
        [STORAGE_KEYS.INFO_STATES]: {},
        [STORAGE_KEYS.MODAL_VISITS]: { lucky: false, search: false },
        [STORAGE_KEYS.RECENT_TRICKS]: [],
      };

      await Promise.all(
        Object.entries(initialStates).map(([key, value]) =>
          AsyncStorage.setItem(key, JSON.stringify(value))
        )
      );

      // Handle calories from backup
      if (backupData.totalCalories > 0) {
        // Get existing calorie logs
        const existingLogs = await this.getAllCalorieLogs();

        // Calculate current total calories from logs
        const currentTotalCalories = Object.values(existingLogs).reduce(
          (sum, log) => sum + (log?.totalCalories || 0),
          0
        );

        // Check if we need to add calories (only if backup has more)
        if (backupData.totalCalories > currentTotalCalories) {
          const missingCalories =
            backupData.totalCalories - currentTotalCalories;

          // Create a migration entry for the missing calories
          const today = new Date().toISOString().split("T")[0];

          // Check if we already have a log for today
          const todayLog = await this.getCalorieLog(today);

          const migrationSession = {
            timestamp: Date.now(),
            duration: 0,
            caloriesBurned: missingCalories,
          };

          const updatedLog = todayLog
            ? {
                ...todayLog,
                sessions: [...todayLog.sessions, migrationSession],
                totalCalories: todayLog.totalCalories + missingCalories,
              }
            : {
                date: today,
                sessions: [migrationSession],
                totalCalories: missingCalories,
              };

          await this.updateCalorieLog(today, updatedLog);
          console.log(`Restored ${missingCalories} calories from backup`);
        }
      }
    } catch (error) {
      console.error("Error restoring backup:", error);
      throw error;
    }
  }

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

  // Get the list of blacklisted trick IDs
  static async getBlacklistedTricks(): Promise<string[]> {
    try {
      const blacklistedTricks = await AsyncStorage.getItem(
        STORAGE_KEYS.BLACKLISTED_TRICKS
      );
      return blacklistedTricks ? JSON.parse(blacklistedTricks) : [];
    } catch (error) {
      console.error("Error getting blacklisted tricks:", error);
      return [];
    }
  }

  // Add a trick to the blacklist
  static async addTrickToBlacklist(trickId: string): Promise<void> {
    try {
      const blacklistedTricks = await this.getBlacklistedTricks();
      if (!blacklistedTricks.includes(trickId)) {
        blacklistedTricks.push(trickId);
        await AsyncStorage.setItem(
          STORAGE_KEYS.BLACKLISTED_TRICKS,
          JSON.stringify(blacklistedTricks)
        );
      }
    } catch (error) {
      console.error("Error adding trick to blacklist:", error);
      throw error;
    }
  }

  // Remove a trick from the blacklist
  static async removeTrickFromBlacklist(trickId: string): Promise<void> {
    try {
      const blacklistedTricks = await this.getBlacklistedTricks();
      const updatedBlacklist = blacklistedTricks.filter((id) => id !== trickId);
      await AsyncStorage.setItem(
        STORAGE_KEYS.BLACKLISTED_TRICKS,
        JSON.stringify(updatedBlacklist)
      );
    } catch (error) {
      console.error("Error removing trick from blacklist:", error);
      throw error;
    }
  }

  static async getSafetyPopupPreferences(): Promise<SafetyPopupPreferences> {
    try {
      const prefs = await AsyncStorage.getItem(STORAGE_KEYS.SAFETY_POPUP_PREFS);
      return prefs
        ? JSON.parse(prefs)
        : { dontShowAgain: false, lastShownTimestamp: 0 };
    } catch (error) {
      console.error("Error getting safety popup preferences:", error);
      return { dontShowAgain: false, lastShownTimestamp: 0 };
    }
  }

  static async updateSafetyPopupPreferences(
    prefs: Partial<SafetyPopupPreferences>
  ): Promise<void> {
    try {
      const currentPrefs = await this.getSafetyPopupPreferences();
      const updatedPrefs = {
        ...currentPrefs,
        ...prefs,
      };
      await AsyncStorage.setItem(
        STORAGE_KEYS.SAFETY_POPUP_PREFS,
        JSON.stringify(updatedPrefs)
      );
    } catch (error) {
      console.error("Error updating safety popup preferences:", error);
      throw error;
    }
  }

  static async updateAge(age: number): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_AGE, age.toString());
    } catch (error) {
      console.error("Error updating age:", error);
      throw error;
    }
  }

  static async updateWeight(weight: number): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_WEIGHT, weight.toString());
    } catch (error) {
      console.error("Error updating weight:", error);
      throw error;
    }
  }

  static async getHapticsEnabled(): Promise<boolean> {
    try {
      const enabled = await AsyncStorage.getItem(STORAGE_KEYS.HAPTICS_ENABLED);
      return enabled === "true";
    } catch (error) {
      console.error("Error getting haptics state:", error);
      return true;
    }
  }

  static async setHapticsEnabled(enabled: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.HAPTICS_ENABLED,
        enabled.toString()
      );
    } catch (error) {
      console.error("Error setting haptics state:", error);
      throw error;
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
      const initialModalVisits: ModalVisitState = {
        lucky: false,
        search: false,
      };

      const initialHaptics = true;
      await AsyncStorage.setItem(
        STORAGE_KEYS.HAPTICS_ENABLED,
        initialHaptics.toString()
      );

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
        AsyncStorage.setItem(
          STORAGE_KEYS.MODAL_VISITS,
          JSON.stringify(initialModalVisits)
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

  static async getModalVisitStates(): Promise<ModalVisitState> {
    try {
      const states = await AsyncStorage.getItem(STORAGE_KEYS.MODAL_VISITS);
      return states ? JSON.parse(states) : { lucky: false, search: false };
    } catch (error) {
      console.error("Error getting modal visit states:", error);
      return { lucky: false, search: false };
    }
  }

  static async getRecentTrickUpdates(): Promise<RecentTrickUpdate[]> {
    try {
      const recentTricks = await AsyncStorage.getItem(
        STORAGE_KEYS.RECENT_TRICKS
      );
      return recentTricks ? JSON.parse(recentTricks) : [];
    } catch (error) {
      console.error("Error getting recent trick updates:", error);
      return [];
    }
  }

  static async addRecentTrickUpdate(
    trickId: string,
    oldState: number,
    newState: number
  ): Promise<void> {
    try {
      // Only add to recent if the state increased
      if (newState <= oldState) return;

      const recentTricks = await this.getRecentTrickUpdates();

      // Add new trick to front of array
      recentTricks.unshift({
        trickId,
        timestamp: Date.now(),
      });

      // Keep only the 5 most recent
      const updatedTricks = recentTricks.slice(0, 5);

      await AsyncStorage.setItem(
        STORAGE_KEYS.RECENT_TRICKS,
        JSON.stringify(updatedTricks)
      );
    } catch (error) {
      console.error("Error updating recent tricks:", error);
    }
  }

  static async updateModalVisitState(
    modalId: keyof ModalVisitState,
    visited: boolean
  ): Promise<void> {
    try {
      const currentStates = await this.getModalVisitStates();
      const updatedStates = {
        ...currentStates,
        [modalId]: visited,
      };
      await AsyncStorage.setItem(
        STORAGE_KEYS.MODAL_VISITS,
        JSON.stringify(updatedStates)
      );
    } catch (error) {
      console.error("Error updating modal visit state:", error);
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
      const oldState = currentStates[trickId] || 0;

      const updatedStates = {
        ...currentStates,
        [trickId]: state,
      };

      await Promise.all([
        AsyncStorage.setItem(
          STORAGE_KEYS.TRICK_STATES,
          JSON.stringify(updatedStates)
        ),
        this.addRecentTrickUpdate(trickId, oldState, state),
      ]);
    } catch (error) {
      console.error("Error updating trick state:", error);
      throw error;
    }
  }

  static async saveTimerState(state: TimerState): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.TIMER_STATE,
        JSON.stringify(state)
      );
    } catch (error) {
      console.error("Error saving timer state:", error);
      throw error;
    }
  }

  static async getTimerState(): Promise<TimerState | null> {
    try {
      const state = await AsyncStorage.getItem(STORAGE_KEYS.TIMER_STATE);
      return state ? JSON.parse(state) : null;
    } catch (error) {
      console.error("Error getting timer state:", error);
      return null;
    }
  }

  static async clearTimerState(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.TIMER_STATE);
    } catch (error) {
      console.error("Error clearing timer state:", error);
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
        STORAGE_KEYS.MODAL_VISITS,
        STORAGE_KEYS.TIMER_STATE,
        STORAGE_KEYS.HAPTICS_ENABLED,
        STORAGE_KEYS.RECENT_TRICKS,
        STORAGE_KEYS.SAFETY_POPUP_PREFS,
        STORAGE_KEYS.BLACKLISTED_TRICKS,
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

export function useSafetyPopupPreferences() {
  const [safetyPopupPrefs, setSafetyPopupPrefs] =
    useState<SafetyPopupPreferences>({
      dontShowAgain: false,
      lastShownTimestamp: 0,
    });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSafetyPopupPreferences();
  }, []);

  const loadSafetyPopupPreferences = async () => {
    try {
      const prefs = await StorageService.getSafetyPopupPreferences();
      setSafetyPopupPrefs(prefs);
    } catch (error) {
      console.error("Error loading safety popup preferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSafetyPopupPreferences = async (
    prefs: Partial<SafetyPopupPreferences>
  ) => {
    await StorageService.updateSafetyPopupPreferences(prefs);
    setSafetyPopupPrefs((prev) => ({
      ...prev,
      ...prefs,
    }));
  };

  return {
    safetyPopupPrefs,
    isLoading,
    updateSafetyPopupPreferences,
  };
}

export function useTrickStates() {
  const [trickStates, setTrickStates] = useState<TrickState>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTrickStates();
  }, []);

  const loadTrickStates = async () => {
    try {
      const states = await StorageService.getTrickStates();
      setTrickStates(states);
    } catch (error) {
      console.error("Error loading trick states:", error);
    } finally {
      setIsLoading(false);
    }
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

export function useModalVisitStates() {
  const [modalVisitStates, setModalVisitStates] = useState<ModalVisitState>({
    lucky: false,
    search: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadModalVisitStates();
  }, []);

  const loadModalVisitStates = async () => {
    setIsLoading(true);
    const states = await StorageService.getModalVisitStates();
    setModalVisitStates(states);
    setIsLoading(false);
  };

  const updateModalVisitState = async (
    modalId: keyof ModalVisitState,
    visited: boolean
  ) => {
    await StorageService.updateModalVisitState(modalId, visited);
    setModalVisitStates((prev) => ({
      ...prev,
      [modalId]: visited,
    }));
  };

  return { modalVisitStates, isLoading, updateModalVisitState };
}

export function useBlacklistedTricks() {
  const [blacklistedTricks, setBlacklistedTricks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBlacklistedTricks();
  }, []);

  const loadBlacklistedTricks = async () => {
    try {
      const tricks = await StorageService.getBlacklistedTricks();
      setBlacklistedTricks(tricks);
    } catch (error) {
      console.error("Error loading blacklisted tricks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTrickToBlacklist = async (trickId: string) => {
    await StorageService.addTrickToBlacklist(trickId);
    setBlacklistedTricks((prev) => [...prev, trickId]);
  };

  const removeTrickFromBlacklist = async (trickId: string) => {
    await StorageService.removeTrickFromBlacklist(trickId);
    setBlacklistedTricks((prev) => prev.filter((id) => id !== trickId));
  };

  return {
    blacklistedTricks,
    isLoading,
    addTrickToBlacklist,
    removeTrickFromBlacklist,
    refreshBlacklistedTricks: loadBlacklistedTricks,
  };
}

export function useInfoStates() {
  const [infoStates, setInfoStates] = useState<InfoState>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInfoStates();
  }, []);

  const loadInfoStates = async () => {
    try {
      const states = await StorageService.getInfoStates();
      setInfoStates(states);
    } catch (error) {
      console.error("Error loading info states:", error);
    } finally {
      setIsLoading(false);
    }
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
