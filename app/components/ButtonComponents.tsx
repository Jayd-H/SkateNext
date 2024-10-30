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
  const textCuttoff: number = 10;
  const iconSize: number = 26;
  const truncatedName =
    name.length > textCuttoff ? name.slice(0, textCuttoff) + "..." : name;
  const textSize = name.length < textCuttoff ? "text-xs" : "-mb-1";
  const viewSize = name.length < textCuttoff ? "" : "-mt-8";

  const completedStyle =
    {
      0: "border-red shadow-red",
      1: "border-yellow shadow-yellow",
      2: "border-green shadow-green",
    }[isCompleted] || "";

  return (
    <Pressable
      className={`relative w-[70px] h-[80px] rounded-2xl bg-buttonbg shadow-md border ${completedStyle}`}
      onPress={() => onPress(id)}
    >
      <View
        className={`w-full h-full flex-1 items-center -mt-6 justify-center ${viewSize}`}
      >
        <SkateboardIcon width={iconSize} height={iconSize} />
      </View>
      <View className="absolute bottom-4 w-full px-2">
        <Text
          className={`text-text font-montserrat-alt ${textSize} text-center`}
          style={name.length >= 8 ? { fontSize: 10 } : undefined}
        >
          {truncatedName}
        </Text>
      </View>
    </Pressable>
  );
};

export const InfoButton: React.FC<ButtonProps> = ({
  id,
  name,
  onPress,
  isCompletedInfo,
}) => {
  const iconSize: number = 26;

  const completedStyle = isCompletedInfo ? "border-green" : "border-red";

  return (
    <Pressable
      className={`p-2 rounded-2xl bg-buttonbg items-center justify-center w-[70] border h-[80] ${completedStyle}`}
      onPress={() => onPress(id)}
    >
      <InfoIcon width={iconSize} height={iconSize} />
      <Text
        className="text-secondary font-montserrat-alt text-text mt-2 text-center"
        style={{ fontSize: 10 }}
      >
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
  const iconSize: number = 66;
  const iconLRSize: number = 14;

  const completedStyle =
    {
      0: "border-red shadow-red",
      1: "border-yellow shadow-yellow",
      2: "border-green shadow-green",
    }[isCompleted] || "";

  // for some reason my boss button is not accepting a z axis, making it difficult to render the connections so they dont peek out the top
  return (
    <Pressable
      className={`p-4 rounded-2xl bg-buttonbg items-center justify-center w-5/6 shadow-xl border h-[120] py-6 ${completedStyle}`}
      onPress={() => onPress(id)}
    >
      <View className="flex-row justify-between items-center w-full">
        <SkaterLeftIcon
          width={iconSize + iconLRSize}
          height={iconSize + iconLRSize}
          className=""
        />
        <BossSkullIcon width={iconSize} height={iconSize} />
        <SkaterRightIcon
          width={iconSize + iconLRSize}
          height={iconSize + iconLRSize}
        />
      </View>
      <Text
        className={
          "text-text font-montserrat-alt-semibold text-base text-center tracking-[6px] uppercase -mt-2"
        }
      >
        {name}
      </Text>
    </Pressable>
  );
};
