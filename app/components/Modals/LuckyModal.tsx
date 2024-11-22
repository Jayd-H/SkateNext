import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  Pressable,
} from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import Sparkles from "../../../assets/icons/sparkles.svg";
import { getRecommendedTricks } from "../Utils/trickRecommender";
import { STORAGE_KEYS } from "../Utils/StorageService";
import LoadingSpinner from "../Generic/LoadingSpinner";
import { TRICK_DATA } from "../Data/trickData";
import Alert from "../Generic/Alert";
import Button from "../Generic/Button";

interface LuckyModalProps {
  isVisible: boolean;
  onClose: () => void;
  onTrickSelect: (trickId: string) => void;
  trickStates: Record<string, number>;
  onShowRecommendations: (recommendations: string[]) => void;
}

const LuckyModal: React.FC<LuckyModalProps> = ({
  isVisible,
  onClose,
  trickStates,
  onTrickSelect,
  onShowRecommendations,
}) => {
  const translateY = useSharedValue(1000);
  const [isCalculating, setIsCalculating] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);

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

  const handleRecommendation = async () => {
    try {
      setIsCalculating(true);
      const age = await AsyncStorage.getItem(STORAGE_KEYS.USER_AGE);
      const userAge = age ? parseInt(age) : 25;
      await new Promise((resolve) => setTimeout(resolve, 800));
      const newRecommendations = getRecommendedTricks(trickStates, userAge);
      onShowRecommendations(newRecommendations);
    } catch (error) {
      console.error("Error getting recommendations:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  const getRandomTrick = (tricks: typeof TRICK_DATA) => {
    return tricks[Math.floor(Math.random() * tricks.length)].id;
  };

  const handleRandomTrick = () => {
    onTrickSelect(getRandomTrick(TRICK_DATA));
  };

  const handleMasteredTrick = () => {
    const masteredTricks = TRICK_DATA.filter(
      (trick) => trickStates[trick.id] === 2
    );
    if (masteredTricks.length === 0) {
      setAlert("No mastered tricks yet. Keep practicing!");
      return;
    }
    onTrickSelect(getRandomTrick(masteredTricks));
  };

  const handleInProgressTrick = () => {
    const inProgressTricks = TRICK_DATA.filter(
      (trick) => trickStates[trick.id] >= 1
    );
    if (inProgressTricks.length === 0) {
      setAlert("No tricks in progress. Try landing some tricks!");
      return;
    }
    onTrickSelect(getRandomTrick(inProgressTricks));
  };

  const handleNotStartedTrick = () => {
    const notStartedTricks = TRICK_DATA.filter(
      (trick) => !trickStates[trick.id] || trickStates[trick.id] === 0
    );
    if (notStartedTricks.length === 0) {
      setAlert("All tricks have been started! Keep it up!");
      return;
    }
    onTrickSelect(getRandomTrick(notStartedTricks));
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

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
      {alert && <Alert message={alert} onHide={() => setAlert(null)} />}
      <Animated.View
        style={[animatedStyle]}
        className="bg-bg-card rounded-t-3xl h-full pt-6"
      >
        <View className="p-6">
          <View className="w-12 h-1 bg-accent-bright rounded-full mb-2 self-center opacity-50" />
          <View className="flex-row justify-between items-center mb-6">
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
              Feeling Lucky?
            </Text>
          </View>

          <View className="relative mb-8">
            {/* Glow effect */}
            <View
              className="absolute inset-0 rounded-3xl opacity-20"
              style={{
                backgroundColor: "#183C36",
                shadowColor: "#34CDB3",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 40,
              }}
            />
            <View className="relative">
              {/* bottom layer (shadow) */}
              <View className="absolute top-1 left-0 right-0 h-full rounded-3xl bg-accent-dark" />
              {/* top layer */}
              <Pressable
                onPress={handleRecommendation}
                disabled={isCalculating}
                className="relative rounded-3xl border-2 border-accent-bright bg-accent-surface active:translate-y-1 py-6 items-center"
              >
                {isCalculating ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <Sparkles
                      width={24}
                      height={24}
                      className="mb-2"
                      fill="#4FEDE2"
                    />
                    <Text className="text-xl text-accent-bright font-montserrat-alt-medium mb-1 tracking-widest">
                      WHAT'S NEXT?
                    </Text>
                    <Text className="text-sm text-text-dim font-montserrat text-center">
                      Let's find something new to learn
                    </Text>
                  </>
                )}
              </Pressable>
            </View>
          </View>

          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-[2px] bg-accent-bright opacity-30" />
            <Text className="text-lg text-text-muted font-montserrat-alt-light tracking-widest mx-4">
              Get a trick
            </Text>
            <View className="flex-1 h-[2px] bg-accent-bright opacity-30" />
          </View>

          <Button
            topText="A L L  T R I C K S"
            bottomText="Get a trick from all available tricks"
            onPress={handleRandomTrick}
          />

          <Button
            topText="M A S T E R E D  O N L Y"
            bottomText="Get a trick you've already mastered"
            onPress={handleMasteredTrick}
          />

          <Button
            topText="I N  P R O G R E S S"
            bottomText="Get a trick you've landed before"
            onPress={handleInProgressTrick}
          />

          <Button
            topText="N O T  S T A R T E D"
            bottomText="Get a trick you've never landed"
            onPress={handleNotStartedTrick}
          />
        </View>
      </Animated.View>
    </BlurView>
  );
};

export default LuckyModal;
