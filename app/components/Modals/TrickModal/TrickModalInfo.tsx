import React from "react";
import { View, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";
import BurningSkull from "../../../../assets/icons/burning-skull.svg";
import KingSkull from "../../../../assets/icons/crowned-skull.svg";
import { InfoProps } from "./types";
import { ModalTheme } from "./useModalTheme";

interface ExtendedInfoProps extends InfoProps {
  theme: ModalTheme;
  waveValues: SharedValue<number>[];
}

const TrickModalInfo: React.FC<ExtendedInfoProps> = ({
  name,
  altNames,
  difficulty,
  theme,
  waveValues,
}) => {
  const getTrickNameSize = (name: string) => {
    if (name.length > 23) return "text-base";
    if (name.length > 15) return "text-lg";
    if (name.length > 10) return "text-xl";
    return "text-2xl";
  };

  const iconsize: number = 28;

  const renderDifficulty = (difficulty: string) => {
    const difficultyNumber = parseInt(difficulty, 10);

    if (difficultyNumber === 11) {
      return (
        <Animated.View
          style={useAnimatedStyle(() => ({
            transform: [{ scale: waveValues[0].value }],
          }))}
          className="absolute inset-x-0 flex-row items-center justify-center"
        >
          <View>
            <KingSkull width={32} height={32} fill={theme.accentColor} />
          </View>
        </Animated.View>
      );
    }

    const fullSkulls = Math.floor(difficultyNumber / 2);
    const hasHalfSkull = difficultyNumber % 2 !== 0;
    const skullElements = [];

    for (let i = 0; i < fullSkulls; i++) {
      const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: waveValues[i]?.value || 1 }],
      }));

      skullElements.push(
        <Animated.View key={i} style={animatedStyle}>
          <BurningSkull
            width={iconsize}
            height={iconsize}
            fill={theme.accentColor}
          />
        </Animated.View>
      );
    }

    if (hasHalfSkull) {
      const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: waveValues[fullSkulls]?.value || 1 }],
      }));

      skullElements.push(
        <Animated.View
          key="half"
          style={[{ width: 16, overflow: "hidden" }, animatedStyle]}
        >
          <BurningSkull
            width={iconsize}
            height={iconsize}
            fill={theme.accentColor}
          />
        </Animated.View>
      );
    }

    const totalSkulls = fullSkulls + (hasHalfSkull ? 1 : 0);
    const spacing = (totalSkulls - 1) * 8;
    const totalWidth =
      totalSkulls * iconsize - (hasHalfSkull ? iconsize / 2 : 0) + spacing;

    return (
      <View className="absolute inset-x-0 flex-row items-center justify-center">
        <View
          style={{
            width: totalWidth,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {skullElements}
        </View>
      </View>
    );
  };

  return (
    <View>
      <View className="h-8 mb-6 -mt-16 w-full relative">
        {renderDifficulty(difficulty)}
      </View>

      <View className="w-5/6 self-center justify-center z-10">
        <Text
          className={`${getTrickNameSize(
            name
          )} text-accent-bright font-montserrat-alt-bold text-center tracking-wide uppercase mb-1`}
          style={{ color: theme.accentColor }}
        >
          {name}
        </Text>
        <View className="justify-center -mt-1">
          {altNames ? (
            <Text className="text-text-dim font-montserrat-medium text-center">
              {altNames}
            </Text>
          ) : (
            <Text className="text-text-dim font-montserrat-medium text-center opacity-0">
              placeholder
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default TrickModalInfo;
