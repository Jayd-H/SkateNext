import { describe, test, expect, beforeEach, mock } from "bun:test";
import {
  BackupService,
  BackupError,
  IBackupData,
} from "../components/Utils/backupService";
import { StorageService } from "../components/Utils/StorageService";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock pako library
mock.module("pako", () => ({
  deflate: (data: Uint8Array) => new Uint8Array(data),
  inflate: (data: Uint8Array, options?: any) => {
    if (options?.to === "string") {
      return new TextDecoder().decode(data);
    }
    return data;
  },
}));

// Set up mock AsyncStorage
const mockStore = new Map<string, string>();

AsyncStorage.setItem = async (key: string, value: string): Promise<void> => {
  mockStore.set(key, value);
  return Promise.resolve();
};

AsyncStorage.getItem = async (key: string): Promise<string | null> => {
  return Promise.resolve(mockStore.get(key) ?? null);
};

AsyncStorage.clear = async (): Promise<void> => {
  mockStore.clear();
  return Promise.resolve();
};

AsyncStorage.multiRemove = async (keys: readonly string[]): Promise<void> => {
  keys.forEach((key) => mockStore.delete(key));
  return Promise.resolve();
};

describe("BackupService", () => {
  beforeEach(() => {
    mockStore.clear();
    mock.restore();
  });

  describe("createBackup", () => {
    test("should create a valid backup string", async () => {
      const testData = {
        trickStates: { ollie: 2, kickflip: 1 },
        age: 25,
        weight: 70,
        totalCalories: 1500,
        hapticsEnabled: true,
      };

      const backupString = await BackupService.createBackup(testData);

      expect(typeof backupString).toBe("string");
      expect(backupString.length).toBeGreaterThan(0);
    });

    test("should filter out zero trick states", async () => {
      const originalStringify = JSON.stringify;
      let processedData: any = null;

      JSON.stringify = function (value) {
        processedData = value;
        return originalStringify(value);
      };

      const testData = {
        trickStates: { ollie: 2, kickflip: 0, treflip: 1 },
        age: 25,
        weight: 70,
        totalCalories: 1500,
        hapticsEnabled: true,
      };

      await BackupService.createBackup(testData);

      JSON.stringify = originalStringify;

      expect(processedData.trickStates.ollie).toBe(2);
      expect(processedData.trickStates.treflip).toBe(1);
      expect(processedData.trickStates.kickflip).toBeUndefined();
    });

    test("should handle missing fields", async () => {
      const originalStringify = JSON.stringify;
      let processedData: any = null;

      JSON.stringify = function (value) {
        processedData = value;
        return originalStringify(value);
      };

      const testData = {
        trickStates: { ollie: 2 },
        hapticsEnabled: true,
      } as any;

      await BackupService.createBackup(testData);

      JSON.stringify = originalStringify;

      expect(processedData.age).toBe(0);
      expect(processedData.weight).toBe(0);
      expect(processedData.totalCalories).toBe(0);
    });

    test("should throw BackupError if string is too large", async () => {
      const largeTrickStates: { [key: string]: number } = {};

      for (let i = 0; i < 1000; i++) {
        largeTrickStates[`trick_${i}`] = i % 3;
      }

      const testData = {
        trickStates: largeTrickStates,
        age: 25,
        weight: 70,
        totalCalories: 1500,
        hapticsEnabled: true,
      };

      await expect(BackupService.createBackup(testData)).rejects.toThrow(
        BackupError
      );
    });
  });

  describe("validateFormat", () => {
    test("should return true for valid backup string", async () => {
      const testData = {
        trickStates: { ollie: 2 },
        age: 25,
        weight: 70,
        totalCalories: 1500,
        hapticsEnabled: true,
      };

      const backupString = await BackupService.createBackup(testData);
      const isValid = BackupService.validateFormat(backupString);

      expect(isValid).toBe(true);
    });

    test("should return false for invalid backup string", () => {
      const invalidBackupString = "this-is-not-a-valid-backup-string";
      const isValid = BackupService.validateFormat(invalidBackupString);

      expect(isValid).toBe(false);
    });

    test("should return false for too large backup string", () => {
      const tooLargeBackupString = "x".repeat(5000);
      const isValid = BackupService.validateFormat(tooLargeBackupString);

      expect(isValid).toBe(false);
    });
  });

  describe("restoreFromBackup", () => {
    test("should restore data from valid backup string", async () => {
      const testData = {
        trickStates: { ollie: 2, kickflip: 1 },
        age: 25,
        weight: 70,
        totalCalories: 1500,
        hapticsEnabled: true,
      };

      const backupString = await BackupService.createBackup(testData);
      const restoredData = await BackupService.restoreFromBackup(backupString);

      expect(restoredData.version).toBe(1);
      expect(restoredData.trickStates.ollie).toBe(2);
      expect(restoredData.trickStates.kickflip).toBe(1);
      expect(restoredData.age).toBe(25);
      expect(restoredData.weight).toBe(70);
      expect(restoredData.totalCalories).toBe(1500);
      expect(restoredData.hapticsEnabled).toBe(true);
    });

    test("should throw BackupError for invalid format", async () => {
      const invalidBackupString = "this-is-not-a-valid-backup-string";

      await expect(
        BackupService.restoreFromBackup(invalidBackupString)
      ).rejects.toThrow(BackupError);
    });

    test("should throw BackupError for version mismatch", async () => {
      const originalParse = JSON.parse;

      JSON.parse = function () {
        return {
          version: 999,
          trickStates: {},
          age: 0,
          weight: 0,
          totalCalories: 0,
          hapticsEnabled: false,
        };
      };

      const testData = {
        trickStates: { ollie: 2 },
        age: 25,
        weight: 70,
        totalCalories: 1500,
        hapticsEnabled: true,
      };

      const backupString = await BackupService.createBackup(testData);

      try {
        await expect(
          BackupService.restoreFromBackup(backupString)
        ).rejects.toThrow(BackupError);
      } finally {
        JSON.parse = originalParse;
      }
    });
  });
});

