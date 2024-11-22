import React from "react";
import { Pressable, Text, View } from "react-native";
import FolderIcon from "../../../../assets/icons/full-folder.svg";
import { FolderButtonProps } from "./types";

export const FolderButton: React.FC<FolderButtonProps> = ({
  id,
  nodeTitle,
  containedTricks,
  onPress,
  trickCompletionStates,
}) => {
  const textCuttoff: number = 7;
  const iconSize: number = 36;
  const truncatedTitle =
    nodeTitle.length > textCuttoff
      ? nodeTitle.slice(0, textCuttoff) + "..."
      : nodeTitle;

  const completedTricks = containedTricks.reduce((sum, trickId) => {
    return sum + (trickCompletionStates[trickId] || 0);
  }, 0);
  const maxPossible = containedTricks.length * 2;
  const completionPercentage = (completedTricks / maxPossible) * 100;

  const colorPairs =
    completionPercentage === 100
      ? {
          top: "border-green",
          bottom: "bg-green-dark",
          text: "text-green",
          fill: "#3EE9B4",
        }
      : completionPercentage >= 50
      ? {
          top: "border-yellow",
          bottom: "bg-yellow-dark",
          text: "text-yellow",
          fill: "#FFD571",
        }
      : {
          top: "border-red",
          bottom: "bg-red-dark",
          text: "text-red",
          fill: "#FF7C98",
        };

  return (
    <View className="relative w-[90px] h-[90px]">
      {/* bottom layer */}
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
          border-[3px]
          bg-accent-surface
          ${colorPairs.top}
          active:translate-y-1
        `}
      >
        <View className="w-full h-full flex-1 items-center -mt-6 justify-center">
          <FolderIcon
            width={iconSize}
            height={iconSize}
            fill={colorPairs.fill}
          />
        </View>

        <View className="absolute bottom-4 w-full px-2">
          <Text
            className={`font-montserrat-alt-semibold text-[10px] uppercase text-center ${colorPairs.text}`}
          >
            {truncatedTitle}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};
