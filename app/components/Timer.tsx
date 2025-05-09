import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  ViewStyle,
  AppState,
  AppStateStatus,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from "react-native-reanimated";
import * as Notifications from "expo-notifications";
import PlayButton from "../../assets/icons/play-button-blue.svg";
import { useHaptics } from "./Utils/useHaptics";
import { StorageService } from "./Utils/StorageService";

interface TimerProps {
  onTimeUpdate: (time: number) => void;
  onTimerStop: (time: number) => void;
  style?: ViewStyle;
}

const Timer: React.FC<TimerProps> = ({ onTimeUpdate, onTimerStop, style }) => {
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [displayTime, setDisplayTime] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const appState = useRef(AppState.currentState);
  const opacity = useSharedValue<number>(1);
  const scale = useSharedValue<number>(1);
  const flyingTextOpacity = useSharedValue<number>(0);
  const flyingTextTranslateY = useSharedValue<number>(20);

  useEffect(() => {
    const loadTimerState = async () => {
      const savedState = await StorageService.getTimerState();
      if (savedState && savedState.isRunning) {
        setIsTimerRunning(true);
        startTimeRef.current = savedState.startTime;
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - savedState.startTime!) / 1000);
        setDisplayTime(elapsedSeconds);
      }
    };
    loadTimerState();
  }, []);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [hours, minutes, secs]
      .map((v) => v.toString().padStart(2, "0"))
      .join(":");
  };

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const setupNotificationChannel = async () => {
    await Notifications.setNotificationChannelAsync("skate-timer", {
      name: "Skate Timer",
      importance: Notifications.AndroidImportance.HIGH,
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      showBadge: false,
      enableVibrate: false,
      enableLights: false,
      bypassDnd: true,
    });
  };

  useEffect(() => {
    setupNotificationChannel();
  }, []);

  const scheduleNotification = async () => {
    if (!startTimeRef.current) return;

    const intervals = [30, 3600, 7200]; // 30 seconds, 1 hour, 2 hours

    for (const seconds of intervals) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Skate Timer Running",
          body: `Your skate session has been running in the background for ${formatDuration(
            seconds
          )}`,
        },
        trigger: {
          seconds,
          channelId: "skate-timer",
        },
      });
    }
  };

  const formatDuration = (seconds: number): string => {
    if (seconds < 60) return `${seconds} seconds`;
    const hours = Math.floor(seconds / 3600);
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  };

  const cancelNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  const { triggerHaptic } = useHaptics();

  const handleButtonPress = useCallback(async () => {
    await triggerHaptic("medium");

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
      const now = Date.now();
      startTimeRef.current = now - displayTime * 1000;
      setIsTimerRunning(true);
      await StorageService.saveTimerState({
        isRunning: true,
        startTime: startTimeRef.current,
        elapsedTime: displayTime,
      });

      flyingTextOpacity.value = withDelay(
        2000,
        withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) })
      );
      flyingTextTranslateY.value = withDelay(
        2000,
        withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) })
      );
    } else {
      setIsTimerRunning(false);
      onTimerStop(displayTime);
      setDisplayTime(0);
      startTimeRef.current = null;
      await StorageService.clearTimerState();
      await cancelNotifications();
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
    let intervalId: ReturnType<typeof setInterval>;
    //* to save the timer state periodically
    if (isTimerRunning && startTimeRef.current) {
      intervalId = setInterval(() => {
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - startTimeRef.current!) / 1000);
        setDisplayTime(elapsedSeconds);
        onTimeUpdate(elapsedSeconds);

        StorageService.saveTimerState({
          isRunning: true,
          startTime: startTimeRef.current!,
          elapsedTime: elapsedSeconds,
        });
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isTimerRunning, onTimeUpdate]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async (nextAppState: AppStateStatus) => {
        if (isTimerRunning) {
          if (
            appState.current === "active" &&
            nextAppState.match(/inactive|background/)
          ) {
            await scheduleNotification();
            await StorageService.saveTimerState({
              isRunning: true,
              startTime: startTimeRef.current!,
              elapsedTime: displayTime,
            });
          } else if (
            appState.current.match(/inactive|background/) &&
            nextAppState === "active"
          ) {
            await cancelNotifications();
            const savedState = await StorageService.getTimerState();
            if (savedState && savedState.isRunning && savedState.startTime) {
              const now = Date.now();
              const elapsedSeconds = Math.floor(
                (now - savedState.startTime) / 1000
              );
              setDisplayTime(elapsedSeconds);
              onTimeUpdate(elapsedSeconds);
            }
          }
        }
        appState.current = nextAppState;
      }
    );

    return () => {
      subscription.remove();
    };
  }, [isTimerRunning, onTimeUpdate]);

  const formattedTime = formatTime(displayTime);

  return (
    <View style={style} className="relative">
      <View className="w-full relative">
        <View
          className={`
            absolute 
            top-1
            left-0
            right-0
            h-full
            rounded-3xl
            ${isTimerRunning ? "bg-accent-dark" : "bg-accent-dark"}
          `}
        />

        <Pressable
          onPress={handleButtonPress}
          className={`
            relative
            rounded-3xl
            w-full
            border-2
            ${
              isTimerRunning
                ? "border-accent-bright bg-accent-surface"
                : "border-accent-muted bg-accent-surface"
            }
            active:translate-y-1
            py-4
            items-center
          `}
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
        </Pressable>
      </View>
      <Animated.Text
        className="absolute -top-5 w-full text-center text-xs text-text-dim font-montserrat"
        style={flyingTextStyle}
      >
        Tap the button again to stop the timer
      </Animated.Text>
    </View>
  );
};

export default Timer;
