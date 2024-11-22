import React from "react";
import { Pressable, Text, View } from "react-native";
import SkateboardIcon from "../../../../assets/icons/skateboard.svg";
import { ButtonProps } from "./types";

export const TrickButton: React.FC<ButtonProps> = ({
  id,
  name,
  onPress,
  isCompleted = 0,
}) => {
  const textCuttoff: number = 7;
  const iconSize: number = 36;
  const truncatedName =
    name.length > textCuttoff ? name.slice(0, textCuttoff) + "..." : name;

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
    <View className="relative w-[90px] h-[90px]">
      {/* bottom */}
      <View
        className={`
          absolute 
          top-1.5
          w-[90px] h-[90px] 
          rounded-[28px]
          ${colorPairs.bottom}
        `}
      />

      {/* top layer */}
      <Pressable
        onPress={() => onPress(id)}
        className={`
          absolute 
          top-0
          w-[90px] h-[90px] 
          rounded-[28px]
          border-4
          bg-accent-surface
          ${colorPairs.top}
          active:translate-y-1
        `}
      >
        <View className="w-full h-full flex-1 items-center -mt-6 justify-center">
          <SkateboardIcon
            width={iconSize}
            height={iconSize}
            fill={colorPairs.fill}
          />
        </View>

        <View className="absolute bottom-3 w-full px-2">
          <Text
            className={`font-montserrat-alt-semibold text-[10px] uppercase text-center ${colorPairs.text}`}
          >
            {truncatedName}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};
