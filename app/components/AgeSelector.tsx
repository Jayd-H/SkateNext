import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { AnimatedFlyIn } from "./AnimatedFlyIn";

interface AgeSelectorProps {
  onComplete: (age: number) => void;
}

const AgeSelector: React.FC<AgeSelectorProps> = ({ onComplete }) => {
  const [age, setAge] = useState<number>(18);

  const handleNext = () => {
    onComplete(age);
  };

  return (
    <View className="flex-1 bg-background px-4 pt-2">
      <AnimatedFlyIn delay={0}>
        <Text className="text-lg text-text font-montserrat-light text-center mt-8 mb-12">
          S K A T E N E X T
        </Text>
      </AnimatedFlyIn>

      <AnimatedFlyIn delay={100}>
        <Text className="text-lg text-grey font-montserrat-alt-italic mt-24 text-center mb-8">
          Select your age:
        </Text>
      </AnimatedFlyIn>

      <AnimatedFlyIn delay={200}>
        <View className="items-center mb-8 mt-20">
          <Text className="text-6xl text-text font-montserrat-alt-bold">
            {age}
          </Text>
        </View>
      </AnimatedFlyIn>

      <AnimatedFlyIn delay={300}>
        <View className="w-full px-4 mt-4">
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={8}
            maximumValue={80}
            step={1}
            value={age}
            onValueChange={(value) => setAge(Math.round(value))}
            minimumTrackTintColor="#34CDB3"
            maximumTrackTintColor="#77B2A8"
            thumbTintColor="#34CDB3"
          />
        </View>
      </AnimatedFlyIn>

      <AnimatedFlyIn delay={400}>
        <View className="items-center mt-20">
          <TouchableOpacity
            className="bg-buttonbg border border-accent-2 w-5/6 p-3 rounded-3xl items-center"
            onPress={handleNext}
          >
            <Text className="text-text font-montserrat-alt text-xl">Next</Text>
          </TouchableOpacity>
        </View>
      </AnimatedFlyIn>
    </View>
  );
};

export default AgeSelector;
