import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  ScrollView,
} from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  title,
  content,
}) => {
  const translateY = useSharedValue(1000);

  React.useEffect(() => {
    if (isVisible) {
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.exp),
      });
    } else {
      translateY.value = withTiming(1000, {
        duration: 300,
        easing: Easing.in(Easing.exp),
      });
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  if (!isVisible) return null;

  const blurViewStyle: ViewStyle = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "flex-end",
  };

  return (
    <BlurView intensity={10} tint="dark" style={blurViewStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1"
      />
      <Animated.View
        style={[animatedStyle]}
        className="bg-background h-full rounded-t-3xl p-6 items-center"
      >
        <View className="w-12 h-1 mt-8 bg-accent-2 rounded-full mb-4" />
        <Text className="text-xl text-text font-montserrat-light mb-4">
          {title}
        </Text>
        <ScrollView className=" w-full mb-6">
          <Text className="text-sm text-grey font-montserrat-light">
            {content.split("\n").map((text, index) => (
              <React.Fragment key={index}>
                {text}
                {index !== content.split("\n").length - 1 && "\n"}
              </React.Fragment>
            ))}
          </Text>
        </ScrollView>
        <TouchableOpacity
          onPress={onClose}
          className="bg-buttonbg border border-accent-2 w-full p-3 rounded-3xl items-center"
        >
          <Text className="text-text font-montserrat-alt text-xl">Close</Text>
        </TouchableOpacity>
      </Animated.View>
    </BlurView>
  );
};

export default Modal;
