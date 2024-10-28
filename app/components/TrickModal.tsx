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
import { TRICK_DATA } from "./trickData";
import BurningSkull from "../../assets/icons/burning-skull.svg";
import VHS from "../../assets/icons/vhs.svg";
import ChevronRight from "../../assets/icons/chevron-right.svg";

interface SelectableButtonProps {
  title: string;
  subtitle: string;
  isSelected: boolean;
  onPress: () => void;
}

const SelectableButton: React.FC<SelectableButtonProps> = ({
  title,
  subtitle,
  isSelected,
  onPress,
}) => (
  <TouchableOpacity
    className={`${
      isSelected
        ? "bg-accent-dark border-accent"
        : "bg-buttonbg border-accent-2"
    } border w-full p-3 rounded-2xl mb-4 items-center`}
    onPress={onPress}
  >
    <Text className="text-text font-montserrat-alt text-xl">{title}</Text>
    <Text className="text-text font-montserrat text-xs text-center">
      {subtitle}
    </Text>
  </TouchableOpacity>
);

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
        duration: 100,
        easing: Easing.inOut(Easing.ease),
      });
    }
  };

  const headerStyle = {
    description: useAnimatedStyle(() => ({
      color: interpolateColor(progress.value, [0, 1], ["#EBEFEF", "#7A7A7A"]),
    })),
    mistakes: useAnimatedStyle(() => ({
      color: interpolateColor(progress.value, [0, 1], ["#7A7A7A", "#EBEFEF"]),
    })),
    descriptionBar: useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ["#EBEFEF", "#183C36"]
      ),
    })),
    mistakesBar: useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ["#183C36", "#EBEFEF"]
      ),
    })),
  };

  const descriptionStyle = useAnimatedStyle(() => ({
    opacity: withTiming(progress.value === 0 ? 1 : 0, {
      duration: 250,
      easing: Easing.inOut(Easing.ease),
    }),
    position: "absolute",
    width: "100%",
    display: progress.value === 0 ? "flex" : "none",
  }));

  const mistakesStyle = useAnimatedStyle(() => ({
    opacity: withTiming(progress.value === 1 ? 1 : 0, {
      duration: 250,
      easing: Easing.inOut(Easing.ease),
    }),
    position: "absolute",
    width: "100%",
    display: progress.value === 1 ? "flex" : "none", // i forgot what this was for but if i delete it it doesnt work and im too tired rn to figure it out
  }));

  return (
    <View className="px-4 w-full">
      <View className="flex-row justify-between items-center mb-3">
        <TouchableOpacity onPress={() => toggleSection(true)}>
          <View>
            <Animated.View
              style={[headerStyle.descriptionBar]}
              className={`rounded-full h-[2px] w-[80px]`}
            />
            <Animated.Text
              style={headerStyle.description}
              className={`font-montserrat mt-2 ${
                showingDescription ? "text-lg" : "text-base"
              }`}
            >
              Description
            </Animated.Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleSection(false)}>
          <View className="items-end">
            <Animated.View
              style={[headerStyle.mistakesBar]}
              className={`rounded-full h-[2px] w-[80px]`}
            />
            <Animated.Text
              style={headerStyle.mistakes}
              className={`font-montserrat mt-2 ${
                !showingDescription ? "text-lg" : "text-base"
              }`}
            >
              Common Mistakes
            </Animated.Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="relative" style={{ minHeight: 150 }}>
        <Animated.View style={descriptionStyle}>
          <Text className="text-sm text-grey font-montserrat">
            {description}
          </Text>
        </Animated.View>
        <Animated.View style={mistakesStyle}>
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
          <Text key={index} className="text-grey font-montserrat mb-2">
            {part.trim()}
          </Text>
        ) : null;
      } else {
        return (
          <Text key={index} className="text-accent-2 font-montserrat-alt">
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
    <BlurView intensity={50} tint="dark" style={blurViewStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1"
      />
      <Animated.View
        style={[animatedStyle]}
        className="bg-background h-full -mb-6 rounded-t-3xl p-6"
      >
        <View className="w-12 h-1 bg-accent-2 rounded-full mb-2 self-center" />
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity onPress={onClose} className="p-2">
            <ChevronRight
              width={24}
              height={24}
              style={{ transform: [{ rotate: "180deg" }] }}
              fill={"#EBEFEF"}
            />
          </TouchableOpacity>
          <TouchableOpacity className="bg-buttonbg border border-accent-2 rounded-full p-2">
            <VHS width={24} height={24} />
          </TouchableOpacity>
        </View>
        <View className="w-full items-center">
          <View className="flex-row items-center justify-center mb-2 -mt-12">
            {renderDifficulty(trick.difficulty)}
          </View>
          <Text className="text-2xl text-text font-montserrat-alt-semibold text-center">
            {trick.name}
          </Text>
          {trick.alt_names && trick.alt_names.length > 0 && (
            <Text className="text-sm text-grey font-montserrat text-center">
              {trick.alt_names}
            </Text>
          )}

          <View className="w-full px-4 mb-3">
            <Text className="text-text text-base font-montserrat-alt-light mb-2 mt-4 text-center">
              Can you land a {trick.name}?
            </Text>
            <SelectableButton
              title="Yes"
              subtitle="I can land one in every 4-5 tries"
              isSelected={completionState === 2}
              onPress={() => handleButtonSelection("yes")}
            />
            <SelectableButton
              title="Sometimes"
              subtitle="I can land one in every 1-3 tries"
              isSelected={completionState === 1}
              onPress={() => handleButtonSelection("sometimes")}
            />
            <SelectableButton
              title="No"
              subtitle="I have never landed one"
              isSelected={completionState === 0}
              onPress={() => handleButtonSelection("no")}
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
