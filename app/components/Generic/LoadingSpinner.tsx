import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";
import Sparkles from "../../../assets/icons/sparkles.svg";

const LoadingSpinner = () => {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(360, {
          duration: 1000,
          easing: Easing.linear,
        })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View
      style={[animatedStyle]}
      className="items-center justify-center py-4"
    >
      <Sparkles width={40} height={40} />
    </Animated.View>
  );
};

export default LoadingSpinner;
