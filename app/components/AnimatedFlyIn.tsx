import React from "react";
import Animated from "react-native-reanimated";
import { View, ViewStyle } from "react-native";
import { useFlyInAnimation } from "../../src/hooks/useFlyInAnimation";

interface AnimatedFlyInProps {
  delay?: number;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const AnimatedFlyIn: React.FC<AnimatedFlyInProps> = ({
  delay = 0,
  children,
  style,
}) => {
  const animatedStyle = useFlyInAnimation(delay);
  return (
    <View style={style}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </View>
  );
};
