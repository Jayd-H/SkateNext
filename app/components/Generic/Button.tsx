import React from "react";
import { Pressable, Text, View } from "react-native";
import { useHaptics } from "../Utils/useHaptics";

interface ButtonProps {
  topText: string;
  bottomText?: string;
  onPress?: () => void;
  warning?: boolean;
  isSelected?: boolean;
  variant?: "default" | "selectable";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  topText,
  bottomText,
  onPress,
  warning = false,
  isSelected = false,
  variant = "default",
  size = "large",
  disabled = false,
}) => {
  const getStyleClasses = () => {
    if (disabled) {
      return {
        shadow: "bg-bg-surface opacity-50",
        border: "border-bg-surface",
        background: "bg-bg-elevated",
      };
    }

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

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return {
          padding: "px-4 py-3",
          topText: "text-sm",
          bottomText: "text-xs",
          rounded: "rounded-lg",
        };
      case "medium":
        return {
          padding: "px-5 py-3",
          topText: "text-base",
          bottomText: "text-sm",
          rounded: "rounded-xl",
        };
      case "large":
        return {
          padding: "px-6 py-4",
          topText: "text-base",
          bottomText: "text-sm",
          rounded: "rounded-2xl",
        };
      default:
        return {
          padding: "px-6 py-4",
          topText: "text-base",
          bottomText: "text-sm",
          rounded: "rounded-2xl",
        };
    }
  };

  const styles = getStyleClasses();
  const sizeClasses = getSizeClasses();
  const { triggerHaptic } = useHaptics();

  const handlePressIn = async () => {
    if (!disabled) {
      await triggerHaptic("light");
    }
  };

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  return (
    <View className="w-full mb-4">
      <View className="relative">
        <View
          className={`
            absolute 
            top-1
            left-0
            right-0
            h-full
            ${sizeClasses.rounded}
            ${styles.shadow}
          `}
        />
        <Pressable
          onPress={handlePress}
          onPressIn={handlePressIn}
          className={`
            relative
            ${sizeClasses.rounded}
            w-full
            border-2
            ${styles.border}
            ${styles.background}
            ${disabled ? "" : "active:translate-y-1"}
            ${sizeClasses.padding}
          `}
        >
          <View className="flex-col justify-between -my-1">
            <Text
              className={`
                text-text 
                font-montserrat-alt-semibold
                text-center
                tracking-wide
                ${sizeClasses.topText}
                ${bottomText ? "" : "tracking-widest"}
                ${disabled ? "opacity-50" : ""}
              `}
            >
              {topText}
            </Text>
            {bottomText && (
              <Text
                className={`
                  text-text-dim 
                  font-montserrat-alt 
                  text-center 
                  ${sizeClasses.bottomText}
                  ${disabled ? "opacity-50" : ""}
                `}
              >
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
