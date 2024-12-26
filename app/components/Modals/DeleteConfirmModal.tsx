import React from "react";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useHaptics } from "../Utils/useHaptics";

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

  const { triggerHaptic } = useHaptics();

  const handleConfirm = async () => {
    await triggerHaptic("medium");
    onConfirm();
  };

  const handleClose = async () => {
    await triggerHaptic("light");
    onClose();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  if (!isVisible) return null;

  return (
    <View className="flex-1 h-full w-full absolute top-0 left-0 right-0 bottom-0">
      <Pressable className="flex-1" onPress={handleClose}>
        <View className="flex-1 flex justify-center items-center">
          <Animated.View
            style={[animatedStyle]}
            className="w-5/6 bg-bg-elevated border-2 border-warning rounded-3xl p-6 shadow-lg"
          >
            <Text className="text-xl text-text font-montserrat-alt-semibold mb-2 text-center">
              DELETE ALL DATA?
            </Text>
            <Text className="text-sm text-text-muted font-montserrat mb-6 text-center">
              This will reset all your progress and return you to the initial
              setup. This action cannot be undone.
            </Text>
            <View className="flex-row justify-center space-x-4">
              {/* Cancel Button */}
              <View className="flex-1">
                <View className="relative">
                  <View className="absolute top-1 left-0 right-0 h-full rounded-3xl bg-accent-dark" />
                  <Pressable
                    onPress={handleClose}
                    className="relative rounded-3xl w-full border-2 border-accent-muted bg-accent-surface active:translate-y-1 px-6 py-3"
                  >
                    <Text className="text-text font-montserrat-alt-semibold text-center text-base">
                      Cancel
                    </Text>
                  </Pressable>
                </View>
              </View>
              {/* Delete Button */}
              <View className="flex-1">
                <View className="relative">
                  <View className="absolute top-1 left-0 right-0 h-full rounded-3xl bg-warning-dark" />
                  <Pressable
                    onPress={handleConfirm}
                    className="relative rounded-3xl w-full border-2 border-warning bg-bg-elevated active:translate-y-1 px-6 py-3"
                  >
                    <Text className="text-text font-montserrat-alt-semibold text-center text-base">
                      Delete
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
      </Pressable>
    </View>
  );
};

export default DeleteConfirmModal;
