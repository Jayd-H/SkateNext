import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function NotFound() {
  const router = useRouter();

  const handleButtonPress = () => {
    router.replace("/tabs/map");
  };

  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Text className="text-2xl font-bold text-text font-montserrat">
        Oops! Page not found.
      </Text>
      <TouchableOpacity className="bg-buttonbg border border-accent-2 w-5/6 p-3 rounded-3xl mb-4 items-center"
      onPress={handleButtonPress}>
      <Text className="text-text font-montserrat-alt text-xl">Go Back...</Text>
      </TouchableOpacity>
    </View>
  );
}
