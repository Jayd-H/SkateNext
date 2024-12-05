import React from "react";
import { View, Text, Pressable } from "react-native";
import * as Haptics from "expo-haptics";

export type Step = "age" | "weight" | "skill";

interface ProgressIndicatorProps {
  currentStep: Step;
  onStepPress?: (step: Step) => void;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  onStepPress,
}) => {
  const steps: Step[] = ["age", "weight", "skill"];

  const getStepStatus = (step: Step) => {
    const currentIndex = steps.indexOf(currentStep);
    const stepIndex = steps.indexOf(step);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  const handlePress = async (step: Step) => {
    const stepIndex = steps.indexOf(step);
    const currentIndex = steps.indexOf(currentStep);

    if (stepIndex < currentIndex) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onStepPress?.(step);
    }
  };

  const getTextStyle = (status: string) => {
    switch (status) {
      case "completed":
        return "text-text-muted";
      case "current":
        return "text-accent-bright";
      default:
        return "text-text-dim";
    }
  };

  return (
    <View className="w-full px-8 py-6 flex-row items-center justify-between">
      {steps.map((step, index) => {
        const status = getStepStatus(step);
        const textStyle = getTextStyle(status);

        return (
          <React.Fragment key={step}>
            <Pressable
              onPress={() => handlePress(step)}
              className="items-center"
            >
              <Text
                className={`font-montserrat-alt-semibold uppercase ${textStyle} 
                  ${status === "current" ? "text-base" : "text-xs"}`}
              >
                {step}
              </Text>
            </Pressable>
            {index < steps.length - 1 && (
              <View
                className={`h-[1px] w-12 mx-2 
                  ${
                    status === "completed"
                      ? "bg-accent-muted"
                      : "bg-accent-dark"
                  }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

export default ProgressIndicator;
