import React from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useHaptics } from "../Utils/useHaptics";
import BossSkullIcon from "../../../assets/icons/boss-skull.svg";

interface DeleteConfirmModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  zIndex?: number;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  zIndex = 1,
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

  const iconSize = 26;

  return (
    <View
      className="flex-1 h-full w-full absolute top-0 left-0 right-0 bottom-0"
      style={{ zIndex }}
    >
      <TouchableOpacity
        className="flex-1 bg-black/50"
        activeOpacity={1}
        onPress={handleClose}
      >
        <View className="flex-1 flex justify-center items-center">
          <Animated.View style={[animatedStyle]} className="w-5/6">
            <View className="relative">
              {/* Bottom shadow layer similar to InfoModal */}
              <View className="absolute inset-0 translate-y-1 bg-warning-dark rounded-2xl opacity-80" />

              {/* Main content layer */}
              <View className="bg-bg-elevated border-2 border-warning rounded-2xl">
                {/* Centered Icon Container */}
                <View className="absolute -top-5 left-0 w-full flex items-center">
                  <View className="w-10 h-10 rounded-xl bg-bg-elevated border-2 border-warning items-center justify-center">
                    <BossSkullIcon
                      width={iconSize}
                      height={iconSize}
                      fill="#FF3333"
                    />
                  </View>
                </View>

                {/* Content Container */}
                <View className="pt-8 pb-5 px-5">
                  {/* Title */}
                  <Text className="text-center text-warning font-montserrat-alt-bold text-lg uppercase tracking-[6px] mb-1">
                    Warning
                  </Text>

                  {/* Subtle Separator */}
                  <View className="w-1/4 h-0.5 rounded-lg bg-warning-dark mx-auto mb-4 opacity-80" />

                  {/* Description Container */}
                  <View className="bg-bg-surface border-t border-b border-warning-dark -mx-5 px-5 py-3 mb-4">
                    <Text className="text-text-muted font-montserrat text-sm leading-5 text-center mb-1">
                      Are you sure you want to delete all data?
                    </Text>
                    <Text className="text-text-dim font-montserrat text-xs leading-4 text-center">
                      This will reset all your progress and return you to the
                      initial setup. This action cannot be undone.
                    </Text>
                  </View>

                  {/* Action Buttons - Stacked */}
                  <View className="space-y-3 mb-2">
                    {/* Delete Button - Primary Warning */}
                    <TouchableOpacity
                      onPress={handleConfirm}
                      activeOpacity={0.8}
                      className="bg-bg-surface border border-warning rounded-xl py-3 px-4"
                    >
                      <Text className="text-warning font-montserrat-alt-semibold text-center text-sm">
                        DELETE ALL DATA
                      </Text>
                    </TouchableOpacity>

                    {/* Cancel Button - Secondary */}
                    <TouchableOpacity
                      onPress={handleClose}
                      activeOpacity={0.8}
                      className="bg-accent-surface border border-accent-muted rounded-xl py-3 px-4"
                    >
                      <Text className="text-text font-montserrat-alt-semibold text-center text-sm">
                        CANCEL
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(DeleteConfirmModal);
