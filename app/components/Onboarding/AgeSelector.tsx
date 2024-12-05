import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Slider from "@react-native-community/slider";
import * as Haptics from "expo-haptics";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import ProgressIndicator from "./ProgressIndicator";
import BackgroundWave from "./BackgroundWave";
import WelcomeAnimation from "./WelcomeAnimation";

interface AgeSelectorProps {
  onComplete: (age: number) => void;
  onBack?: () => void;
}

class WelcomeState {
  static hasShownWelcome = false;
}

const AgeSelector: React.FC<AgeSelectorProps> = ({ onComplete, onBack }) => {
  const [age, setAge] = useState<number>(18);
  const [showWelcome, setShowWelcome] = useState(!WelcomeState.hasShownWelcome);
  const scale = useSharedValue(1);

  const handleWelcomeComplete = () => {
    WelcomeState.hasShownWelcome = true;
    setShowWelcome(false);
  };

  const handleNext = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 300,
    });
    setTimeout(() => {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 300,
      });
    }, 100);
    onComplete(age);
  };

  const handleSliderChange = (value: number) => {
    const roundedValue = Math.round(value);
    if (roundedValue !== age) {
      setAge(roundedValue);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View className="flex-1 bg-background">
      <BackgroundWave variant="age" />

      <View className="mt-8">
        <ProgressIndicator
          currentStep="age"
          onStepPress={(step) => {
            if (step === "age" && onBack) {
              onBack();
            }
          }}
        />
      </View>

      <View className="flex-1 justify-center items-center px-8">
        <Animated.View
          style={animatedStyle}
          className="items-center -mt-12 mb-16"
        >
          <Text className="text-text-muted font-montserrat-light text-xl mb-2">
            Your age
          </Text>
          <Text className="text-accent-bright font-montserrat-alt-bold text-7xl">
            {age}
          </Text>
        </Animated.View>

        <View className="w-full px-4">
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={8}
            maximumValue={80}
            step={1}
            value={age}
            onValueChange={handleSliderChange}
            minimumTrackTintColor="#34CDB3"
            maximumTrackTintColor="#1D7267"
            thumbTintColor="#4FEDE2"
          />

          <View className="flex-row justify-between mt-2 px-2">
            <Text className="text-text-dim font-montserrat-light text-sm">
              8
            </Text>
            <Text className="text-text-dim font-montserrat-light text-sm">
              80
            </Text>
          </View>
        </View>

        <Pressable
          onPress={handleNext}
          className="absolute bottom-12 right-8 bg-bg-elevated border-2 border-accent-bright rounded-2xl p-3"
        >
          <ChevronRight width={24} height={24} fill="#4FEDE2" />
        </Pressable>
      </View>

      {showWelcome && <WelcomeAnimation onComplete={handleWelcomeComplete} />}
    </View>
  );
};

export default AgeSelector;
