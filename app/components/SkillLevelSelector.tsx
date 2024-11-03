import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import BurningSkull from "../../assets/icons/burning-skull.svg";
import SkateboardText from "../../assets/icons/skateboard-grey.svg";
import { AnimatedFlyIn } from "./Generic/AnimatedFlyIn";

type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Master";

interface SkillLevelSelectorProps {
  onComplete: (level: SkillLevel) => void;
  isLoading?: boolean;
}

const SkillLevelSelector: React.FC<SkillLevelSelectorProps> = ({
  onComplete,
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
    <View className="flex-1 bg-background pt-2">
      <AnimatedFlyIn delay={0}>
        <Text className="text-lg text-text font-montserrat-light text-center mt-8 mb-12">
          S K A T E N E X T
        </Text>
      </AnimatedFlyIn>
      <AnimatedFlyIn delay={100}>
        <View className="items-center">
          <SkateboardText width={28} height={28} />
        </View>
      </AnimatedFlyIn>
      <AnimatedFlyIn delay={200}>
        <Text className="text-lg text-grey font-montserrat-alt-light-italic text-center mb-2">
          Please select one
        </Text>
      </AnimatedFlyIn>
      <View className="flex-1 justify-center items-center -mt-16 px-8">
        {levels.map((level, index) => (
          <AnimatedFlyIn
            key={level}
            delay={300 + index * 100}
            style={{ width: "100%" }}
          >
            <TouchableOpacity
              className="bg-buttonbg border border-accent-2 w-full p-3 rounded-3xl mb-4 items-center"
              onPress={() => handleButtonPress(level)}
              disabled={isLoading}
              style={{ opacity: isLoading ? 0.7 : 1 }}
            >
              <View className="flex-row mb-1">
                {[...Array(getSkullCount(level))].map((_, index) => (
                  <BurningSkull
                    key={index}
                    width={24}
                    height={24}
                    style={{
                      marginRight: index < getSkullCount(level) - 1 ? 4 : 0,
                    }}
                  />
                ))}
              </View>
              <Text className="text-text font-montserrat-alt text-xl">
                {level}
              </Text>
              <Text className="text-grey font-montserrat-alt text-center">
                {getLevelDescription(level)}
              </Text>
              {isLoading && (
                <View className="absolute right-4 top-1/2 -translate-y-1/2">
                  <ActivityIndicator size="small" color="#EBEFEF" />
                </View>
              )}
            </TouchableOpacity>
          </AnimatedFlyIn>
        ))}
      </View>
    </View>
  );
};

export default SkillLevelSelector;
