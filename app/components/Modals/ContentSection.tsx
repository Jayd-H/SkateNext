import React from "react";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolateColor,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

interface ContentSectionProps {
  description: string;
  commonMistakes: string;
  renderCommonMistakes: (mistakes: string) => React.ReactNode;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  description,
  commonMistakes,
}) => {
  const [showingDescription, setShowingDescription] = React.useState(true);
  const progress = useSharedValue(0);

  const getDescriptionTextSize = (text: string) => {
    return text.length > 300 ? "text-xs" : "text-sm";
  };

  const getMistakesTextSize = (text: string) => {
    return text.length > 200 ? "text-xs" : "text-sm";
  };

  const renderCustomMistakes = (mistakes: string) => {
    const textSize = getMistakesTextSize(mistakes);
    const subheadingSize = textSize === "text-xs" ? "text-sm" : "text-base";

    return mistakes.split(/\[([^\]]+)\]/).map((part, index) => {
      if (index % 2 === 0) {
        return part.trim() ? (
          <Text
            key={index}
            className={`text-text-dim font-montserrat mb-2 px-4 leading-6 ${textSize}`}
          >
            {part.trim()}
          </Text>
        ) : null;
      } else {
        return (
          <Text
            key={index}
            className={`text-accent-muted font-montserrat-alt-medium px-4 ${subheadingSize}`}
          >
            {part}
          </Text>
        );
      }
    });
  };

  const toggleSection = async (showDesc: boolean) => {
    if (showDesc !== showingDescription) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
    <View className="w-5/6 self-center">
      <View className="flex-row justify-between items-center mb-6">
        <Pressable onPress={() => toggleSection(true)} className="px-4">
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
        </Pressable>
        <Pressable onPress={() => toggleSection(false)} className="px-4">
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
        </Pressable>
      </View>
      <View className="">
        <Animated.View style={descriptionStyle}>
          <Text
            className={`text-text-dim font-montserrat leading-6 px-4 -mt-4 ${getDescriptionTextSize(
              description
            )}`}
          >
            {description}
          </Text>
        </Animated.View>
        <Animated.View style={mistakesStyle} className="-mt-4">
          {renderCustomMistakes(commonMistakes)}
        </Animated.View>
      </View>
    </View>
  );
};

export default ContentSection;
