import React from "react";
import { Pressable, Text, View } from "react-native";
import InfoIcon from "../../../../assets/icons/info.svg";
import { ButtonProps } from "./types";

export const InfoButton: React.FC<ButtonProps> = ({
  id,
  name,
  onPress,
  isCompletedInfo,
}) => {
  const iconSize: number = 58;

  const colorPairs = isCompletedInfo
    ? {
        top: "border-text-muted",
        bottom: "bg-text-dim",
        text: "text-text-muted",
        fill: "#B4D2CF",
      }
    : {
        top: "border-accent",
        bottom: "bg-accent-muted",
        text: "text-accent",
        fill: "#34CDB3",
      };

  return (
    <View className="flex items-center w-[80px] h-[80px]">
      <View className="relative w-14 h-14 mb-2">
        {/* bottom */}
        <View
          className={`
            absolute 
            top-1.5
            w-14 h-14
            rounded-full
            ${colorPairs.bottom}
          `}
        />

        {/* top  */}
        <Pressable
          onPress={() => onPress(id)}
          className={`
            absolute
            top-0
            w-14 h-14
            rounded-full
            border-4
            bg-accent-surface
            ${colorPairs.top}
            active:translate-y-1
            items-center
            justify-center
          `}
        >
          <InfoIcon width={iconSize} height={iconSize} fill={colorPairs.fill} />
        </Pressable>
      </View>

      <Text
        className={`font-montserrat-alt-bold uppercase text-xs text-center ${colorPairs.text}`}
      >
        {name}
      </Text>
    </View>
  );
};
