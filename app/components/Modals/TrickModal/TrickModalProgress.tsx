import React from "react";
import { View, Text } from "react-native";
import TrickModalButton from "./TrickModalButton";
import { ProgressProps } from "./types";
import { ModalTheme } from "./useModalTheme";
import { SharedValue } from "react-native-reanimated";

interface ExtendedProgressProps extends ProgressProps {
  theme: ModalTheme;
  glowOpacity: SharedValue<number>;
}

const TrickModalProgress: React.FC<ExtendedProgressProps> = ({
  name,
  completionState,
  onButtonSelection,
  theme,
  glowOpacity,
}) => {
  const getQuestionTextSize = (name: string) => {
    return name.length > 15 ? "text-xs" : "text-sm";
  };

  return (
    <View className="w-full px-4 mt-3">
      <Text
        className={`text-text font-montserrat-alt ${getQuestionTextSize(
          name
        )} mb-2 text-center tracking-wide`}
      >
        Can you land a {name}?
      </Text>
      <TrickModalButton
        topText="Y E S"
        bottomText="I can land 4-5 in every 5 tries"
        isSelected={completionState === 2}
        onPress={() => onButtonSelection("yes")}
        theme={theme}
        glowOpacity={glowOpacity}
        buttonType="success"
      />
      <TrickModalButton
        topText="S O M E T I M E S"
        bottomText="I can land 1-3 in every 5 tries"
        isSelected={completionState === 1}
        onPress={() => onButtonSelection("sometimes")}
        theme={theme}
        glowOpacity={glowOpacity}
        buttonType="warning"
      />
      <TrickModalButton
        topText="N O T  Y E T"
        bottomText="I have never landed one"
        isSelected={completionState === 0}
        onPress={() => onButtonSelection("no")}
        theme={theme}
        glowOpacity={glowOpacity}
        buttonType="danger"
      />
    </View>
  );
};

export default TrickModalProgress;
