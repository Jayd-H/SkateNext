import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { StorageService } from "./components/StorageService";
import AgeSelector from "./components/AgeSelector";
import SkillLevelSelector from "./components/SkillLevelSelector";

type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Master";

export default function Home() {
  const [age, setAge] = useState<number | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isCheckingSetup, setIsCheckingSetup] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkSetup();
  }, []);

  const checkSetup = async () => {
    try {
      const setupComplete = await StorageService.isSetupComplete();
      if (setupComplete) {
        router.replace("/tabs/map");
      }
    } catch (error) {
      console.error("Error checking setup:", error);
    } finally {
      setIsCheckingSetup(false);
    }
  };

  const handleAgeComplete = (selectedAge: number) => {
    setAge(selectedAge);
  };

  const handleSkillLevelComplete = async (selectedLevel: SkillLevel) => {
    if (!age) return;

    setIsInitializing(true);
    try {
      await StorageService.initializeWithSkillLevel(selectedLevel, age);
      router.replace("/tabs/map");
    } catch (error) {
      console.error("Error initializing app:", error);
      setIsInitializing(false);
    }
  };

  if (isCheckingSetup) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      {age === null ? (
        <AgeSelector onComplete={handleAgeComplete} />
      ) : (
        <SkillLevelSelector
          onComplete={handleSkillLevelComplete}
          isLoading={isInitializing}
        />
      )}
    </View>
  );
}
