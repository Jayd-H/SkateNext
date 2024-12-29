import { describe, test, expect, beforeEach } from "bun:test";
import { StorageService } from "../components/Utils/StorageService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type {
  MultiGetCallback,
  MultiCallback,
} from "@react-native-async-storage/async-storage/lib/typescript/types";

//* chatgpt helped me with a lot of the code here, credit to openai and whatnot
//* (im not too familiar with writing unit tests)

const mockStore = new Map<string, string>();

type KeyValuePair = [string, string | null];

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

AsyncStorage.removeItem = async (key: string): Promise<void> => {
  mockStore.delete(key);
  return Promise.resolve();
};

AsyncStorage.multiSet = async (
  keyValuePairs: readonly string[][]
): Promise<void> => {
  keyValuePairs.forEach(([key, value]) => mockStore.set(key, value));
  return Promise.resolve();
};

AsyncStorage.multiGet = async (
  keys: readonly string[],
  callback?: MultiGetCallback
): Promise<readonly KeyValuePair[]> => {
  const result = keys.map(
    (key) => [key, mockStore.get(key) ?? null] as KeyValuePair
  );
  if (callback) callback(null, result);
  return Promise.resolve(result);
};

AsyncStorage.multiRemove = async (
  keys: readonly string[],
  callback?: MultiCallback
): Promise<void> => {
  keys.forEach((key) => mockStore.delete(key));
  if (callback) callback(null);
  return Promise.resolve();
};

describe("StorageService", () => {
  beforeEach(async () => {
    mockStore.clear();
  });

  test("should check setup completion status", async () => {
    await AsyncStorage.setItem("setup_complete", "true");
    const isComplete = await StorageService.isSetupComplete();
    expect(isComplete).toBe(true);
  });

  test("should initialize with Beginner skill level", async () => {
    await StorageService.initializeWithSkillLevel("Beginner", 25, 70);
    const setupComplete = await AsyncStorage.getItem("setup_complete");
    const age = await AsyncStorage.getItem("user_age");
    const weight = await AsyncStorage.getItem("user_weight");
    expect(setupComplete).toBe("true");
    expect(age).toBe(JSON.stringify(25));
    expect(weight).toBe(JSON.stringify(70));
  });

  test("should initialize with Master skill level", async () => {
    await StorageService.initializeWithSkillLevel("Master", 30, 75);
    const trickStates = JSON.parse(
      (await AsyncStorage.getItem("trick_states")) || "{}"
    );
    expect(trickStates["ollie"]).toBe(2);
    expect(trickStates["kickflip"]).toBe(2);
    expect(trickStates["treflip"]).toBe(2);
  });

  test("should manage trick states", async () => {
    await StorageService.updateTrickState("kickflip", 1);
    const trickStates = await StorageService.getTrickStates();
    expect(trickStates["kickflip"]).toBe(1);

    await StorageService.updateTrickState("kickflip", 2);
    const updatedStates = await StorageService.getTrickStates();
    expect(updatedStates["kickflip"]).toBe(2);
  });

  test("should manage modal visit states", async () => {
    await StorageService.updateModalVisitState("lucky", true);
    const states = await StorageService.getModalVisitStates();
    expect(states.lucky).toBe(true);
    expect(states.search).toBe(false);
  });

  test("should track recent trick updates", async () => {
    await StorageService.updateTrickState("kickflip", 1);
    await StorageService.updateTrickState("kickflip", 2);
    const recentTricks = await StorageService.getRecentTrickUpdates();
    expect(recentTricks.length).toBeGreaterThan(0);
    expect(recentTricks[0].trickId).toBe("kickflip");
  });

  test("should manage timer state", async () => {
    const timerState = {
      isRunning: true,
      startTime: Date.now(),
      elapsedTime: 0,
    };
    await StorageService.saveTimerState(timerState);
    const retrievedState = await StorageService.getTimerState();
    expect(retrievedState?.isRunning).toBe(true);
  });

  test("should clear timer state", async () => {
    const timerState = {
      isRunning: true,
      startTime: Date.now(),
      elapsedTime: 0,
    };
    await StorageService.saveTimerState(timerState);
    await StorageService.clearTimerState();
    const retrievedState = await StorageService.getTimerState();
    expect(retrievedState).toBeNull();
  });

  test("should manage info states", async () => {
    await StorageService.updateInfoState("infoId1", true);
    const infoStates = await StorageService.getInfoStates();
    expect(infoStates["infoId1"]).toBe(true);
  });

  test("should manage haptics state", async () => {
    await StorageService.setHapticsEnabled(false);
    const enabled = await StorageService.getHapticsEnabled();
    expect(enabled).toBe(false);
  });

  test("should manage calorie logs", async () => {
    const date = "2024-03-29";
    const log = {
      date,
      sessions: [
        {
          timestamp: Date.now(),
          duration: 30,
          caloriesBurned: 150,
        },
      ],
      totalCalories: 150,
    };

    await StorageService.updateCalorieLog(date, log);
    const retrievedLog = await StorageService.getCalorieLog(date);
    expect(retrievedLog?.totalCalories).toBe(150);

    const allLogs = await StorageService.getAllCalorieLogs();
    expect(allLogs[date]).toBeDefined();
  });

  test("should clear all data", async () => {
    await StorageService.initializeWithSkillLevel("Beginner", 25, 70);
    await StorageService.updateTrickState("kickflip", 1);
    await StorageService.clearAllData();

    const setupComplete = await StorageService.isSetupComplete();
    const trickStates = await StorageService.getTrickStates();
    expect(setupComplete).toBe(false);
    expect(Object.keys(trickStates)).toHaveLength(0);
  });

  test("should get user stats", async () => {
    await StorageService.initializeWithSkillLevel("Beginner", 25, 70);
    const stats = await StorageService.getUserStats();
    expect(stats.age).toBe(25);
    expect(stats.weight).toBe(70);
    expect(stats.skillLevel).toBe("Beginner");
  });
});
