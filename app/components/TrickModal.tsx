import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  ScrollView,
} from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { TRICK_DATA, Trick } from "./trickData";
import BurningSkull from "../../assets/icons/burning-skull.svg";

interface TrickModalProps {
  isVisible: boolean;
  onClose: () => void;
  trickId: string;
}

const TrickModal: React.FC<TrickModalProps> = ({
  isVisible,
  onClose,
  trickId,
}) => {
  const translateY = useSharedValue(1000);
  const trick = TRICK_DATA.find((t: any) => t.id === trickId);

  React.useEffect(() => {
    if (isVisible) {
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.exp),
      });
    } else {
      translateY.value = withTiming(1000, {
        duration: 300,
        easing: Easing.in(Easing.exp),
      });
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  if (!isVisible || !trick) return null;

  const blurViewStyle: ViewStyle = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "flex-end",
  };

  const renderCommonMistakes = (mistakes: string) => {
    return mistakes.split(/\[([^\]]+)\]/).map((part, index) => {
      if (index % 2 === 0) {
        return part.trim() ? (
          <Text key={index} className="text-grey font-montserrat-light mt-1">
            {part.trim()}
          </Text>
        ) : null;
      } else {
        return (
          <Text
            key={index}
            className="text-accent-2 font-montserrat-alt-light mt-4"
          >
            {part}
          </Text>
        );
      }
    });
  };

  const renderDifficulty = (difficulty: string) => {
    const difficultyNumber = parseInt(difficulty, 10);
    const fullSkulls = Math.floor(difficultyNumber / 2);
    const hasHalfSkull = difficultyNumber % 2 !== 0;

    return (
      <View className="flex-row items-center mb-2">
        {[...Array(fullSkulls)].map((_, index) => (
          <BurningSkull key={index} width={24} height={24} />
        ))}
        {hasHalfSkull && (
          <View style={{ width: 12, overflow: "hidden" }}>
            <BurningSkull width={32} height={32} />
          </View>
        )}
      </View>
    );
  };

  return (
    <BlurView intensity={10} tint="dark" style={blurViewStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1"
      />
      <Animated.View
        style={[animatedStyle]}
        className="bg-background h-full rounded-t-3xl p-6"
      >
        <View className="w-12 h-1 bg-accent-2 rounded-full mb-6 mt-8 self-center" />
        <ScrollView className="w-full">
          <View className="flex-row items-center justify-center mb-2">
            {renderDifficulty(trick.difficulty)}
          </View>
          <Text className="text-2xl text-text font-montserrat-alt-semibold text-center mb-1">
            {trick.name}
          </Text>
          {trick.alt_names && trick.alt_names.length > 0 && (
            <Text className="text-sm text-grey font-montserrat-light text-center">
              {trick.alt_names}
            </Text>
          )}
          {/* Placeholder for video */}
          <View className="w-full h-48 bg-buttonbg rounded-lg mb-4 mt-6" />
          <Text className="text-lg text-accent-2 font-montserrat-alt mb-2 text-center">
            Description
          </Text>
          <Text className="text-sm text-grey font-montserrat-light mb-4">
            {trick.description}
          </Text>
          <Text className="text-lg text-accent-2 font-montserrat-alt mb-2 text-center">
            Common Mistakes
          </Text>
          {renderCommonMistakes(trick.common_mistakes)}
        </ScrollView>
        <TouchableOpacity
          onPress={onClose}
          className="bg-buttonbg border border-accent-2 w-full p-3 rounded-3xl items-center mt-4"
        >
          <Text className="text-text font-montserrat-alt text-xl">Close</Text>
        </TouchableOpacity>
      </Animated.View>
    </BlurView>
  );
};

export default TrickModal;
