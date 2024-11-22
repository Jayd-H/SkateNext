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
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import Button from "../Generic/Button";

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
  };

  return (
    <BlurView intensity={30} tint="dark" style={blurViewStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1"
      />
      <Animated.View
        style={[animatedStyle]}
        className="bg-bg-card h-full rounded-t-3xl pt-8"
      >
        <View className="p-6 flex-1">
          <View className="w-12 h-1 bg-accent-bright rounded-full mb-2 self-center opacity-50" />
          <View className="flex-row justify-between items-center mb-6">
            <TouchableOpacity
              onPress={onClose}
              className="bg-bg-elevated p-3 rounded-2xl"
            >
              <ChevronRight
                width={24}
                height={24}
                style={{ transform: [{ rotate: "180deg" }] }}
                fill="#4FEDE2"
              />
            </TouchableOpacity>
            <Text className="text-xl text-text font-montserrat-alt-medium flex-1 ml-4">
              {title}
            </Text>
          </View>

          <ScrollView
            className="flex-1 px-2 mb-6"
            showsVerticalScrollIndicator={false}
          >
            <View
              className="absolute inset-0 rounded-3xl opacity-10"
              style={{
                backgroundColor: "#183C36",
                shadowColor: "#34CDB3",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
              }}
            />
            <Text className="text-text-dim font-montserrat leading-6">
              {content.split("\n").map((text, index) => (
                <React.Fragment key={index}>
                  {text}
                  {index !== content.split("\n").length - 1 && "\n"}
                </React.Fragment>
              ))}
            </Text>
          </ScrollView>

          <Button topText="C L O S E" onPress={onClose} />
        </View>
      </Animated.View>
    </BlurView>
  );
};

export default Modal;
