import React from "react";
import { Pressable, Text, View } from "react-native";
import { TRICK_DATA } from "../../Data/trickData";
import { TrickState } from "../../Utils/StorageService";
import SkullIcon from "../../../../assets/icons/burning-skull.svg";
import CrownSkullIcon from "../../../../assets/icons/crowned-skull.svg";

interface StatsButtonProps {
  onPress: () => void;
  trickStates: TrickState;
}

export const calculateStats = (
  trickStates: TrickState
): {
  burningSkulls: { earned: number; total: number };
  crownSkulls: { earned: number; total: number };
} => {
  const initialStats = {
    burningSkulls: { earned: 0, total: 0 },
    crownSkulls: { earned: 0, total: 0 },
  };

  return TRICK_DATA.reduce((stats, trick) => {
    const difficulty = Number(trick.difficulty);
    const skulls = Math.floor(difficulty / 2);
    const isCrownSkull = difficulty > 10;

    if (isCrownSkull) {
      stats.crownSkulls.total += skulls;
      if (trickStates[trick.id] === 2) {
        stats.crownSkulls.earned += skulls;
      }
    } else {
      stats.burningSkulls.total += skulls;
      if (trickStates[trick.id] === 2) {
        stats.burningSkulls.earned += skulls;
      }
    }

    return stats;
  }, initialStats);
};

export const StatsButton: React.FC<StatsButtonProps> = ({
  onPress,
  trickStates,
}) => {
  const stats = calculateStats(trickStates);
  const totalEarned = stats.burningSkulls.earned + stats.crownSkulls.earned;
  const totalPossible = stats.burningSkulls.total + stats.crownSkulls.total;
  const percentage = Math.round((totalEarned / totalPossible) * 100);

  const iconsize: number = 26;

  return (
    <View className="relative w-5/6 h-[120px]">
      <View className="absolute top-1.5 w-full h-[120px] rounded-3xl bg-accent-dark" />
      <Pressable
        onPress={onPress}
        className="absolute top-0 w-full h-[120px] rounded-3xl border-[3px] border-accent-bright 
                   bg-accent-surface active:translate-y-1 p-4 items-center justify-center"
      >
        <View className="flex-row justify-between items-center w-full px-4">
          <View className="flex-row items-center space-x-2">
            <SkullIcon width={iconsize} height={iconsize} fill="#4FEDE2" />
            <Text className="font-montserrat-alt-semibold tracking-[4px] text-base text-accent-bright">
              {stats.burningSkulls.earned}/{stats.burningSkulls.total}
            </Text>
          </View>
          <View className="flex-row items-center space-x-2">
            <CrownSkullIcon width={iconsize} height={iconsize} fill="#4FEDE2" />
            <Text className="font-montserrat-alt-semibold tracking-[4px] text-base text-accent-bright">
              {stats.crownSkulls.earned}/{stats.crownSkulls.total}
            </Text>
          </View>
        </View>
        <Text className="font-montserrat-alt-semibold text-base text-center tracking-[6px] uppercase mt-4 text-accent-bright">
          {percentage}% MASTERED
        </Text>
      </Pressable>
    </View>
  );
};

export const getProgressiveTrick = (trickStates: TrickState): string => {
  const unstartedTricks = TRICK_DATA.filter(
    (trick) =>
      (!trickStates[trick.id] || trickStates[trick.id] === 0) &&
      Number(trick.difficulty) <= 10
  );
  if (unstartedTricks.length > 0) {
    return unstartedTricks[Math.floor(Math.random() * unstartedTricks.length)]
      .id;
  }

  const inProgressTricks = TRICK_DATA.filter(
    (trick) => trickStates[trick.id] === 1 && Number(trick.difficulty) <= 10
  );
  if (inProgressTricks.length > 0) {
    return inProgressTricks[Math.floor(Math.random() * inProgressTricks.length)]
      .id;
  }

  const unmasteredTricks = TRICK_DATA.filter(
    (trick) => !trickStates[trick.id] || trickStates[trick.id] < 2
  );
  if (unmasteredTricks.length > 0) {
    return unmasteredTricks[Math.floor(Math.random() * unmasteredTricks.length)]
      .id;
  }

  return TRICK_DATA[Math.floor(Math.random() * TRICK_DATA.length)].id;
};
