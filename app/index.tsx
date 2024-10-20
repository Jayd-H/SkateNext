import React, { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import AgeSelector from "./components/AgeSelector";
import SkillLevelSelector from "./components/SkillLevelSelector";

type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Master";

export default function Home() {
  const [age, setAge] = useState<number | null>(null);
  const router = useRouter();

  const handleAgeComplete = (selectedAge: number) => {
    setAge(selectedAge);
  };

  const handleSkillLevelComplete = (selectedLevel: SkillLevel) => {
    // this gets sent to console for now but will be used later.... perhaps
    console.log("User age:", age);
    console.log("User skill level:", selectedLevel);
    router.replace("/tabs/map");
  };

  return (
    <View className="flex-1">
      {age === null ? (
        <AgeSelector onComplete={handleAgeComplete} />
      ) : (
        <SkillLevelSelector onComplete={handleSkillLevelComplete} />
      )}
    </View>
  );
}
