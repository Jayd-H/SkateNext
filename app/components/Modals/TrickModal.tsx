import React from "react";
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolateColor,
} from "react-native-reanimated";
import { TRICK_DATA } from "../Data/trickData";
import BurningSkull from "../../../assets/icons/burning-skull.svg";
import KingSkull from "../../../assets/icons/crowned-skull.svg";
import VHS from "../../../assets/icons/vhs.svg";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import Button from "../Generic/Button";

interface ContentSectionProps {
  description: string;
  commonMistakes: string;
  renderCommonMistakes: (mistakes: string) => React.ReactNode;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  description,
  commonMistakes,
  renderCommonMistakes,
}) => {
  const [showingDescription, setShowingDescription] = React.useState(true);
  const progress = useSharedValue(0);

  const toggleSection = (showDesc: boolean) => {
    if (showDesc !== showingDescription) {
      setShowingDescription(showDesc);
      progress.value = withTiming(showDesc ? 0 : 1, {
        duration: 200,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      });
    }
  };

  const headerStyle = {
    description: useAnimatedStyle(() => ({
      color: interpolateColor(progress.value, [0, 1], ["#4FEDE2", "#7A9E9B"]),
    })),
    mistakes: useAnimatedStyle(() => ({
      color: interpolateColor(progress.value, [0, 1], ["#7A9E9B", "#4FEDE2"]),
    })),
    descriptionBar: useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ["#4FEDE2", "#7A9E9B"]
      ),
    })),
    mistakesBar: useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ["#7A9E9B", "#4FEDE2"]
      ),
    })),
  };

  const descriptionStyle = useAnimatedStyle(() => ({
    opacity: withTiming(progress.value === 0 ? 1 : 0, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    }),
    position: "absolute",
    width: "100%",
    display: progress.value === 0 ? "flex" : "none",
  }));

  const mistakesStyle = useAnimatedStyle(() => ({
    opacity: withTiming(progress.value === 1 ? 1 : 0, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    }),
    position: "absolute",
    width: "100%",
    display: progress.value === 1 ? "flex" : "none",
  }));

  return (
    <View className="px-4 mt-2">
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity onPress={() => toggleSection(true)} className="px-4">
          <View>
            <Animated.View
              style={[headerStyle.descriptionBar]}
              className="w-20 rounded-full h-[2px] mb-2"
            />
            <Animated.Text
              style={headerStyle.description}
              className={`font-montserrat-alt-medium ${
                showingDescription ? "text-base" : "text-sm"
              }`}
            >
              Description
            </Animated.Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleSection(false)} className="px-4">
          <View className="items-end">
            <Animated.View
              style={[headerStyle.mistakesBar]}
              className="w-20 rounded-full h-[2px] mb-2"
            />
            <Animated.Text
              style={headerStyle.mistakes}
              className={`font-montserrat-alt-medium ${
                !showingDescription ? "text-base" : "text-sm"
              }`}
            >
              Common Mistakes
            </Animated.Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="">
        <Animated.View style={descriptionStyle}>
          <Text className="text-text-dim font-montserrat leading-6 text-sm px-4 -mt-4">
            {description}
          </Text>
        </Animated.View>
        <Animated.View style={mistakesStyle} className="-mt-4">
          {renderCommonMistakes(commonMistakes)}
        </Animated.View>
      </View>
    </View>
  );
};

interface TrickModalProps {
  isVisible: boolean;
  onClose: () => void;
  trickId: string;
  completionState: number;
  onCompletionChange: (trickId: string, state: number) => void;
}

const TrickModal: React.FC<TrickModalProps> = ({
  isVisible,
  onClose,
  trickId,
  completionState,
  onCompletionChange,
}) => {
  const translateY = useSharedValue(1000);
  const trick = TRICK_DATA.find((t: any) => t.id === trickId);

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

  const handleButtonSelection = (value: "yes" | "sometimes" | "no") => {
    const stateMap = {
      yes: 2,
      sometimes: 1,
      no: 0,
    };
    const newState = completionState === stateMap[value] ? 0 : stateMap[value];
    onCompletionChange(trickId, newState);
  };

  return (
    <BlurView intensity={20} tint="dark" style={blurViewStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1"
      />
      <Animated.View
        style={[animatedStyle]}
        className="bg-bg-card h-full rounded-t-[32px] p-6"
      >
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
          <TouchableOpacity className="bg-bg-elevated border-2 border-accent-bright rounded-2xl p-3">
            <VHS width={24} height={24} fill="#4FEDE2" />
          </TouchableOpacity>
        </View>

        <View className="w-full items-center">
          <View className="h-8 mb-6 -mt-16 w-full relative">
            {renderDifficulty(trick.difficulty)}
          </View>

          <Text
            className={`${
              trick.name.length > 15 ? "text-xl" : "text-2xl"
            } text-accent-bright font-montserrat-alt-bold text-center tracking-wide uppercase mb-1 w-5/6`}
          >
            {trick.name}
          </Text>
          {trick.alt_names && trick.alt_names.length > 0 && (
            <Text className="text-text-dim font-montserrat-medium text-center">
              {trick.alt_names}
            </Text>
          )}

          <View className="w-full px-4 mt-4">
            <Text className="text-text font-montserrat-alt text-sm mb-2 text-center tracking-wide">
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

          <ContentSection
            description={trick.description}
            commonMistakes={trick.common_mistakes}
            renderCommonMistakes={renderCommonMistakes}
          />
        </View>
      </Animated.View>
    </BlurView>
  );
};

export default TrickModal;
