import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import BurningSkull from "../assets/icons/burning-skull.svg";
import SkateboardText from "../assets/icons/skateboard-grey.svg";
import { AnimatedFlyIn } from "./components/AnimatedFlyIn";

export default function Home() {
  const router = useRouter();

  const handleButtonPress = () => {
    router.replace("/tabs/map");
  };

  const getSkullCount = (level: string) => {
    switch (level) {
      case "Beginner":
        return 1;
      case "Intermediate":
        return 2;
      case "Advanced":
        return 3;
      case "Master":
        return 5;
      default:
        return 1;
    }
  };

  return (
    <View className="flex-1 bg-background p-4">
      <AnimatedFlyIn delay={0}>
        <Text className="text-lg text-text font-montserrat-light text-center mt-8 mb-12">
          S K A T E N E X T
        </Text>
      </AnimatedFlyIn>
      <AnimatedFlyIn delay={100}>
        <View className="items-center">
          <SkateboardText width={28} height={28} />
        </View>
      </AnimatedFlyIn>
      <AnimatedFlyIn delay={200}>
        <Text className="text-lg text-grey font-montserrat-alt-light-italic text-center mb-2">
          Please select one
        </Text>
      </AnimatedFlyIn>
      <View className="flex-1 justify-center items-center -mt-16 px-8">
        {/* using px-8 here is not a good solution and will definitely bite me in the ass */}
        {["Beginner", "Intermediate", "Advanced", "Master"].map(
          (level, index) => (
            <AnimatedFlyIn
              key={level}
              delay={300 + index * 100}
              style={{ width: "100%" }}
            >
              <TouchableOpacity
                className="bg-buttonbg border border-accent-2 w-full p-3 rounded-3xl mb-4 items-center"
                onPress={handleButtonPress}
              >
                {/* silly guy with w-full instead of w-5/6*/}
                <View className="flex-row mb-1">
                  {[...Array(getSkullCount(level))].map((_, index) => (
                    <BurningSkull
                      key={index}
                      width={24}
                      height={24}
                      style={{
                        marginRight: index < getSkullCount(level) - 1 ? 4 : 0,
                      }}
                    />
                  ))}
                </View>
                <Text className="text-text font-montserrat-alt text-xl">
                  {level}
                </Text>
                <Text className="text-grey font-montserrat-alt text-center">
                  {level === "Beginner"
                    ? "I'm completely new"
                    : level === "Intermediate"
                    ? "I can ollie consistently"
                    : level === "Advanced"
                    ? "I can kickflip consistently"
                    : "I can treflip consistently"}
                </Text>
              </TouchableOpacity>
            </AnimatedFlyIn>
          )
        )}
      </View>
    </View>
  );
}
