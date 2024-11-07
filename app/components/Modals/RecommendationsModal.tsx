import React from "react";
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import BurningSkull from "../../../assets/icons/burning-skull.svg";
import { TRICK_DATA } from "../Data/trickData";

interface RecommendationsModalProps {
  isVisible: boolean;
  onClose: () => void;
  onTrickSelect: (trickId: string) => void;
  recommendations: string[];
  trickCompletionStates: Record<string, number>;
}

const RecommendationsModal: React.FC<RecommendationsModalProps> = ({
  isVisible,
  onClose,
  onTrickSelect,
  recommendations,
  trickCompletionStates,
}) => {
  const translateY = useSharedValue(1000);

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

  const renderDifficulty = (difficulty: string) => {
    const difficultyNumber = parseInt(difficulty, 10);
    const fullSkulls = Math.floor(difficultyNumber / 2);
    const hasHalfSkull = difficultyNumber % 2 !== 0;

    return (
      <View className="flex-row items-center mb-1">
        {[...Array(fullSkulls)].map((_, index) => (
          <BurningSkull key={index} width={20} height={20} className="mr-0.5" />
        ))}
        {hasHalfSkull && (
          <View style={{ width: 10, overflow: "hidden" }}>
            <BurningSkull width={20} height={20} />
          </View>
        )}
      </View>
    );
  };

  if (!isVisible) return null;

  const blurViewStyle: ViewStyle = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  return (
    <BlurView intensity={30} tint="dark" style={blurViewStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1"
      />
      <Animated.View
        style={[animatedStyle]}
        className="bg-background rounded-t-3xl h-full pt-8"
      >
        <View className="p-6">
          <View className="w-12 h-1 bg-accent-2 rounded-full mb-2 self-center" />
          <View className="flex-row justify-between items-center mb-2">
            <TouchableOpacity onPress={onClose} className="p-2">
              <ChevronRight
                width={24}
                height={24}
                style={{ transform: [{ rotate: "180deg" }] }}
                fill="#EBEFEF"
              />
            </TouchableOpacity>
            <Text className="text-xl text-text font-montserrat-alt flex-1 ml-4">
              Recommended Tricks
            </Text>
          </View>

          <Text className="text-sm text-grey font-montserrat text-center mb-6">
            Recommendations get progressively more challenging as you go down
          </Text>

          <View className="relative">
            {/* Background glow effect */}
            <View
              className="absolute inset-0 rounded-3xl opacity-10"
              style={{
                backgroundColor: "#183C36",
                shadowColor: "#34CDB3",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
              }}
            />

            <View className="space-y-4">
              {recommendations.map((trickId, index) => {
                const trick = TRICK_DATA.find((t) => t.id === trickId);
                if (!trick) return null;

                const borderColor =
                  trickCompletionStates[trickId] === 2
                    ? "#34CDB3"
                    : trickCompletionStates[trickId] === 1
                    ? "#FFB800"
                    : "#FF4444";

                return (
                  <TouchableOpacity
                    key={trickId}
                    onPress={() => onTrickSelect(trickId)}
                    className="bg-buttonbg border rounded-xl h-[72px] justify-center px-4"
                    style={{
                      borderColor,
                      shadowColor: borderColor,
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      elevation: 5,
                    }}
                  >
                    <View className="flex-row items-start justify-between">
                      <View className="flex-1">
                        <Text
                          className="text-base text-text font-montserrat-alt"
                          numberOfLines={1}
                        >
                          {trick.name}
                        </Text>
                        <Text
                          className="text-xs text-grey font-montserrat mt-0.5"
                          numberOfLines={1}
                        >
                          {trick.alt_names || " "}
                        </Text>
                      </View>
                      <View className="ml-2">
                        {renderDifficulty(trick.difficulty)}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </Animated.View>
    </BlurView>
  );
};

export default RecommendationsModal;
