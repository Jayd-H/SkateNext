import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
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

type WeightUnit = "kg" | "lbs" | "st";

interface WeightSelectorProps {
  onComplete: (weight: number | null) => void;
  onBack?: () => void;
}

const WeightSelector: React.FC<WeightSelectorProps> = ({
  onComplete,
  onBack,
}) => {
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");
  const [weight, setWeight] = useState<number>(70);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("70");
  const scale = useSharedValue(1);

  //* got these from google

  const convertToKg = (value: number, fromUnit: WeightUnit): number => {
    switch (fromUnit) {
      case "lbs":
        return value * 0.45359237;
      case "st":
        return value * 6.35029318;
      default:
        return value;
    }
  };

  const convertFromKg = (value: number, toUnit: WeightUnit): number => {
    switch (toUnit) {
      case "lbs":
        return value / 0.45359237;
      case "st":
        return value / 6.35029318;
      default:
        return value;
    }
  };

  const getUnitConstraints = (unit: WeightUnit) => {
    switch (unit) {
      case "lbs":
        return { min: 60, max: 330 };
      case "st":
        return { min: 4, max: 24 };
      default:
        return { min: 30, max: 150 };
    }
  };

  const handleUnitChange = () => {
    const units: WeightUnit[] = ["kg", "lbs", "st"];
    const currentIndex = units.indexOf(weightUnit);
    const nextUnit = units[(currentIndex + 1) % units.length];
    const currentValueInKg = convertToKg(weight, weightUnit);
    const newValue = Math.round(convertFromKg(currentValueInKg, nextUnit));

    setWeightUnit(nextUnit);
    setWeight(newValue);
    setInputValue(newValue.toString());
  };

  const handleInputComplete = () => {
    const newValue = parseInt(inputValue);
    const constraints = getUnitConstraints(weightUnit);
    if (
      !isNaN(newValue) &&
      newValue >= constraints.min &&
      newValue <= constraints.max
    ) {
      setWeight(newValue);
    } else {
      setInputValue(weight.toString());
    }
    setIsEditing(false);
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
    const weightInKg = convertToKg(weight, weightUnit);
    onComplete(weightInKg);
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
      setInputValue(roundedValue.toString());
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const constraints = getUnitConstraints(weightUnit);

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
          <TouchableOpacity
            onPress={() => setIsEditing(true)}
            className="flex-row items-baseline"
          >
            {isEditing ? (
              <TextInput
                className="text-accent-bright font-montserrat-alt-bold text-7xl"
                value={inputValue}
                onChangeText={setInputValue}
                keyboardType="numeric"
                autoFocus
                onBlur={handleInputComplete}
                onSubmitEditing={handleInputComplete}
                maxLength={3}
              />
            ) : (
              <Text className="text-accent-bright font-montserrat-alt-bold text-7xl">
                {weight}
              </Text>
            )}
            <TouchableOpacity onPress={handleUnitChange}>
              <Text className="text-text-muted font-montserrat-light text-2xl ml-4">
                {weightUnit}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>

        <View className="w-full px-4">
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={constraints.min}
            maximumValue={constraints.max}
            step={1}
            value={weight}
            onValueChange={handleSliderChange}
            minimumTrackTintColor="#34CDB3"
            maximumTrackTintColor="#1D7267"
            thumbTintColor="#4FEDE2"
          />

          <View className="flex-row justify-between mt-2">
            <Text className="text-text-dim font-montserrat-light text-sm">
              {constraints.min}
            </Text>
            <Text className="text-text-dim font-montserrat-light text-sm">
              {constraints.max}
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
