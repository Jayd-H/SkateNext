import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";
import { useHaptics } from "../../Utils/useHaptics";
import { ModalTheme } from "./useModalTheme";

//* these interfaces could be in my types

interface TrickModalButtonProps {
  topText: string;
  bottomText: string;
  onPress: () => void;
  isSelected: boolean;
  theme: ModalTheme;
  glowOpacity?: SharedValue<number>;
  buttonType: "success" | "warning" | "danger";
}

const TrickModalButton: React.FC<TrickModalButtonProps> = ({
  topText,
  bottomText,
  onPress,
  isSelected,
  theme,
  glowOpacity,
  buttonType,
}) => {
  const { triggerHaptic } = useHaptics();
  const getStyleClasses = () => {
    const baseStyles = {
      success: {
        shadow: isSelected ? "bg-green-dark" : "bg-accent-surface",
        border: isSelected ? "border-green" : "border-accent-muted",
        background: isSelected ? "bg-accent-surface" : "bg-bg-elevated",
        glow: "bg-green",
        textColor: isSelected ? "text-green" : "text-text",
        subTextColor: isSelected ? "text-green-dark" : "text-text-dim",
      },
      warning: {
        shadow: isSelected ? "bg-yellow-dark" : "bg-accent-surface",
        border: isSelected ? "border-yellow" : "border-accent-muted",
        background: isSelected ? "bg-accent-surface" : "bg-bg-elevated",
        glow: "bg-yellow",
        textColor: isSelected ? "text-yellow" : "text-text",
        subTextColor: isSelected ? "text-yellow-dark" : "text-text-dim",
      },
      danger: {
        shadow: isSelected ? "bg-red-dark" : "bg-accent-surface",
        border: isSelected ? "border-red" : "border-accent-muted",
        background: isSelected ? "bg-accent-surface" : "bg-bg-elevated",
        glow: "bg-red",
        textColor: isSelected ? "text-red" : "text-text",
        subTextColor: isSelected ? "text-red-dark" : "text-text-dim",
      },
    };
    return baseStyles[buttonType];
  };

  const styles = getStyleClasses();
  const glowStyle = useAnimatedStyle(() => ({
    opacity: (glowOpacity?.value || 0) * 1.5,
  }));

  const handlePressIn = async () => {
    await triggerHaptic("light");
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
            rounded-3xl
            ${styles.shadow}
          `}
        />
        {theme.glowIntensity > 0 && isSelected && (
          <Animated.View
            style={[
              {
                position: "absolute",
                top: -4,
                left: -4,
                right: -4,
                bottom: -4,
                borderRadius: 24,
                backgroundColor:
                  buttonType === "success"
                    ? "#3EE9B4"
                    : buttonType === "warning"
                    ? "#FFD571"
                    : "#FF7C98",
                zIndex: -1,
              },
              glowStyle,
            ]}
          />
        )}
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
              className={`${styles.textColor} font-montserrat-alt-semibold text-base text-center tracking-wide`}
            >
              {topText}
            </Text>
            <Text
              className={`${styles.subTextColor} font-montserrat-alt text-center text-sm`}
            >
              {bottomText}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default TrickModalButton;