describe("StorageService Backup Integration", () => {
  beforeEach(() => {
    mockStore.clear();
    mock.restore();
  });

  describe("getAllDataForBackup", () => {
    test("should collect data and create backup string", async () => {
      await AsyncStorage.setItem(
        "trick_states",
        JSON.stringify({ ollie: 2, kickflip: 1 })
      );
      await AsyncStorage.setItem("user_age", "25");
      await AsyncStorage.setItem("user_weight", "70");
      await AsyncStorage.setItem(
        "calorie_logs",
        JSON.stringify({
          "2024-03-01": {
            date: "2024-03-01",
            sessions: [],
            totalCalories: 500,
          },
          "2024-03-02": {
            date: "2024-03-02",
            sessions: [],
            totalCalories: 700,
          },
        })
      );
      await AsyncStorage.setItem("haptics_enabled", "true");

      const originalCreateBackup = BackupService.createBackup;
      let backupParams: any = null;

      BackupService.createBackup = async function (data) {
        backupParams = data;
        return "mock-backup-string";
      };

      const backupString = await StorageService.getAllDataForBackup();

      BackupService.createBackup = originalCreateBackup;

      expect(backupParams.trickStates).toEqual({ ollie: 2, kickflip: 1 });
      expect(backupParams.age).toBe(25);
      expect(backupParams.weight).toBe(70);
      expect(backupParams.totalCalories).toBe(1200);
      expect(backupParams.hapticsEnabled).toBe(true);

      expect(backupString).toBe("mock-backup-string");
    });

    test("should handle missing data", async () => {
      const originalCreateBackup = BackupService.createBackup;
      let backupParams: any = null;

      BackupService.createBackup = async function (data) {
        backupParams = data;
        return "mock-backup-string";
      };

      await StorageService.getAllDataForBackup();

      BackupService.createBackup = originalCreateBackup;

      expect(backupParams.trickStates).toEqual({});
      expect(backupParams.age).toBe(0);
      expect(backupParams.weight).toBe(0);
      expect(backupParams.totalCalories).toBe(0);
      expect(backupParams.hapticsEnabled).toBe(false);
    });
  });

  describe("validateBackupString", () => {
    test("should validate format", () => {
      const originalValidateFormat = BackupService.validateFormat;
      let validateParams: any = null;

      BackupService.validateFormat = function (str) {
        validateParams = str;
        return true;
      };

      const result = StorageService.validateBackupString("mock-backup-string");

      BackupService.validateFormat = originalValidateFormat;

      expect(validateParams).toBe("mock-backup-string");
      expect(result).toBe(true);
    });
  });

  describe("restoreFromBackup", () => {
    test("should restore data from backup string", async () => {
      const mockBackupData = {
        version: 1,
        trickStates: { ollie: 2, kickflip: 1 },
        age: 25,
        weight: 70,
        totalCalories: 1200,
        hapticsEnabled: true,
      };

      const originalRestoreFromBackup = BackupService.restoreFromBackup;

      BackupService.restoreFromBackup = async function () {
        return mockBackupData;
      };

      await StorageService.restoreFromBackup("mock-backup-string");

      BackupService.restoreFromBackup = originalRestoreFromBackup;

      expect(JSON.parse(mockStore.get("trick_states") || "{}")).toEqual({
        ollie: 2,
        kickflip: 1,
      });
      expect(mockStore.get("user_age")).toBe("25");
      expect(mockStore.get("user_weight")).toBe("70");
      expect(mockStore.get("haptics_enabled")).toBe("true");
      expect(mockStore.get("setup_complete")).toBe("true");

      expect(JSON.parse(mockStore.get("info_states") || "{}")).toEqual({});
      expect(JSON.parse(mockStore.get("modal_visits") || "{}")).toEqual({
        lucky: false,
        search: false,
      });
      expect(JSON.parse(mockStore.get("recent_tricks") || "[]")).toEqual([]);
    });

    test("should migrate calories when backup has more", async () => {
      await AsyncStorage.setItem(
        "calorie_logs",
        JSON.stringify({
          "2024-03-01": {
            date: "2024-03-01",
            sessions: [{ timestamp: 1, duration: 30, caloriesBurned: 500 }],
            totalCalories: 500,
          },
        })
      );

      const mockBackupData = {
        version: 1,
        trickStates: {},
        age: 0,
        weight: 0,
        totalCalories: 1200,
        hapticsEnabled: false,
      };

      const originalRestoreFromBackup = BackupService.restoreFromBackup;
      const originalDateNow = Date.now;

      BackupService.restoreFromBackup = async function () {
        return mockBackupData;
      };

      Date.now = function () {
        return 1000;
      };

      await StorageService.restoreFromBackup("mock-backup-string");

      BackupService.restoreFromBackup = originalRestoreFromBackup;
      Date.now = originalDateNow;

      const calorieLogs = JSON.parse(mockStore.get("calorie_logs") || "{}");

      const today = new Date().toISOString().split("T")[0];
      expect(calorieLogs[today]).toBeDefined();
      expect(calorieLogs[today].totalCalories).toBe(700);

      const todayLog = calorieLogs[today];
      expect(todayLog.sessions.length).toBe(1);
      expect(todayLog.sessions[0].caloriesBurned).toBe(700);
      expect(todayLog.sessions[0].duration).toBe(0);
      expect(todayLog.sessions[0].timestamp).toBe(1000);
    });

    test("should not migrate calories when backup has fewer", async () => {
      await AsyncStorage.setItem(
        "calorie_logs",
        JSON.stringify({
          "2024-03-01": {
            date: "2024-03-01",
            sessions: [{ timestamp: 1, duration: 30, caloriesBurned: 1500 }],
            totalCalories: 1500,
          },
        })
      );

      const mockBackupData = {
        version: 1,
        trickStates: {},
        age: 0,
        weight: 0,
        totalCalories: 1000,
        hapticsEnabled: false,
      };

      const originalRestoreFromBackup = BackupService.restoreFromBackup;

      BackupService.restoreFromBackup = async function () {
        return mockBackupData;
      };

      await StorageService.restoreFromBackup("mock-backup-string");

      BackupService.restoreFromBackup = originalRestoreFromBackup;

      const calorieLogs = JSON.parse(mockStore.get("calorie_logs") || "{}");

      const keys = Object.keys(calorieLogs);
      expect(keys.length).toBe(1);
      expect(keys[0]).toBe("2024-03-01");
      expect(calorieLogs["2024-03-01"].totalCalories).toBe(1500);
    });

    test("should handle errors during restore", async () => {
      const originalRestoreFromBackup = BackupService.restoreFromBackup;

      BackupService.restoreFromBackup = async function () {
        throw new BackupError("Test error", "TEST_ERROR");
      };

      await expect(
        StorageService.restoreFromBackup("mock-backup-string")
      ).rejects.toThrow();

      BackupService.restoreFromBackup = originalRestoreFromBackup;
    });
  });
});
