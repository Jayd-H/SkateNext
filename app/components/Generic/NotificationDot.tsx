import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";

interface NotificationDotProps {
  isVisible: boolean;
}

export const NotificationDot: React.FC<NotificationDotProps> = ({
  isVisible,
}) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isVisible) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1,
        true
      );
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[animatedStyle]}
      className="absolute top-0 right-0 w-2 h-2 rounded-full border-[1px] border-accent-dark bg-accent"
    />
  );
};
