import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { TRICK_DATA } from "../Data/trickData";
import { useHaptics } from "../Utils/useHaptics";
import BossSkullIcon from "../../../assets/icons/boss-skull.svg";

interface SafetyPopupProps {
  isVisible: boolean;
  trickId: string;
  reason: string;
  onClose: () => void;
  onDontShowAgain: () => void;
}

const SafetyPopup: React.FC<SafetyPopupProps> = ({
  isVisible,
  trickId,
  reason,
  onClose,
  onDontShowAgain,
}) => {
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);
  const { triggerHaptic } = useHaptics();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    if (isVisible) {
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
      opacity.value = withTiming(1, { duration: 250 });
      triggerHaptic("medium");
    } else {
      translateY.value = withTiming(100, {
        duration: 250,
        easing: Easing.in(Easing.ease),
      });
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const trick = TRICK_DATA.find((t) => t.id === trickId);
  if (!trick) return null;

  // Message varies based on the reason for the warning
  const getMessage = () => {
    switch (reason) {
      case "difficulty":
        return `This trick (${trick.name}) is more difficult than tricks you've mastered. Consider wearing full protective gear including a helmet.`;
      case "impact":
        return `This trick has a higher impact level than you're used to. Consider wearing knee pads and a helmet to prevent injuries.`;
      case "beginner":
        return `For beginners, it's recommended to wear protective gear when attempting ${trick.name}.`;
      default:
        return `For your safety, consider wearing protective gear when attempting ${trick.name}.`;
    }
  };

  const handleClosePress = async () => {
    await triggerHaptic("light");
    onClose();
  };

  const handleDontShowAgainPress = async () => {
    await triggerHaptic("light");
    onDontShowAgain();
  };

  const iconSize = 36;

  return (
    <Animated.View
      className="absolute bottom-10 left-5 right-5 z-50"
      style={animatedStyle}
    >
      <View className="relative">
        {/* Shadow/accent border effect */}
        <View className="absolute top-[3px] left-[3px] right-[3px] bottom-0 bg-warning-dark opacity-70 rounded-3xl" />

        {/* Main popup container */}
        <View className="bg-bg-elevated px-4 py-4 rounded-3xl border border-warning overflow-hidden">
          {/* Decorative accent bubbles */}
          <View className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-warning opacity-10" />
          <View className="absolute -bottom-14 -left-14 w-24 h-24 rounded-full bg-warning opacity-5" />

          {/* Header with icon */}
          <View className="flex-row items-center mb-3.5">
            <View className="mr-3 relative">
              <View className="absolute -inset-1 bg-warning opacity-20 rounded-full" />
              <View className="bg-bg-elevated p-2 rounded-full border border-warning-dark">
                <BossSkullIcon
                  width={iconSize}
                  height={iconSize}
                  fill="#FF3333"
                />
              </View>
            </View>

            <View className="flex-1">
              <Text className="text-warning font-montserrat-alt-semibold text-base tracking-wide">
                Safety Reminder
              </Text>
              <Text className="text-text-muted font-montserrat text-xs mt-1 leading-4">
                Taking precautions helps prevent injuries
              </Text>
            </View>
          </View>

          {/* Message text */}
          <View className="bg-bg-surface px-3.5 py-3 mb-3.5 rounded-xl border border-warning-dark opacity-90">
            <Text className="text-text-muted font-montserrat text-sm leading-5">
              {getMessage()}
            </Text>
          </View>

          {/* Vertical button stack */}
          <View className="space-y-2.5">
            {/* Primary action button */}
            <TouchableOpacity
              onPress={handleClosePress}
              className="bg-warning w-full py-3.5 px-4 rounded-2xl relative overflow-hidden"
              activeOpacity={0.8}
            >
              {/* Inner accent glow */}
              <View className="absolute top-0 left-0 right-0 h-1/2 bg-warning opacity-20 rounded-t-xl" />
              <Text className="text-background font-montserrat-alt-bold text-base text-center">
                Got It
              </Text>
            </TouchableOpacity>

            {/* Tertiary text-only button */}
            <TouchableOpacity
              onPress={handleDontShowAgainPress}
              className="py-2 px-2"
              activeOpacity={0.7}
            >
              <Text className="text-text-dim font-montserrat-alt text-xs text-center">
                Don't show safety reminders again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default SafetyPopup;
