import React from "react";
import { View, Text, Pressable } from "react-native";
import { useHaptics } from "../Utils/useHaptics";
import SilverTrophy from "../../../assets/icons/silvertrophy.svg";
import BronzeTrophy from "../../../assets/icons/bronzetrophy.svg";
import DiamondTrophy from "../../../assets/icons/diamondtrophy.svg";

interface TrophyItemProps {
  title: string;
  description: string;
  progress: number;
  onPress?: () => void;
}

const TrophyItem: React.FC<TrophyItemProps> = ({
  title,
  description,
  progress,
  onPress,
}) => {
  const { triggerHaptic } = useHaptics();

  const handlePressIn = async () => {
    await triggerHaptic("light");
  };

  const getTrophyIcon = () => {
    const iconSize: number = 36;
    if (progress === 100) {
      return (
        <DiamondTrophy width={iconSize} height={iconSize} fill="#82AEB3" />
      );
    } else if (progress >= 50) {
      return <SilverTrophy width={iconSize} height={iconSize} fill="#D8E3E3" />;
    }
    return <BronzeTrophy width={iconSize} height={iconSize} fill="#E5B199" />;
  };

  return (
    <View className="relative mb-2">
      <View className="absolute top-1 left-0 right-0 h-full rounded-xl bg-background" />
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        className="relative w-full bg-bg-elevated rounded-xl p-3 active:translate-y-1"
      >
        <View className="flex-row items-center">
          <View className="mr-3">{getTrophyIcon()}</View>
          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-text font-montserrat-alt-medium tracking-widest">
                {title}
              </Text>
              <Text className="text-accent font-montserrat text-xs -mt-2 tracking-widest">
                {progress}%
              </Text>
            </View>
            <Text className="text-text-dim font-montserrat-alt-medium text-xs">
              {description}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default TrophyItem;
