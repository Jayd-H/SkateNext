import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { StorageService } from "./components/Utils/StorageService";
import AgeSelector from "./components/AgeSelector";
import WeightSelector from "./components/WeightSelector";
import SkillLevelSelector from "./components/SkillLevelSelector";

type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Master";

const DEFAULT_WEIGHT = 70; // Average adult weight in kg

export default function Home() {
  const [age, setAge] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
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

  const handleWeightComplete = (selectedWeight: number | null) => {
    setWeight(selectedWeight || DEFAULT_WEIGHT);
  };

  const handleSkillLevelComplete = async (selectedLevel: SkillLevel) => {
    if (!age || !weight) return;

    setIsInitializing(true);
    try {
      await StorageService.initializeWithSkillLevel(selectedLevel, age, weight);
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

  if (age === null) {
    return <AgeSelector onComplete={handleAgeComplete} />;
  }

  if (weight === null) {
    return <WeightSelector onComplete={handleWeightComplete} />;
  }

  return (
    <SkillLevelSelector
      onComplete={handleSkillLevelComplete}
      isLoading={isInitializing}
    />
  );
}
