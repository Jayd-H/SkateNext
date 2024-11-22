import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { AnimatedFlyIn } from "./Generic/AnimatedFlyIn";
import ChevronRight from "../../assets/icons/chevron-right.svg";

interface WeightSelectorProps {
  onComplete: (weight: number | null) => void;
}

const WeightSelector: React.FC<WeightSelectorProps> = ({ onComplete }) => {
  const [weight, setWeight] = useState<number>(70);

  const handleNext = () => {
    onComplete(weight);
  };

  const handleSkip = () => {
    onComplete(null);
  };

  return (
    <View className="flex-1 bg-background px-4 pt-2">
      <AnimatedFlyIn delay={0}>
        <Text className="text-lg text-text font-montserrat-light text-center mt-8 mb-12">
          S K A T E N E X T
        </Text>
      </AnimatedFlyIn>

      <AnimatedFlyIn delay={100}>
        <Text className="text-lg text-text-muted font-montserrat-alt-italic mt-24 text-center mb-8">
          Select your weight (kg):
        </Text>
      </AnimatedFlyIn>

      <AnimatedFlyIn delay={200}>
        <View className="items-center mb-8 mt-20">
          <Text className="text-6xl text-text font-montserrat-alt-bold">
            {weight}
          </Text>
        </View>
      </AnimatedFlyIn>

      <AnimatedFlyIn delay={300}>
        <View className="px-8 mt-8">
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={30}
            maximumValue={150}
            step={1}
            value={weight}
            onValueChange={(value) => setWeight(Math.round(value))}
            minimumTrackTintColor="#34CDB3"
            maximumTrackTintColor="#77B2A8"
            thumbTintColor="#34CDB3"
          />
        </View>
      </AnimatedFlyIn>

      <AnimatedFlyIn delay={400}>
        <View className="flex-row justify-between items-center absolute top-0 mt-32 w-full px-6">
          <TouchableOpacity className="items-center" onPress={handleSkip}>
            <Text className="text-text-dim font-montserrat-alt text-sm mb-2">
              Skip
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center" onPress={handleNext}>
            <Text className="text-text font-montserrat-alt text-sm mb-2">
              Next
            </Text>
            <ChevronRight width={24} height={24} fill="#EBEFEF" />
          </TouchableOpacity>
        </View>
      </AnimatedFlyIn>
    </View>
  );
};

export default WeightSelector;
