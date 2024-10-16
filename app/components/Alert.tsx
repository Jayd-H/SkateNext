import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  runOnJS,
  Easing,
} from "react-native-reanimated";

interface AlertProps {
  message: string;
  duration?: number;
  onHide: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, duration = 3000, onHide }) => {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    translateY.value = withSequence(
      withTiming(0, { duration: 200, easing: Easing.out(Easing.ease) }),
      withDelay(
        duration,
        withTiming(-200, {
          duration: 200,
          easing: Easing.in(Easing.ease),
        })
      )
    );

    opacity.value = withSequence(
      withTiming(1, { duration: 200 }),
      withDelay(duration, withTiming(0, { duration: 200 }))
    );

    const hideTimeout = setTimeout(() => {
      runOnJS(onHide)();
    }, duration + 600);

    return () => clearTimeout(hideTimeout);
  }, [duration, onHide]);

  return (
    <Animated.View
      className="absolute top-10 left-0 right-0 items-center z-50"
      style={animatedStyle}
    >
      <View className="bg-accent-dark px-4 py-2 rounded-lg shadow-md">
        <Text className="text-text font-montserrat-bold text-center">
          {message}
        </Text>
      </View>
    </Animated.View>
  );
};

export default Alert;
