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

  const iconSize = 28;

  return (
    <Animated.View
      className="absolute bottom-10 left-4 right-4 z-50"
      style={animatedStyle}
    >
      <View className="bg-bg-elevated px-4 py-4 rounded-xl shadow-lg border border-accent-dark">
        <View className="mb-3 justify-between flex-row">
          <Text className="text-accent-bright font-montserrat-alt-semibold text-base tracking-widest ml-2">
            Safety Reminder
          </Text>
          <BossSkullIcon width={iconSize} height={iconSize} fill="#2A9E8A" />
        </View>

        <Text className="text-text-muted font-montserrat mb-4 leading-5">
          {getMessage()}
        </Text>

        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            onPress={handleDontShowAgainPress}
            className="py-2 px-3"
          >
            <Text className="text-text-dim font-montserrat-alt text-sm">
              Don't show again
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleClosePress}
            className="bg-accent py-2 px-4 rounded-md"
          >
            <Text className="text-background font-montserrat-alt-semibold">
              Got it
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default SafetyPopup;
