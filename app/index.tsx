import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StyledView = styled(View);
const StyledText = styled(Text);
const AnimatedStyledView = Animated.createAnimatedComponent(StyledView);

export default function Index() {
  const offset = useSharedValue(0);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    const getAppData = async () => {
      try {
        const appDataString = await AsyncStorage.getItem("appData");
        if (appDataString) {
          const appData = JSON.parse(appDataString);
          setLastUpdated(appData.lastUpdated);
        }
      } catch (error) {
        console.error("Error reading app data:", error);
      }
    };

    getAppData();
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  return (
    <StyledView className="flex-1 justify-center items-center bg-gray-100">
      <AnimatedStyledView
        style={animatedStyles}
        className="bg-blue-500 p-4 rounded-lg"
      >
        <StyledText className="text-white text-lg font-bold">
          Hello, Expo Router with NativeWind and Reanimated!
        </StyledText>
      </AnimatedStyledView>
      <TouchableOpacity
        onPress={() => {
          offset.value = withSpring(Math.random() * 255 - 127);
        }}
        className="mt-4 bg-green-500 p-2 rounded"
      >
        <StyledText className="text-white font-semibold">Animate</StyledText>
      </TouchableOpacity>
      {lastUpdated && (
        <StyledText className="mt-4 text-gray-600">
          Last Updated: {new Date(lastUpdated).toLocaleString()}
        </StyledText>
      )}
    </StyledView>
  );
}
