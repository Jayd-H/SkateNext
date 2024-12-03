import React from "react";
import { Pressable, Text, View } from "react-native";
import * as Haptics from "expo-haptics";

interface ButtonProps {
  topText: string;
  bottomText?: string;
  onPress?: () => void;
  warning?: boolean;
  isSelected?: boolean;
  variant?: "default" | "selectable";
}

export const Button: React.FC<ButtonProps> = ({
  topText,
  bottomText,
  onPress,
  warning = false,
  isSelected = false,
  variant = "default",
}) => {
  const getStyleClasses = () => {
    if (variant === "selectable") {
      return {
        shadow: isSelected ? "bg-accent-dark" : "bg-accent-surface",
        border: isSelected ? "border-accent" : "border-accent-dark",
        background: isSelected ? "bg-accent-surface" : "bg-bg-surface",
      };
    }
    return {
      shadow: warning ? "bg-warning-dark" : "bg-accent-dark",
      border: warning ? "border-warning" : "border-accent-muted",
      background: warning ? "bg-bg-surface" : "bg-accent-surface",
    };
  };

  const styles = getStyleClasses();

  const handlePressIn = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <View className="w-full mb-4">
      <View className="relative">
        {/* bottom */}
        <View
          className={`
            absolute 
            top-1
            left-0
            right-0
            h-full
            rounded-3xl
            ${styles.shadow}
          `}
        />
        {/* top */}
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          className={`
            relative
            rounded-3xl
            w-full
            border-2
            ${styles.border}
            ${styles.background}
            active:translate-y-1
            px-6
            py-4
          `}
        >
          <View className="flex-col justify-between -my-1">
            <Text
              className={`
                text-text 
                font-montserrat-alt-semibold
                text-center
                tracking-wide
                ${bottomText ? "text-base" : "text-base tracking-widest"}
              `}
            >
              {topText}
            </Text>
            {bottomText && (
              <Text className="text-text-dim font-montserrat-alt text-center text-sm">
                {bottomText}
              </Text>
            )}
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Button;
