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

interface WeightSelectorProps {
  onComplete: (weight: number | null) => void;
  onBack?: () => void;
}

const WeightSelector: React.FC<WeightSelectorProps> = ({
  onComplete,
  onBack,
}) => {
  const [weight, setWeight] = useState<number>(70);
  const scale = useSharedValue(1);

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
    onComplete(weight);
  };

  const handleSkip = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onComplete(null);
  };

  const handleSliderChange = (value: number) => {
    const roundedValue = Math.round(value);
    if (roundedValue !== weight) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setWeight(roundedValue);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View className="flex-1 bg-background">
      <BackgroundWave variant="weight" />

      <View className="mt-8">
        <ProgressIndicator
          currentStep="weight"
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
          className="items-center mb-16 -mt-12"
        >
          <Text className="text-text-muted font-montserrat-light text-xl mb-2">
            Your weight
          </Text>
          <View className="flex-row items-baseline">
            <Text className="text-accent-bright font-montserrat-alt-bold text-7xl">
              {weight}
            </Text>
            <Text className="text-text-dim font-montserrat-light text-2xl ml-2">
              kg
            </Text>
          </View>
        </Animated.View>

        <View className="w-full px-4">
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={30}
            maximumValue={150}
            step={1}
            value={weight}
            onValueChange={handleSliderChange}
            minimumTrackTintColor="#34CDB3"
            maximumTrackTintColor="#1D7267"
            thumbTintColor="#4FEDE2"
          />

          <View className="flex-row justify-between mt-2">
            <Text className="text-text-dim font-montserrat-light text-sm">
              30
            </Text>
            <Text className="text-text-dim font-montserrat-light text-sm">
              150
            </Text>
          </View>
        </View>

        <View className="absolute bottom-12 w-full px-8 flex-row justify-between items-center">
          <Pressable
            onPress={handleSkip}
            className="bg-bg-elevated border-2 border-accent-dark rounded-2xl px-6 py-3 -ml-8"
          >
            <Text className="text-text-dim font-montserrat-medium text-sm">
              Skip
            </Text>
          </Pressable>

          <Pressable
            onPress={handleNext}
            className="bg-bg-elevated border-2 border-accent-bright rounded-2xl -mr-8 p-3"
          >
            <ChevronRight width={24} height={24} fill="#4FEDE2" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default WeightSelector;
