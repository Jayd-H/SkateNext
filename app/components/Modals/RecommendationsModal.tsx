import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  FadeIn,
} from "react-native-reanimated";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import { TRICK_DATA, Trick } from "../Data/trickData";
import ModalTrickButton from "../Generic/ModalTrickButton";
import DraggableModal from "../Generic/DraggableModal";
import { useBlacklistedTricks } from "../Utils/StorageService";

interface AnimatedTrickItemProps {
  index: number;
  isRefreshing: boolean;
  trick: Trick;
  completionState: number;
  onPress: () => void;
  onBlacklist: () => void;
  animateEnter: boolean;
}

const AnimatedTrickItem: React.FC<AnimatedTrickItemProps> = ({
  index,
  isRefreshing,
  trick,
  completionState,
  onPress,
  onBlacklist,
  animateEnter,
}) => {
  const translateY = useSharedValue(animateEnter ? -15 : 0);
  const opacity = useSharedValue(animateEnter ? 0 : 1);

  useEffect(() => {
    if (animateEnter) {
      const delay = index * 30;
      translateY.value = withDelay(
        delay,
        withTiming(0, { duration: 200, easing: Easing.out(Easing.back(1.5)) })
      );
      opacity.value = withDelay(
        delay,
        withTiming(1, { duration: 200, easing: Easing.inOut(Easing.ease) })
      );
    } else if (isRefreshing) {
      const delay = index * 30;
      translateY.value = withDelay(
        delay,
        withTiming(30, { duration: 200, easing: Easing.inOut(Easing.ease) })
      );
      opacity.value = withDelay(
        delay,
        withTiming(0, { duration: 150, easing: Easing.inOut(Easing.ease) })
      );
    }
  }, [isRefreshing, index, animateEnter]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <ModalTrickButton
        name={trick.name}
        altNames={trick.alt_names}
        difficulty={trick.difficulty}
        completionState={completionState}
        onPress={onPress}
        showBlacklistButton={true}
        onBlacklist={onBlacklist}
      />
    </Animated.View>
  );
};

interface RecommendationsModalProps {
  isVisible: boolean;
  onClose: () => void;
  onTrickSelect: (trickId: string) => void;
  recommendations: string[];
  trickCompletionStates: Record<string, number>;
  onRefreshRecommendations?: () => Promise<void>;
}

const RecommendationsModal: React.FC<RecommendationsModalProps> = ({
  isVisible,
  onClose,
  onTrickSelect,
  recommendations,
  trickCompletionStates,
  onRefreshRecommendations,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { addTrickToBlacklist } = useBlacklistedTricks();
  const [localRecommendations, setLocalRecommendations] = useState<string[]>(
    []
  );
  const [pendingRecommendations, setPendingRecommendations] = useState<
    string[]
  >([]);
  const [shouldAnimateEnter, setShouldAnimateEnter] = useState(false);
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  useEffect(() => {
    if (
      isVisible &&
      localRecommendations.length === 0 &&
      recommendations.length > 0
    ) {
      setLocalRecommendations(recommendations);
    }
  }, [isVisible, recommendations, localRecommendations.length]);

  useEffect(() => {
    if (
      !isRefreshing &&
      recommendations.length > 0 &&
      JSON.stringify(recommendations) !==
        JSON.stringify(localRecommendations) &&
      JSON.stringify(recommendations) !== JSON.stringify(pendingRecommendations)
    ) {
      setLocalRecommendations(recommendations);
    }
  }, [
    recommendations,
    isRefreshing,
    localRecommendations,
    pendingRecommendations,
  ]);

  useEffect(() => {
    if (pendingRecommendations.length > 0 && !isRefreshing) {
      setLocalRecommendations(pendingRecommendations);
      setPendingRecommendations([]);
      setShouldAnimateEnter(true);

      if (animationTimeoutRef.current !== null) {
        clearTimeout(animationTimeoutRef.current);
      }

      animationTimeoutRef.current = setTimeout(() => {
        setShouldAnimateEnter(false);
      }, 1000);
    }
  }, [isRefreshing, pendingRecommendations]);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current !== null) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const handleBlacklist = async (trickId: string) => {
    setIsRefreshing(true);
    await addTrickToBlacklist(trickId);
    await new Promise((resolve) => setTimeout(resolve, 250));
    if (onRefreshRecommendations) {
      try {
        await onRefreshRecommendations();
        setPendingRecommendations(recommendations);
        if (animationTimeoutRef.current !== null) {
          clearTimeout(animationTimeoutRef.current);
        }

        animationTimeoutRef.current = setTimeout(() => {
          setIsRefreshing(false);
        }, 150);
      } catch (error) {
        console.error("Error refreshing recommendations:", error);
        setIsRefreshing(false);
      }
    } else {
      setIsRefreshing(false);
    }
  };

  if (!isVisible) return null;

  return (
    <DraggableModal isVisible={isVisible} onClose={onClose}>
      <View className="p-6">
        <View className="flex-row justify-between items-center mb-2">
          <TouchableOpacity
            onPress={onClose}
            className="bg-bg-elevated p-3 rounded-2xl"
          >
            <ChevronRight
              width={24}
              height={24}
              style={{ transform: [{ rotate: "180deg" }] }}
              fill="#4FEDE2"
            />
          </TouchableOpacity>
          <Text className="text-xl text-text font-montserrat-alt-medium flex-1 ml-4">
            Recommended Tricks
          </Text>
        </View>

        <Text className="text-text-dim font-montserrat text-center mb-6">
          Recommendations get progressively more challenging as you go down
        </Text>

        <View className="relative">
          <View className="space-y-4 min-h-[300px]">
            {localRecommendations.length > 0 ? (
              localRecommendations.map((trickId, index) => {
                const trick = TRICK_DATA.find((t) => t.id === trickId);
                if (!trick) return null;

                return (
                  <AnimatedTrickItem
                    key={`${trickId}-${
                      shouldAnimateEnter ? "animate" : "static"
                    }`}
                    index={index}
                    isRefreshing={isRefreshing}
                    trick={trick}
                    completionState={trickCompletionStates[trickId] || 0}
                    onPress={() => onTrickSelect(trickId)}
                    onBlacklist={() => handleBlacklist(trickId)}
                    animateEnter={shouldAnimateEnter}
                  />
                );
              })
            ) : (
              <Animated.View
                className="h-40 items-center justify-center"
                entering={FadeIn.duration(200)}
              >
                <Text className="text-text-dim font-montserrat-light text-center">
                  No recommendations available. Try refreshing or adjusting your
                  blacklist.
                </Text>
              </Animated.View>
            )}
          </View>
        </View>
      </View>
    </DraggableModal>
  );
};

export default RecommendationsModal;
