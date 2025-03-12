import React from "react";
import { Pressable, Text, View, TouchableOpacity } from "react-native";
import { useHaptics } from "../Utils/useHaptics";
import BurningSkull from "../../../assets/icons/burning-skull.svg";
import CrownedSkull from "../../../assets/icons/crowned-skull.svg";

interface ModalTrickButtonProps {
  name: string;
  altNames?: string;
  difficulty: string;
  completionState: number;
  onPress: () => void;
  showBlacklistButton?: boolean;
  onBlacklist?: () => void;
  isBlacklisted?: boolean;
}

export const ModalTrickButton: React.FC<ModalTrickButtonProps> = ({
  name,
  altNames,
  difficulty,
  completionState,
  onPress,
  showBlacklistButton = false,
  onBlacklist,
  isBlacklisted = false,
}) => {
  const getStyleClasses = () => {
    switch (completionState) {
      case 2:
        return {
          shadow: "bg-green-dark",
          border: "border-green",
          text: "text-green",
          iconColor: "#3EE9B4", // green
        };
      case 1:
        return {
          shadow: "bg-yellow-dark",
          border: "border-yellow",
          text: "text-yellow",
          iconColor: "#FFD571", // yellow
        };
      default:
        return {
          shadow: "bg-red-dark",
          border: "border-red",
          text: "text-red",
          iconColor: "#FF7C98", // red
        };
    }
  };

  const styles = getStyleClasses();
  const { triggerHaptic } = useHaptics();

  const handlePress = async () => {
    await triggerHaptic("light");
    onPress();
  };

  const handleBlacklist = async (e: any) => {
    e.stopPropagation();
    await triggerHaptic("medium");
    if (onBlacklist) {
      onBlacklist();
    }
  };

  const renderDifficulty = () => {
    const difficultyNumber = parseInt(difficulty, 10);
    if (difficultyNumber === 11) {
      return (
        <View className="flex-row items-center">
          <CrownedSkull width={20} height={20} fill={styles.iconColor} />
        </View>
      );
    }
    const fullSkulls = Math.floor(difficultyNumber / 2);
    const hasHalfSkull = difficultyNumber % 2 !== 0;
    return (
      <View className="flex-row items-center">
        {[...Array(fullSkulls)].map((_, index) => (
          <BurningSkull
            key={index}
            width={20}
            height={20}
            className="mr-0.5"
            fill={styles.iconColor}
          />
        ))}
        {hasHalfSkull && (
          <View style={{ width: 10, overflow: "hidden" }}>
            <BurningSkull width={20} height={20} fill={styles.iconColor} />
          </View>
        )}
      </View>
    );
  };

  return (
    <View className="w-full mb-4">
      <View className="relative">
        {/* Blacklist button */}
        {showBlacklistButton && (
          <TouchableOpacity
            onPress={handleBlacklist}
            className="absolute -top-2 -right-2 z-10 py-[1px] px-[6px] bg-accent-surface border-warning-dark border-2 rounded-full"
          >
            <Text className="text-warning-dark text-base font-montserrat-alt-bold">
              X
            </Text>
          </TouchableOpacity>
        )}

        {/* bottom */}
        <View
          className={`
            absolute 
            top-1
            left-0
            right-0
            h-[72px]
            rounded-3xl
            ${styles.shadow}
            ${isBlacklisted ? "opacity-50" : ""}
          `}
        />

        {/* top */}
        <Pressable
          onPress={handlePress}
          className={`
            relative
            rounded-3xl
            w-full
            border-2
            h-[72px]
            ${styles.border}
            bg-accent-surface
            active:translate-y-1
            px-6
            justify-center
            ${isBlacklisted ? "opacity-50" : ""}
          `}
        >
          <View className="flex-row items-start justify-between">
            <View className="flex-1">
              <Text
                className={`font-montserrat-alt-medium tracking-wide ${styles.text}`}
                numberOfLines={1}
              >
                {name}
              </Text>
              <Text
                className="text-text-dim font-montserrat-alt text-xs"
                numberOfLines={1}
              >
                {altNames || " "}
              </Text>
            </View>
            <View className="ml-2">{renderDifficulty()}</View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default ModalTrickButton;
