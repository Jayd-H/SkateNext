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
  const info = INFO_DATA.find((i) => i.id === infoId);

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

  if (!isVisible || !info) return null;

  const iconSize: number = 18;

  return (
    <View className="flex-1 h-full w-full absolute top-0 left-0 right-0 bottom-0">
      <TouchableOpacity className="flex-1 " activeOpacity={1} onPress={onClose}>
        <View className="flex-1 flex justify-center items-center">
          <Animated.View
            style={[animatedStyle]}
            className="w-5/6 bg-buttonbg border border-accent-2 rounded-2xl p-4 shadow-lg"
          >
            <TouchableOpacity
              className="absolute right-2 top-2 w-6 h-6 items-center justify-center"
              onPress={onClose}
            >
              <Text className="text-text text-lg">×</Text>
            </TouchableOpacity>
            <View className="flex-row">
              <Text className="text-lg text-text font-montserrat-alt-semibold mb-2 mr-2 -mt-2">
                {info.name}
              </Text>
              <InfoIcon width={iconSize} height={iconSize} />
            </View>
            <Text className="text-sm text-grey font-montserrat">
              {info.description}
            </Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InfoModal;
