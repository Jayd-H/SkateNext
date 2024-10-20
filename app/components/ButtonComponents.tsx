import React from "react";
import { Pressable, Text, View } from "react-native";
import SkateboardIcon from "../../assets/icons/skateboard.svg";
import InfoIcon from "../../assets/icons/info.svg";
import SkaterLeftIcon from "../../assets/icons/skater-left.svg";
import BossSkullIcon from "../../assets/icons/boss-skull.svg";
import SkaterRightIcon from "../../assets/icons/skater-right.svg";

interface ButtonProps {
  id: string;
  name: string;
  onPress: (id: string) => void;
  isCompleted?: number;
  isCompletedInfo?: boolean;
}

export const TrickButton: React.FC<ButtonProps> = ({
  id,
  name,
  onPress,
  isCompleted = 0,
}) => {
  let iconSize = 35;
  return (
    <Pressable
      className={`p-2 rounded-2xl bg-buttonbg items-center justify-center w-[85] shadow-inner border h-[100] ${
        isCompleted == 0 ? "border-red shadow-red" : ""
      } ${isCompleted == 1 ? "border-yellow shadow-yellow" : ""} ${
        isCompleted == 2 ? "border-green shadow-green" : ""
      }`}
      onPress={() => onPress(id)}
    >
      <SkateboardIcon width={iconSize} height={iconSize} />
      <Text
        className={`text-text font-montserrat-alt mt-2 text-sm text-center ${
          isCompleted ? "text-accent" : ""
        }`}
      >
        {name}
      </Text>
    </Pressable>
  );
};

export const InfoButton: React.FC<ButtonProps> = ({
  id,
  name,
  onPress,
  isCompletedInfo,
}) => {
  let iconSize = 35;
  return (
    <Pressable
      className={`p-2 rounded-2xl bg-buttonbg items-center justify-center w-[75] shadow-inner border h-[100] ${
        isCompletedInfo == false
          ? "border-red shadow-red"
          : "border-green shadow-green"
      }`}
      onPress={() => onPress(id)}
    >
      <InfoIcon width={iconSize} height={iconSize} />
      <Text className="text-secondary font-montserrat-alt text-text mt-2 text-xs text-center">
        {name}
      </Text>
    </Pressable>
  );
};

export const BossButton: React.FC<ButtonProps> = ({
  id,
  name,
  onPress,
  isCompleted = 0,
}) => {
  let iconSize = 80;
  return (
    <Pressable
      className={`p-4 rounded-2xl bg-buttonbg items-center justify-center w-5/6 shadow-inner border h-[140] ${
        isCompleted == 0 ? "border-red shadow-red shadow-inner-red" : ""
      } ${isCompleted == 1 ? "border-yellow shadow-yellow" : ""} ${
        isCompleted == 2 ? "border-green shadow-green" : ""
      }`}
      onPress={() => onPress(id)}
    >
      <View className="flex-row justify-between items-center w-full mb-1">
        <SkaterLeftIcon width={iconSize} height={iconSize} />
        <BossSkullIcon width={iconSize + 10} height={iconSize + 10} />
        <SkaterRightIcon width={iconSize} height={iconSize} />
      </View>
      <Text
        className={`text-text font-montserrat-alt-bold text-base text-center ${
          isCompleted ? "text-accent" : ""
        }`}
      >
        {name}
      </Text>
    </Pressable>
  );
};
