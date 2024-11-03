import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface DeleteConfirmModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
}) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  React.useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, {
        duration: 150,
        easing: Easing.out(Easing.quad),
      });
      scale.value = withSpring(1, {
        mass: 0.5,
        stiffness: 150,
        damping: 12,
        velocity: 0.5,
        overshootClamping: false,
      });
    } else {
      opacity.value = withTiming(0, {
        duration: 100,
        easing: Easing.in(Easing.quad),
      });
      scale.value = withTiming(0.8, {
        duration: 100,
        easing: Easing.in(Easing.quad),
      });
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  if (!isVisible) return null;

  return (
    <View className="flex-1 h-full w-full absolute top-0 left-0 right-0 bottom-0">
      <TouchableOpacity className="flex-1" activeOpacity={1} onPress={onClose}>
        <View className="flex-1 flex justify-center items-center">
          <Animated.View
            style={[animatedStyle]}
            className="w-5/6 bg-buttonbg border border-red rounded-2xl p-4 shadow-lg"
          >
            <Text className="text-xl text-text font-montserrat-alt-semibold mb-2 text-center">
              DELETE ALL DATA?
            </Text>
            <Text className="text-sm text-grey font-montserrat mb-6 text-center">
              This will reset all your progress and return you to the initial
              setup. This action cannot be undone.
            </Text>
            <View className="flex-row justify-center space-x-4">
              <TouchableOpacity
                className="bg-background border border-accent-2 px-8 py-2 rounded-xl"
                onPress={onClose}
              >
                <Text className="text-text font-montserrat-alt">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-background border border-red px-8 py-2 rounded-xl"
                onPress={onConfirm}
              >
                <Text className="text-text font-montserrat-alt">Delete</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DeleteConfirmModal;
