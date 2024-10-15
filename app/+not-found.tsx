import React from "react";
import { View, Text } from "react-native";

export default function NotFound() {
  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Text className="text-2xl font-bold text-text font-montserrat">
        Oops! Page not found.
      </Text>
    </View>
  );
}
