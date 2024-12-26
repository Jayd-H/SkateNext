import React, { useRef, useEffect, useState } from "react";
import { View, Text, AppState, AppStateStatus } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
  Easing,
} from "react-native-reanimated";
import DailyCalories from "../../assets/icons/fire3.svg";
import WeeklyCalories from "../../assets/icons/fire2.svg";
import AllTimeCalories from "../../assets/icons/fire4.svg";
import Skull from "../../assets/icons/burning-skull-white.svg";
import HoneyComb from "../../assets/icons/honeycomb.svg";
import Timer from "../components/Timer";
import Alert from "../components/Generic/Alert";
import { StorageService } from "../components/Utils/StorageService";
import {
  calculateSessionCalories,
  getCalorieStats,
} from "../components/Utils/calorieEstimation";
import { calculateSkateboardMastery } from "../components/Utils/masteryCalculation";
import { TRICK_COMPONENTS } from "../components/Data/trickComponents";
import { useHaptics } from "../components/Utils/useHaptics";

const MIN_LOADING_TIME = 500;

interface AnimatedLoadingProps {
  isLoading: boolean;
  value: string | number;
  showPercentage?: boolean;
  className?: string;
}

// !this is a really ugly way to do this, but it works for now
const AnimatedLoading: React.FC<AnimatedLoadingProps> = ({
  isLoading,
  value,
  showPercentage = false,
  className = "text-3xl text-text font-montserrat-alt mr-4",
}) => {
  const rotate = useSharedValue(0);

  React.useEffect(() => {
    if (isLoading) {
      rotate.value = withRepeat(
        withSequence(
          withTiming(0.1, { duration: 400, easing: Easing.inOut(Easing.sin) }),
          withTiming(-0.1, { duration: 400, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      );
    } else {
      rotate.value = 0;
    }
  }, [isLoading]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}rad` }],
  }));

  return (
    <View style={{ flexDirection: "row" }}>
      <Animated.Text
        style={isLoading ? animatedStyles : undefined}
        className={className}
      >
        {isLoading ? "?" : value}
      </Animated.Text>
      {isLoading && showPercentage && <Text className={className}>%</Text>}
      {!isLoading && showPercentage && null}
    </View>
  );
};

const Fitness: React.FC = () => {
  const appState = useRef(AppState.currentState);
  const backgroundTime = useRef<number | null>(null);
  const currentTime = useRef<number>(0);

  const [stats, setStats] = useState({
    todayCalories: 0,
    weeklyCalories: 0,
    allTimeCalories: 0,
  });
  const [masteryPercentage, setMasteryPercentage] = useState<number>(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isMasteryLoading, setIsMasteryLoading] = useState(true);

  useEffect(() => {
    const initialLoad = async () => {
      await loadCalorieStats();
      const startTime = Date.now();
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < MIN_LOADING_TIME) {
        await new Promise((resolve) =>
          setTimeout(resolve, MIN_LOADING_TIME - elapsedTime)
        );
      }
      setIsInitialLoading(false);
    };
    initialLoad();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadMasteryPercentage();
    }, [])
  );

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => {
      subscription.remove();
    };
  }, []);

  const loadCalorieStats = async () => {
    try {
      const logs = await StorageService.getAllCalorieLogs();
      const calorieStats = await getCalorieStats(logs);
      setStats({
        todayCalories: calorieStats.today,
        weeklyCalories: calorieStats.weekly,
        allTimeCalories: calorieStats.allTime,
      });
    } catch (error) {
      console.error("Error loading calorie stats:", error);
    }
  };

  const loadMasteryPercentage = async () => {
    setIsMasteryLoading(true);
    const startTime = Date.now();

    try {
      const trickStates = await StorageService.getTrickStates();
      const mastery = calculateSkateboardMastery(trickStates);

      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < MIN_LOADING_TIME) {
        await new Promise((resolve) =>
          setTimeout(resolve, MIN_LOADING_TIME - elapsedTime)
        );
      }

      setMasteryPercentage(mastery);
    } catch (error) {
      console.error("Error loading mastery percentage:", error);
    } finally {
      setIsMasteryLoading(false);
    }
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appState.current === "active" &&
      nextAppState.match(/inactive|background/)
    ) {
      backgroundTime.current = Date.now();
    } else if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      if (backgroundTime.current !== null) {
        const elapsedSeconds = Math.floor(
          (Date.now() - backgroundTime.current) / 1000
        );
        currentTime.current += elapsedSeconds;
      }
    }
    appState.current = nextAppState;
  };

  const handleTimeUpdate = async (time: number) => {
    currentTime.current = time;
  };

  const { triggerHaptic } = useHaptics();

  const handleTimerStop = async (duration: number) => {
    try {
      await triggerHaptic("medium");
      const userStats = await StorageService.getUserStats();
      const trickStates = await StorageService.getTrickStates();

      const calories = calculateSessionCalories(
        duration,
        userStats,
        trickStates,
        TRICK_COMPONENTS
      );

      const formattedTime = formatTime(duration);
      setAlertMessage(
        `Skate sesh recorded: ${formattedTime}\nCalories burned: ${calories}`
      );
      setShowAlert(true);

      const today = new Date().toISOString().split("T")[0];
      const currentLog = await StorageService.getCalorieLog(today);

      const newSession = {
        timestamp: Date.now(),
        duration,
        caloriesBurned: calories,
      };

      const updatedLog = currentLog
        ? {
            ...currentLog,
            sessions: [...currentLog.sessions, newSession],
            totalCalories: currentLog.totalCalories + calories,
          }
        : {
            date: today,
            sessions: [newSession],
            totalCalories: calories,
          };

      await StorageService.updateCalorieLog(today, updatedLog);
      await loadCalorieStats();
    } catch (error) {
      console.error("Error handling timer stop:", error);
      setAlertMessage("Error recording session");
      setShowAlert(true);
    }
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [hours, minutes, secs]
      .map((v) => v.toString().padStart(2, "0"))
      .join(":");
  };

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const formatMastery = (percentage: number): string => {
    return percentage.toString();
  };

  let iconsize: number = 36;

  return (
    <View className="flex-1 items-center bg-background">
      {showAlert && (
        <Alert message={alertMessage} onHide={() => setShowAlert(false)} />
      )}
      <Text className="text-lg text-accent-muted font-montserrat-alt-semibold tracking-wide mt-10">
        F I T N E S S
      </Text>
      <Text className="text-[10px] text-center w-5/6 text-text-dim font-montserrat-light mt-2">
        Please note that calorie estimation is for informational purposes only
        and not a substitute for professional medical advice
      </Text>
      <View className="mt-6">
        <View className="flex-row">
          <AnimatedLoading
            isLoading={isInitialLoading}
            value={formatNumber(stats.todayCalories)}
          />
          <DailyCalories width={iconsize} height={iconsize} fill="#4FEDE2" />
        </View>
        <Text className="pl-8 mt-1 mb-8 text-xl text-text font-montserrat-alt">
          Calories burnt today.
        </Text>
        <View className="flex-row">
          <AnimatedLoading
            isLoading={isInitialLoading}
            value={formatNumber(stats.weeklyCalories)}
          />
          <WeeklyCalories width={iconsize} height={iconsize} fill="#4FEDE2" />
        </View>
        <Text className="pl-8 mt-1 mb-8 text-xl text-text font-montserrat-alt">
          Calories burnt this week.
        </Text>
        <View className="flex-row">
          <AnimatedLoading
            isLoading={isInitialLoading}
            value={formatNumber(stats.allTimeCalories)}
          />
          <AllTimeCalories width={iconsize} height={iconsize} fill="#4FEDE2" />
        </View>
        <Text className="pl-8 mt-1 mb-8 text-xl text-text font-montserrat-alt">
          All-time calories burnt.
        </Text>
        <View className="flex-row items-center h-[48px]">
          <AnimatedLoading
            isLoading={isMasteryLoading}
            value={`${formatMastery(masteryPercentage)} %`}
            showPercentage={true}
          />
          <Skull width={iconsize} height={iconsize} fill="#4FEDE2" />
        </View>
        <Text className="pl-8 mt-1 text-xl text-text font-montserrat-alt">
          To skateboard mastery.
        </Text>
      </View>
      <Timer
        onTimeUpdate={handleTimeUpdate}
        onTimerStop={handleTimerStop}
        style={{ width: "85%", marginTop: 35 }}
      />
      <Text className="text-[12px] text-text-dim font-montserrat-light mb-12 w-5/6 pt-4 text-center">
        Tap the button to begin a skate sesh, calories will be estimated based
        on your skill level and duration of the session.
      </Text>
      <View className="absolute -z-10 left-[200px] top-[150px]">
        <HoneyComb width={400} height={400} />
      </View>
    </View>
  );
};

export default Fitness;
