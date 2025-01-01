import React from "react";
import { View, Text } from "react-native";
import Button from "./Button";
import TrophyItem from "./TrophyItem";
import { TROPHY_DATA } from "../Data/trophyData";
import type { TrickState } from "../Utils/StorageService";

interface UserTrophiesProps {
  onTrophyPress: (trophyId: string) => void;
  onShowAllTrophies: () => void;
  trickCompletionStates: TrickState;
}

const UserTrophies: React.FC<UserTrophiesProps> = React.memo(
  ({ onTrophyPress, onShowAllTrophies, trickCompletionStates }) => {
    const topTrophies = React.useMemo(() => {
      const trophyProgress = TROPHY_DATA.map((trophy) => {
        const totalTricks = trophy.requiredTricks.length;
        const completedTricks = trophy.requiredTricks.reduce((sum, trickId) => {
          const state = trickCompletionStates[trickId] || 0;
          return sum + (state === 2 ? 1 : state === 1 ? 0.5 : 0);
        }, 0);

        return {
          trophy,
          progress: Math.round((completedTricks / totalTricks) * 100),
        };
      });

      return trophyProgress.sort((a, b) => b.progress - a.progress).slice(0, 3);
    }, [trickCompletionStates]);

    return (
      <View className="relative w-full">
        <Text className="text-text text-center font-montserrat-alt-medium text-base tracking-widest bg-bg-elevated rounded-t-lg mx-28 -mt-6">
          Trophies
        </Text>
        <View className="w-full bg-bg-card rounded-2xl p-4 mb-6 pb-8 border-2 border-bg-elevated">
          <View>
            {topTrophies.map(({ trophy, progress }) => (
              <TrophyItem
                key={trophy.id}
                title={trophy.title}
                description={trophy.description}
                progress={progress}
                onPress={() => onTrophyPress(trophy.id)}
              />
            ))}
          </View>
        </View>
        <View className="absolute bottom-0 left-0 right-0 mx-8 -mb-4">
          <Button
            topText="SHOW ALL TROPHIES"
            size="small"
            onPress={onShowAllTrophies}
          />
        </View>
      </View>
    );
  }
);

UserTrophies.displayName = "UserTrophies";

export default UserTrophies;
