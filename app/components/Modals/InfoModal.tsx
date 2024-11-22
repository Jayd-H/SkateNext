import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { INFO_DATA } from "../Data/infoData";
import InfoIcon from "../../../assets/icons/info.svg";
import { useInfoStates } from "../Utils/StorageService";

interface InfoModalProps {
  isVisible: boolean;
  onClose: () => void;
  infoId: string;
}

const InfoModal: React.FC<InfoModalProps> = ({
  isVisible,
  onClose,
  infoId,
}) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const { updateInfoState } = useInfoStates();
  const info = INFO_DATA.find((i) => i.id === infoId);

  React.useEffect(() => {
    if (isVisible && info) {
      updateInfoState(info.id, true);

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
  }, [isVisible, info]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  if (!isVisible || !info) return null;

  return (
    <TouchableOpacity
      className="flex-1 h-full w-full absolute top-0 left-0 right-0 bottom-0 bg-black/50 items-center justify-center px-6"
      activeOpacity={1}
      onPress={onClose}
    >
      <Animated.View
        style={[animatedStyle]}
        className="w-full bg-bg-card rounded-3xl overflow-hidden"
      >
        {/* Glow effect */}
        <View
          className="absolute inset-0 opacity-10"
          style={{
            backgroundColor: "#183C36",
            shadowColor: "#34CDB3",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
          }}
        />

        <View className="p-4 pt-3">
          <TouchableOpacity
            className="absolute right-3 top-2 h-8 w-8 items-center justify-center rounded-full"
            onPress={onClose}
          >
            <Text className="text-accent-bright text-xl font-montserrat-medium">
              ×
            </Text>
          </TouchableOpacity>

          <View className="flex-row items-center space-x-2 mb-3">
            <InfoIcon width={20} height={20} fill="#4FEDE2" />
            <Text className="text-accent-bright font-montserrat-alt-medium text-lg tracking-wide">
              {info.name}
            </Text>
          </View>

          <Text className="text-text-dim font-montserrat leading-6">
            {info.description}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default InfoModal;
