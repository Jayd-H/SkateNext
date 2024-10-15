import React from "react";
import { View, Text } from "react-native";

export default function Fitness() {
  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Text className="text-2xl text-text font-montserrat">Fitness Page</Text>
      <Text className="text-xl text-accent font-montserrat-alt mt-4">
        Using custom styles
      </Text>
    </View>
  );
}
