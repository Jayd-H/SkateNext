import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  AppState,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from "react-native-reanimated";
import PlayButton from "../../assets/icons/play-button-blue.svg";

interface TimerProps {
  onTimeUpdate: (time: number) => void;
  onTimerStop: (time: number) => void;
  style?: ViewStyle;
}

const Timer: React.FC<TimerProps> = ({ onTimeUpdate, onTimerStop, style }) => {
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [displayTime, setDisplayTime] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const opacity = useSharedValue<number>(1);
  const scale = useSharedValue<number>(1);
  const flyingTextOpacity = useSharedValue<number>(0);
  const flyingTextTranslateY = useSharedValue<number>(20);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [hours, minutes, secs]
      .map((v) => v.toString().padStart(2, "0"))
      .join(":");
  };

  const handleButtonPress = useCallback(() => {
    setIsTimerRunning((prev) => !prev);

    opacity.value = withSequence(
      withTiming(0, { duration: 150, easing: Easing.inOut(Easing.ease) }),
      withTiming(1, { duration: 150, easing: Easing.inOut(Easing.ease) })
    );
    scale.value = withSequence(
      withTiming(0.9, { duration: 100, easing: Easing.inOut(Easing.ease) }),
      withTiming(1, { duration: 100, easing: Easing.inOut(Easing.ease) })
    );

    flyingTextOpacity.value = 0;
    flyingTextTranslateY.value = 20;
    if (!isTimerRunning) {
      startTimeRef.current = Date.now();
      flyingTextOpacity.value = withDelay(
        2000,
        withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) })
      );
      flyingTextTranslateY.value = withDelay(
        2000,
        withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) })
      );
    } else {
      onTimerStop(displayTime);
      setDisplayTime(0);
      startTimeRef.current = null;
    }
  }, [isTimerRunning, displayTime, onTimerStop]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const flyingTextStyle = useAnimatedStyle(() => ({
    opacity: flyingTextOpacity.value,
    transform: [{ translateY: flyingTextTranslateY.value }],
  }));

  useEffect(() => {
    let animationFrameId: number;

    const updateTimer = () => {
      if (isTimerRunning && startTimeRef.current) {
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - startTimeRef.current) / 1000);
        setDisplayTime(elapsedSeconds);
        onTimeUpdate(elapsedSeconds);
      }
      animationFrameId = requestAnimationFrame(updateTimer);
    };

    if (isTimerRunning) {
      animationFrameId = requestAnimationFrame(updateTimer);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isTimerRunning, onTimeUpdate]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active" && isTimerRunning && startTimeRef.current) {
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - startTimeRef.current) / 1000);
        setDisplayTime(elapsedSeconds);
        onTimeUpdate(elapsedSeconds);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [isTimerRunning, onTimeUpdate]);

  const buttonStyle = isTimerRunning
    ? "bg-accent-2 border-buttonbg"
    : "bg-buttonbg border-accent-2";

  const formattedTime = formatTime(displayTime);

  return (
    <View style={style} className="relative">
      <TouchableOpacity
        className={`border w-full p-3 py-4 rounded-3xl mb-2 items-center ${buttonStyle}`}
        onPress={handleButtonPress}
      >
        <Animated.View style={animatedStyle}>
          {isTimerRunning ? (
            <View className="flex-row items-center">
              <Text className="text-2xl text-text font-montserrat-alt-bold">
                {formattedTime}
              </Text>
            </View>
          ) : (
            <PlayButton width={32} height={32} />
          )}
        </Animated.View>
      </TouchableOpacity>
      <Animated.Text
        className="absolute -top-5 w-full text-center text-xs text-gray-500 font-montserrat"
        style={flyingTextStyle}
      >
        Tap the button again to stop the timer
      </Animated.Text>
    </View>
  );
};

export default Timer;
