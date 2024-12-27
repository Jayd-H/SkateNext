import React from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import Animated from "react-native-reanimated";
import BurningSkull from "../../../assets/icons/burning-skull.svg";
import ProgressIndicator from "./ProgressIndicator";
import { useAnimatedMount } from "../Utils/useAnimatedMount";
import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

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

  const STAGGER_DELAY = 100;

  const bgOpacity = useSharedValue(0);

  const bgFadeStyle = useAnimatedStyle(() => ({
    opacity: bgOpacity.value,
  }));

  const fadeInBackground = () => {
    bgOpacity.value = withTiming(1, { duration: 300 });
  };

  const animations = {
    titleAnim: useAnimatedMount({ delay: 0, mountOnly: true }),
    beginnerAnim: useAnimatedMount({ delay: 0, mountOnly: true }),
    intermediateAnim: useAnimatedMount({ delay: 0, mountOnly: true }),
    advancedAnim: useAnimatedMount({ delay: 0, mountOnly: true }),
    masterAnim: useAnimatedMount({ delay: 0, mountOnly: true }),
  };

  const handleButtonPress = async (level: SkillLevel) => {
    if (!isLoading) {
      const animateAll = async () => {
        animations.masterAnim.animateOut();
        await new Promise((resolve) => setTimeout(resolve, STAGGER_DELAY));
        animations.advancedAnim.animateOut();
        await new Promise((resolve) => setTimeout(resolve, STAGGER_DELAY));
        animations.intermediateAnim.animateOut();
        await new Promise((resolve) => setTimeout(resolve, STAGGER_DELAY));
        animations.beginnerAnim.animateOut();
        await new Promise((resolve) => setTimeout(resolve, STAGGER_DELAY));
        animations.titleAnim.animateOut();
        fadeInBackground();

        await new Promise((resolve) => setTimeout(resolve, 300));
        onComplete(level);
      };

      animateAll();
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

  const getAnimationForLevel = (level: SkillLevel) => {
    switch (level) {
      case "Beginner":
        return animations.beginnerAnim;
      case "Intermediate":
        return animations.intermediateAnim;
      case "Advanced":
        return animations.advancedAnim;
      case "Master":
        return animations.masterAnim;
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
      {/* Background fade overlay */}
      <Animated.View
        pointerEvents={"none"}
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#0F1413",
            zIndex: 10,
          },
          bgFadeStyle,
        ]}
      />

      {/* Background decoration */}
      <View className="absolute top-0 right-0 w-full h-[150%] bg-bg-elevated -rotate-45 translate-x-1/3 translate-y-[-25%] opacity-50" />

      {/* Progress indicator */}
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

      {/* Main content */}
      <View className="flex-1 justify-center items-center px-8">
        <Animated.View style={[animations.titleAnim.animatedStyle]}>
          <Text className="text-text-muted font-montserrat-light text-xl mb-12 text-center">
            Your skill level
          </Text>
        </Animated.View>

        {levels.map((level) => (
          <Animated.View
            key={level}
            style={[getAnimationForLevel(level).animatedStyle]}
            className="w-full mb-4"
          >
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
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

export default SkillLevelSelector;
