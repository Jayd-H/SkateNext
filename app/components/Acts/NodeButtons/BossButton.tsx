import React from "react";
import { Pressable, Text, View } from "react-native";
import SkaterLeftIcon from "../../../../assets/icons/skater-left.svg";
import BossSkullIcon from "../../../../assets/icons/boss-skull.svg";
import SkaterRightIcon from "../../../../assets/icons/skater-right.svg";
import { ButtonProps } from "./types";

export const BossButton: React.FC<ButtonProps> = ({
  id,
  name,
  onPress,
  isCompleted = 0,
}) => {
  const iconSize: number = 66;
  const iconLRSize: number = 14;

  const colorPairs = {
    0: {
      top: "border-red",
      bottom: "bg-red-dark",
      text: "text-red",
      fill: "#FF7C98",
    },
    1: {
      top: "border-yellow",
      bottom: "bg-yellow-dark",
      text: "text-yellow",
      fill: "#FFD571",
    },
    2: {
      top: "border-green",
      bottom: "bg-green-dark",
      text: "text-green",
      fill: "#3EE9B4",
    },
  }[isCompleted] || {
    top: "border-red",
    bottom: "bg-red-dark",
    text: "text-red",
    fill: "#FF7C98",
  };

  return (
    <View className="relative w-5/6 h-[120px]">
      {/* bottom */}
      <View
        className={`
          absolute 
          top-1.5
          w-full h-[120px]
          rounded-3xl
          ${colorPairs.bottom}
        `}
      />

      {/* top */}
      <Pressable
        onPress={() => onPress(id)}
        className={`
          absolute 
          top-0
          w-full h-[120px]
          rounded-3xl
          border-[3px]
          bg-accent-surface
          ${colorPairs.top}
          active:translate-y-1
          p-4
          items-center
          justify-center
        `}
      >
        <View className="flex-row justify-between items-center w-full">
          <SkaterLeftIcon
            width={iconSize + iconLRSize}
            height={iconSize + iconLRSize}
            fill={colorPairs.fill}
          />
          <BossSkullIcon
            width={iconSize}
            height={iconSize}
            fill={colorPairs.fill}
          />
          <SkaterRightIcon
            width={iconSize + iconLRSize}
            height={iconSize + iconLRSize}
            fill={colorPairs.fill}
          />
        </View>
        <Text
          className={`font-montserrat-alt-semibold text-base text-center tracking-[6px] uppercase -mt-2 ${colorPairs.text}`}
        >
          {name}
        </Text>
      </Pressable>
    </View>
  );
};
