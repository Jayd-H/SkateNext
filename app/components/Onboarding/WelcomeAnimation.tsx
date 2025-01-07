import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  Easing,
  runOnJS,
  withSequence,
} from "react-native-reanimated";

interface WelcomeAnimationProps {
  onComplete: () => void;
}

const WelcomeAnimation = ({ onComplete }: WelcomeAnimationProps) => {
  const containerOpacity = useSharedValue(1);

  const welcomeOpacity = useSharedValue(0);
  const welcomeTranslateY = useSharedValue(20);

  const letters = "SKATENEXT".split("").map(() => ({
    opacity: useSharedValue(0),
    translateY: useSharedValue(30),
    scale: useSharedValue(0.5),
  }));

  useEffect(() => {
    const springConfig = {
      damping: 8,
      mass: 0.5,
      stiffness: 100,
    };

    welcomeOpacity.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.quad),
    });
    welcomeTranslateY.value = withSpring(0, springConfig);

    letters.forEach((letter, index) => {
      const delay = 400 + index * 80;

      letter.opacity.value = withDelay(
        delay,
        withTiming(1, {
          duration: 200,
          easing: Easing.out(Easing.quad),
        })
      );

      letter.translateY.value = withDelay(delay, withSpring(0, springConfig));

      letter.scale.value = withDelay(
        delay,
        withSequence(withSpring(1.2, springConfig), withSpring(1, springConfig))
      );
    });

    const totalDuration = 400 + letters.length * 80 + 1500;
    const timeout = setTimeout(() => {
      containerOpacity.value = withTiming(
        0,
        {
          duration: 400,
          easing: Easing.out(Easing.quad),
        },
        () => {
          runOnJS(onComplete)();
        }
      );
    }, totalDuration);

    return () => clearTimeout(timeout);
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const welcomeStyle = useAnimatedStyle(() => ({
    opacity: welcomeOpacity.value,
    transform: [{ translateY: welcomeTranslateY.value }],
  }));

  const letterComponents = "SKATENEXT".split("").map((char, index) => {
    const letterStyle = useAnimatedStyle(() => ({
      opacity: letters[index].opacity.value,
      transform: [
        { translateY: letters[index].translateY.value },
        { scale: letters[index].scale.value },
      ],
    }));

    return (
      <Animated.Text
        key={index}
        style={[letterStyle]}
        className="text-accent-bright font-montserrat-alt-bold text-4xl tracking-widest"
      >
        {char}
      </Animated.Text>
    );
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "#0F1413",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 50,
        },
        containerStyle,
      ]}
    >
      <Animated.Text
        style={welcomeStyle}
        className="text-text-muted font-montserrat-light text-xl mb-4"
      >
        Welcome to
      </Animated.Text>
      <View className="flex-row">{letterComponents}</View>
    </Animated.View>
  );
};

export default WelcomeAnimation;
