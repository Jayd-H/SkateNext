import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useHaptics } from "../Utils/useHaptics";
import FireGem from "../../../assets/icons/fire-gem.svg";

interface FeedbackPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onDontShowAgain: () => void;
}

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({
  isVisible,
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
      triggerHaptic("light");
    } else {
      translateY.value = withTiming(100, {
        duration: 250,
        easing: Easing.in(Easing.ease),
      });
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handleClosePress = async () => {
    await triggerHaptic("light");
    onClose();
  };

  const handleDontShowAgainPress = async () => {
    await triggerHaptic("light");
    onDontShowAgain();
  };

  const handleOpenFeedback = async () => {
    await triggerHaptic("medium");
    Linking.openURL("https://forms.gle/yuZeZXVonV1fhckq5");
    onClose();
  };

  const iconSize = 36;

  return (
    <Animated.View
      className="absolute bottom-8 left-5 right-5 z-50"
      style={animatedStyle}
    >
      <View className="relative">
        {/* Shadow/accent border effect */}
        <View className="absolute top-[3px] left-[3px] right-[3px] bottom-0 bg-accent-dark opacity-70 rounded-3xl" />

        {/* Main popup container */}
        <View className="bg-bg-elevated px-4 py-4 rounded-3xl border border-accent overflow-hidden">
          {/* Decorative accent bubbles */}
          <View className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-accent opacity-10" />
          <View className="absolute -bottom-14 -left-14 w-24 h-24 rounded-full bg-accent-bright opacity-5" />

          {/* Header with icon */}
          <View className="flex-row items-center mb-3.5">
            <View className="mr-3 relative">
              <View className="absolute -inset-1 bg-accent opacity-20 rounded-full" />
              <View className="bg-accent-surface p-2 rounded-full">
                <FireGem width={iconSize} height={iconSize} fill="#4FEDE2" />
              </View>
            </View>

            <View className="flex-1">
              <Text className="text-accent-bright font-montserrat-alt-semibold text-base tracking-wide">
                Enjoying SkateNext?
              </Text>
              <Text className="text-text-muted font-montserrat text-xs mt-1 leading-4">
                Your feedback helps make the app even better!
              </Text>
            </View>
          </View>

          {/* Vertical button stack */}
          <View className="space-y-2.5">
            {/* Primary action button */}
            <TouchableOpacity
              onPress={handleOpenFeedback}
              className="bg-accent w-full py-3.5 px-4 rounded-2xl relative overflow-hidden"
              activeOpacity={0.8}
            >
              {/* Inner accent glow */}
              <View className="absolute top-0 left-0 right-0 h-1/2 bg-accent-bright opacity-20 rounded-t-xl" />
              <Text className="text-background font-montserrat-alt-semibold text-base text-center">
                Give Feedback
              </Text>
            </TouchableOpacity>

            {/* Secondary action button */}
            <TouchableOpacity
              onPress={handleClosePress}
              className="bg-bg-surface w-full py-3.5 px-4 rounded-2xl border border-accent-dark"
              activeOpacity={0.8}
            >
              <Text className="text-text font-montserrat-alt-medium text-base text-center">
                Maybe Later
              </Text>
            </TouchableOpacity>

            {/* Tertiary text-only button */}
            <TouchableOpacity
              onPress={handleDontShowAgainPress}
              className="py-2 px-2"
              activeOpacity={0.7}
            >
              <Text className="text-text-dim font-montserrat-alt text-xs text-center">
                Don't show this again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default FeedbackPopup;
