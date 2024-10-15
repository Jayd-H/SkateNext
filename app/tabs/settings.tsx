import { useRouter } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Settings() {
  const router = useRouter();

  const handleTOSButtonPress = () => {
    // open tos modal
  };

  const handleLiabilityButtonPress = () => {
    // open liability modal
  };

  const handleAttributionsButtonPress = () => {
    // open attribution modal
  };


  return (
    <View className="flex-1 items-center bg-background">
      <Text className="text-xl text-text font-montserrat-light mt-10">S E T T I N G S</Text>
      <Text className="text-sm text-grey font-montserrat-light mb-12">Made by Jaydchw (Jayden Holdsworth) </Text>

      <TouchableOpacity className="bg-buttonbg border border-accent-2 w-5/6 p-3 rounded-3xl mb-4 items-center"
      onPress={handleTOSButtonPress}>
      <Text className="text-text font-montserrat-alt text-xl">Terms of Service</Text>
      </TouchableOpacity>
      
      <TouchableOpacity className="bg-buttonbg border border-accent-2 w-5/6 p-3 rounded-3xl mb-4 items-center"
      onPress={handleLiabilityButtonPress}>
      <Text className="text-text font-montserrat-alt text-xl">Liability Disclaimer</Text>
      </TouchableOpacity>
      
      <TouchableOpacity className="bg-buttonbg border border-accent-2 w-5/6 p-3 rounded-3xl mb-4 items-center"
      onPress={handleAttributionsButtonPress}>
      <Text className="text-text font-montserrat-alt text-xl">Attributions</Text>
      </TouchableOpacity>
      
    </View>
  );
}
