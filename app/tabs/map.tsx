import React from "react";
import { View, Text } from "react-native";

export default function Map() {
  return (
    <View className="flex-1 items-center bg-background">
      <Text className="text-xl text-text font-montserrat-light mt-10">M A P</Text>
      <View className="flex-row">

        {/* make these chevron icons */}
      <Text className="text-xl text-text font-montserrat ">
        1
      </Text>
      <Text className="text-xl text-text font-montserrat ">
        1
      </Text>
      <Text className="text-xl text-text font-montserrat ">
        1
      </Text>
      </View>
    </View>
  );
}
