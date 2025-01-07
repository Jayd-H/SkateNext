import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { StorageService } from "./components/Utils/StorageService";
import AgeSelector from "./components/Onboarding/AgeSelector";
import WeightSelector from "./components/Onboarding/WeightSelector";
import SkillLevelSelector from "./components/Onboarding/SkillLevelSelector";

type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Master";
type WeightUnit = "kg" | "lbs" | "st";
const DEFAULT_WEIGHT = 70;

export default function Home() {
  const [age, setAge] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [displayWeight, setDisplayWeight] = useState<number>(DEFAULT_WEIGHT);
  const [displayUnit, setDisplayUnit] = useState<WeightUnit>("kg");
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

  const handleWeightComplete = (
    weightInKg: number | null,
    unit: WeightUnit,
    displayValue: number
  ) => {
    setWeight(weightInKg || DEFAULT_WEIGHT);
    setDisplayUnit(unit);
    setDisplayWeight(displayValue);
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

  const handleBack = () => {
    if (weight !== null) {
      setWeight(null);
    } else if (age !== null) {
      setAge(null);
    }
  };

  if (isCheckingSetup) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!age) {
    return <AgeSelector onComplete={handleAgeComplete} />;
  }

  if (!weight) {
    return (
      <WeightSelector
        onComplete={handleWeightComplete}
        onBack={handleBack}
        initialWeight={displayWeight}
        initialUnit={displayUnit}
      />
    );
  }

  return (
    <SkillLevelSelector
      onComplete={handleSkillLevelComplete}
      onBack={handleBack}
      isLoading={isInitializing}
    />
  );
}
