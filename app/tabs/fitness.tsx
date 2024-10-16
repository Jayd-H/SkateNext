import React, { useRef, useEffect, useState } from "react";
import { View, Text, AppState, AppStateStatus } from "react-native";
import DailyCalories from "../../assets/icons/fire3.svg";
import WeeklyCalories from "../../assets/icons/fire2.svg";
import AllTimeCalories from "../../assets/icons/fire4.svg";
import Skull from "../../assets/icons/burning-skull-white.svg";
import HoneyComb from "../../assets/icons/honeycomb.svg";
import Timer from "../components/Timer";
import Alert from "../components/Alert";

const Fitness: React.FC = () => {
  const appState = useRef(AppState.currentState);
  const backgroundTime = useRef<number | null>(null);
  const currentTime = useRef<number>(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => {
      subscription.remove();
    };
  }, []);

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

  const handleTimeUpdate = (time: number) => {
    currentTime.current = time;
  };

  const handleTimerStop = (time: number) => {
    const formattedTime = formatTime(time);
    setAlertMessage(`Skate sesh recorded ${formattedTime}`);
    setShowAlert(true);
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [hours, minutes, secs]
      .map((v) => v.toString().padStart(2, "0"))
      .join(":");
  };

  return (
    <View className="flex-1 items-center bg-background">
      {showAlert && (
        <Alert message={alertMessage} onHide={() => setShowAlert(false)} />
      )}
      <Text className="text-xl text-text font-montserrat-light mt-10">
        F I T N E S S
      </Text>
      <Text className="text-[10px] text-center w-5/6 text-grey font-montserrat-light mt-2">
        Please note that calorie estimation is for informational purposes only
        and not a substitute for professional medical advice
      </Text>
      <View className="mt-6">
        <View className="flex-row">
          <Text className="text-3xl text-text font-montserrat-alt mr-4">
            1 3 7 4
          </Text>
          <DailyCalories width={36} height={36} />
        </View>
        <Text className="pl-8 mt-1 mb-8 text-xl text-text font-montserrat-alt">
          Calories burnt today.
        </Text>
        <View className="flex-row">
          <Text className="text-3xl text-text font-montserrat-alt mr-4">
            5 6 4 3
          </Text>
          <WeeklyCalories width={36} height={36} />
        </View>
        <Text className="pl-8 mt-1 mb-8 text-xl text-text font-montserrat-alt">
          Calories burnt this week.
        </Text>
        <View className="flex-row">
          <Text className="text-3xl text-text font-montserrat-alt mr-4">
            8 5 0 3 5
          </Text>
          <AllTimeCalories width={36} height={36} />
        </View>
        <Text className="pl-8 mt-1 mb-8 text-xl text-text font-montserrat-alt">
          All-time calories burnt.
        </Text>
        <View className="flex-row">
          <Text className="text-3xl text-text font-montserrat-alt mr-4">
            1 3 %
          </Text>
          <Skull width={36} height={36} />
        </View>
        <Text className="pl-8 mt-1 text-xl text-text font-montserrat-alt">
          To skateboard mastery.
        </Text>
      </View>
      <Timer
        onTimeUpdate={handleTimeUpdate}
        onTimerStop={handleTimerStop}
        style={{ width: "85%", marginTop: 45 }}
      />
      <Text className="text-[12px] text-grey text-center font-montserrat-light mb-12">
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
