import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/tabs/map");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Text className="text-2xl text-text font-montserrat-bold">
        Welcome to SkateNext
      </Text>
    </View>
  );
}
