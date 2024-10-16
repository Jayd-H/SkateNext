import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "../components/Modal";

export default function Settings() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });

  const openModal = (title: string, content: string) => {
    setModalContent({ title, content });
    setModalVisible(true);
  };

  const handleTOSButtonPress = () => {
    openModal(
      "Terms of Service",
      "By using SkateNext, you agree to use the app responsibly and at your own risk. The app is designed to assist in tracking skateboarding progress and providing recommendations, but it is not a substitute for proper training, equipment, or safety precautions. \n\nYou acknowledge that skateboarding is an inherently risky activity, and you are solely responsible for your actions and safety while skateboarding.\n\nSkateNext reserves the right to modify, suspend, or terminate the app or your access to it at any time without notice. You agree not to misuse the app, attempt to access it through unauthorized means, or use it for any illegal or prohibited purpose."
    );
  };

  const handleLiabilityButtonPress = () => {
    openModal(
      "Liability Disclaimer",
      "SkateNext and its creators are not liable for any injuries, accidents, or damages that may occur while using the app or engaging in skateboarding activities. The calorie estimation feature is for informational purposes only and should not be considered medical advice.\n\nThe trick recommendations and progression paths provided by the app are based on general guidelines and may not be suitable for all skill levels or physical conditions. Users should always exercise caution, use proper safety equipment, and consult with a qualified instructor or medical professional when necessary.\n\nBy using SkateNext, you agree to release the app and its creators from any and all liability related to your use of the app or participation in skateboarding activities."
    );
  };

  const handleAttributionsButtonPress = () => {
    openModal(
      "Attributions",
      "Created by Jayden Holdsworth (jaydchw).\nIcons from games-icons.net.\nFonts from Google Fonts.\nBuilt with React Native and Expo. \n\nThank you for using SkateNext! 🛹🔥"
    );
  };

  return (
    <View className="flex-1 items-center bg-background">
      <Text className="text-xl text-text font-montserrat-light mt-10">
        S E T T I N G S
      </Text>
      <Text className="text-sm text-grey font-montserrat-light mb-12">
        Made by Jaydchw (Jayden Holdsworth){" "}
      </Text>

      <TouchableOpacity
        className="bg-buttonbg border border-accent-2 w-5/6 p-3 rounded-3xl mb-4 items-center"
        onPress={handleTOSButtonPress}
      >
        <Text className="text-text font-montserrat-alt text-xl">
          Terms of Service
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-buttonbg border border-accent-2 w-5/6 p-3 rounded-3xl mb-4 items-center"
        onPress={handleLiabilityButtonPress}
      >
        <Text className="text-text font-montserrat-alt text-xl">
          Liability Disclaimer
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-buttonbg border border-accent-2 w-5/6 p-3 rounded-3xl mb-4 items-center"
        onPress={handleAttributionsButtonPress}
      >
        <Text className="text-text font-montserrat-alt text-xl">
          Attributions
        </Text>
      </TouchableOpacity>

      <Modal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalContent.title}
        content={modalContent.content}
      />
    </View>
  );
}
