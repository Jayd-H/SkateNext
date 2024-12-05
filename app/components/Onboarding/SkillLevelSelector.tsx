import React from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import BurningSkull from "../../../assets/icons/burning-skull.svg";
import ProgressIndicator from "./ProgressIndicator";
import BackgroundWave from "./BackgroundWave";

type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Master";

interface SkillLevelSelectorProps {
  onComplete: (level: SkillLevel) => void;
  onBack?: () => void;
  isLoading?: boolean;
}

const SkillLevelSelector: React.FC<SkillLevelSelectorProps> = ({
  onComplete,
  onBack,
  isLoading = false,
}) => {
  const getSkullCount = (level: SkillLevel): number => {
    switch (level) {
      case "Beginner":
        return 1;
      case "Intermediate":
        return 2;
      case "Advanced":
        return 3;
      case "Master":
        return 5;
    }
  };

  const handleButtonPress = (level: SkillLevel) => {
    if (!isLoading) {
      onComplete(level);
    }
  };

  const getLevelDescription = (level: SkillLevel): string => {
    switch (level) {
      case "Beginner":
        return "I'm completely new";
      case "Intermediate":
        return "I can ollie consistently";
      case "Advanced":
        return "I can kickflip consistently";
      case "Master":
        return "I can treflip consistently";
    }
  };

  const levels: SkillLevel[] = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Master",
  ];

  return (
    <View className="flex-1 bg-background">
      <View className="absolute top-0 right-0 w-full h-[150%] bg-bg-elevated -rotate-45 translate-x-1/3 translate-y-[-25%] opacity-50" />

      <View className="mt-8">
        <ProgressIndicator
          currentStep="skill"
          onStepPress={(step) => {
            if (step === "weight" && onBack) {
              onBack();
            }
          }}
        />
      </View>

      <View className="flex-1 justify-center items-center px-8">
        <Text className="text-text-muted font-montserrat-light text-xl mb-12 text-center">
          Your skill level
        </Text>

        {levels.map((level, index) => (
          <View key={level} className="w-full mb-4">
            <View className="relative">
              <View className="absolute top-1 left-0 right-0 h-full rounded-3xl bg-accent-dark" />

              <Pressable
                onPress={() => handleButtonPress(level)}
                disabled={isLoading}
                className={`
                  relative
                  rounded-3xl
                  w-full
                  border-2
                  border-accent-muted
                  bg-accent-surface
                  active:translate-y-1
                  px-6
                  py-4
                  items-center
                  ${isLoading ? "opacity-70" : ""}
                `}
              >
                <View className="flex-col items-center -my-1">
                  <View className="flex-row mb-1">
                    {[...Array(getSkullCount(level))].map((_, index) => (
                      <BurningSkull
                        key={index}
                        width={24}
                        height={24}
                        style={{
                          marginRight: index < getSkullCount(level) - 1 ? 4 : 0,
                        }}
                        fill="#2A9E8A"
                      />
                    ))}
                  </View>
                  <Text className="text-text font-montserrat-alt text-xl tracking-wide">
                    {level}
                  </Text>
                  <Text className="text-text-muted font-montserrat-alt text-center text-sm">
                    {getLevelDescription(level)}
                  </Text>
                  {isLoading && (
                    <View className="absolute right-4 top-1/2 -translate-y-1/2">
                      <ActivityIndicator size="small" color="#EBEFEF" />
                    </View>
                  )}
                </View>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SkillLevelSelector;
