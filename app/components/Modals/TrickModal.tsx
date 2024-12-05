import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import * as Network from "expo-network";
import { TRICK_DATA } from "../Data/trickData";
import BurningSkull from "../../../assets/icons/burning-skull.svg";
import KingSkull from "../../../assets/icons/crowned-skull.svg";
import VHS from "../../../assets/icons/vhs.svg";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import Button from "../Generic/Button";
import VideoModal from "./VideoModal";
import ContentSection from "./ContentSection";

interface TrickModalProps {
  isVisible: boolean;
  onClose: () => void;
  trickId: string;
  completionState: number;
  onCompletionChange: (trickId: string, state: number) => void;
}

//! this file is a bit of a mess and could use some refactoring
const TrickModal: React.FC<TrickModalProps> = ({
  isVisible,
  onClose,
  trickId,
  completionState,
  onCompletionChange,
}) => {
  const translateY = useSharedValue(1000);
  const trick = TRICK_DATA.find((t: any) => t.id === trickId);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const getTrickNameSize = (name: string) => {
    if (name.length > 23) return "text-base";
    if (name.length > 15) return "text-lg";
    if (name.length > 10) return "text-xl";
    return "text-2xl";
  };

  const getQuestionTextSize = (name: string) => {
    return name.length > 15 ? "text-xs" : "text-sm";
  };

  const getContentPadding = (name: string) => {
    if (name.length > 20) return "pb-44";
    if (name.length > 30) return "pb-40";
    return "pb-36";
  };

  React.useEffect(() => {
    const checkConnection = async () => {
      const networkState = await Network.getNetworkStateAsync();
      setIsConnected(networkState.isConnected || false);
    };

    const interval = setInterval(checkConnection, 5000);
    checkConnection();

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (isVisible) {
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.bezier(0.33, 1, 0.68, 1),
      });
    } else {
      translateY.value = withTiming(1000, {
        duration: 150,
        easing: Easing.bezier(0.32, 0, 0.67, 0),
      });
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!isVisible || !trick) return null;

  const blurViewStyle: ViewStyle = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "flex-end",
    zIndex: 100,
  };

  const renderCommonMistakes = (mistakes: string) => {
    return mistakes.split(/\[([^\]]+)\]/).map((part, index) => {
      if (index % 2 === 0) {
        return part.trim() ? (
          <Text
            key={index}
            className="text-text-dim font-montserrat mb-2 px-4 leading-6 text-sm"
          >
            {part.trim()}
          </Text>
        ) : null;
      } else {
        return (
          <Text
            key={index}
            className="text-accent-muted font-montserrat-alt-medium px-4 text-sm"
          >
            {part}
          </Text>
        );
      }
    });
  };

  const renderDifficulty = (difficulty: string) => {
    const difficultyNumber = parseInt(difficulty, 10);

    if (difficultyNumber === 11) {
      return (
        <View className="absolute inset-x-0 flex-row items-center justify-center">
          <View>
            <KingSkull width={32} height={32} fill="#4FEDE2" />
          </View>
        </View>
      );
    }

    const fullSkulls = Math.floor(difficultyNumber / 2);
    const hasHalfSkull = difficultyNumber % 2 !== 0;

    const skullElements = [];

    for (let i = 0; i < fullSkulls; i++) {
      skullElements.push(
        <BurningSkull key={i} width={32} height={32} fill="#4FEDE2" />
      );
    }

    if (hasHalfSkull) {
      skullElements.push(
        <View key="half" style={{ width: 16, overflow: "hidden" }}>
          <BurningSkull width={32} height={32} fill="#4FEDE2" />
        </View>
      );
    }

    const totalSkulls = fullSkulls + (hasHalfSkull ? 1 : 0);
    const spacing = (totalSkulls - 1) * 8;
    const totalWidth = totalSkulls * 32 - (hasHalfSkull ? 16 : 0) + spacing;

    return (
      <View
        className="absolute inset-x-0 flex-row items-center justify-center"
        style={{ left: 0, right: 0 }}
      >
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

  const handleButtonSelection = async (value: "yes" | "sometimes" | "no") => {
    const stateMap = {
      yes: 2,
      sometimes: 1,
      no: 0,
    };
    const newState = completionState === stateMap[value] ? 0 : stateMap[value];
    onCompletionChange(trickId, newState);
  };

  const handleVHSPress = async () => {
    if (!isConnected) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsVideoModalVisible(true);
  };

  return (
    <BlurView intensity={20} tint="dark" style={blurViewStyle}>
      <Pressable onPress={onClose} className="flex-1" />
      <Animated.View
        style={[animatedStyle]}
        className="bg-bg-card rounded-t-[32px] h-full"
      >
        <View className="flex-1">
          {/* Header Section */}
          <View className="p-6">
            <View className="w-12 h-1 bg-accent-bright rounded-full mb-4 self-center mt-4 opacity-50" />

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
              <TouchableOpacity
                onPress={handleVHSPress}
                disabled={!isConnected}
                className={`bg-bg-elevated border-2 ${
                  isConnected ? "border-accent-bright" : "border-text-dim"
                } rounded-2xl p-3`}
              >
                <VHS
                  width={24}
                  height={24}
                  fill={isConnected ? "#4FEDE2" : "#7A9E9B"}
                />
              </TouchableOpacity>
            </View>

            {/* Trick Info Section */}
            <View>
              <View className="h-8 mb-6 -mt-16 w-full relative">
                {renderDifficulty(trick.difficulty)}
              </View>

              <View className="w-5/6 self-center justify-center">
                <Text
                  className={`${getTrickNameSize(
                    trick.name
                  )} text-accent-bright font-montserrat-alt-bold text-center tracking-wide uppercase mb-1`}
                >
                  {trick.name}
                </Text>
                <View className="justify-center -mt-1">
                  {trick.alt_names ? (
                    <Text className="text-text-dim font-montserrat-medium text-center">
                      {trick.alt_names}
                    </Text>
                  ) : (
                    <Text className="text-text-dim font-montserrat-medium text-center opacity-0">
                      placeholder
                    </Text>
                  )}
                </View>
              </View>

              {/* Buttons Section */}
              <View className="w-full px-4 mt-3">
                <Text
                  className={`text-text font-montserrat-alt ${getQuestionTextSize(
                    trick.name
                  )} mb-2 text-center tracking-wide`}
                >
                  Can you land a {trick.name}?
                </Text>
                <Button
                  topText="Y E S"
                  bottomText="I can land 4-5 in every 5 tries"
                  isSelected={completionState === 2}
                  onPress={() => handleButtonSelection("yes")}
                  variant="selectable"
                />
                <Button
                  topText="S O M E T I M E S"
                  bottomText="I can land 1-3 in every 5 tries"
                  isSelected={completionState === 1}
                  onPress={() => handleButtonSelection("sometimes")}
                  variant="selectable"
                />
                <Button
                  topText="N O T  Y E T"
                  bottomText="I have never landed one"
                  isSelected={completionState === 0}
                  onPress={() => handleButtonSelection("no")}
                  variant="selectable"
                />
              </View>
            </View>
          </View>

          <View className="flex-1 -mt-5">
            <ContentSection
              description={trick.description}
              commonMistakes={trick.common_mistakes}
              renderCommonMistakes={renderCommonMistakes}
            />
          </View>
        </View>
      </Animated.View>

      <VideoModal
        isVisible={isVideoModalVisible}
        onClose={() => setIsVideoModalVisible(false)}
        videoUrl={trick.video_link}
      />
    </BlurView>
  );
};

export default TrickModal;
