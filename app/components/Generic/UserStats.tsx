import React from "react";
import { View, Text } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import Button from "./Button";
import { useUserStats } from "../Utils/useUserStats";

interface StatItemProps {
  title: string;
  value: string;
}

interface UserStatsProps {
  onSaveProgress: () => void;
}

const StatItem: React.FC<StatItemProps> = ({ title, value }) => (
  <View className="w-[50%] mb-4">
    <Text className="text-text-dim font-montserrat-alt-medium text-center text-xs">
      {title}
    </Text>
    <Text className="text-text font-montserrat-alt text-center text-sm">
      {value}
    </Text>
  </View>
);

const StatItemSkeleton: React.FC<{ title: string }> = ({ title }) => (
  <View className="w-[50%] mb-4">
    <Text className="text-text-dim font-montserrat-alt-medium text-center text-xs">
      {title}
    </Text>
    <View className="h-5 justify-center">
      <View className="h-[14px] w-16 bg-bg-elevated rounded-md self-center animate-pulse" />
    </View>
  </View>
);

const UserStats: React.FC<UserStatsProps> = ({ onSaveProgress }) => {
  const stats = useUserStats();

  return (
    <View className="relative w-full">
      <Text className="text-text text-center font-montserrat-alt-medium text-base tracking-widest bg-bg-elevated rounded-t-lg mx-28 -mt-6">
        Stats
      </Text>
      <View className="w-full bg-bg-card rounded-xl p-2 pb-4 mb-6 border-2 border-bg-elevated">
        <View className="flex-row flex-wrap justify-between py-2">
          {stats.isLoading ? (
            <Animated.View
              className="flex-row flex-wrap justify-between w-full"
              entering={FadeIn.duration(300)}
              exiting={FadeOut.duration(300)}
            >
              <StatItemSkeleton title="Account Created" />
              <StatItemSkeleton title="Time Skated" />
              <StatItemSkeleton title="Calories Burnt" />
              <StatItemSkeleton title="Avg Skate Sesh" />
              <StatItemSkeleton title="Skulls Collected" />
              <StatItemSkeleton title="% Complete" />
            </Animated.View>
          ) : (
            <Animated.View
              className="flex-row flex-wrap justify-between w-full"
              entering={FadeIn.duration(300)}
              exiting={FadeOut.duration(300)}
            >
              <StatItem title="Account Created" value={stats.accountCreated} />
              <StatItem title="Time Skated" value={stats.timeSkated} />
              <StatItem title="Calories Burnt" value={stats.caloriesBurnt} />
              <StatItem title="Avg Skate Sesh" value={stats.avgSkateSession} />
              <StatItem
                title="Skulls Collected"
                value={stats.skullsCollected}
              />
              <StatItem title="% Complete" value={stats.completionPercentage} />
            </Animated.View>
          )}
        </View>
      </View>
      <View className="absolute bottom-0 left-0 right-0 mx-12 -mb-2">
        <Button
          topText="SAVE USER PROGRESS"
          size="small"
          onPress={onSaveProgress}
        />
      </View>
    </View>
  );
};

export default UserStats;
