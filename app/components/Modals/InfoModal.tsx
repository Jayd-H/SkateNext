import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
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
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);

  const { updateInfoState } = useInfoStates();
  const info = INFO_DATA.find((i) => i.id === infoId);

  React.useEffect(() => {
    if (isVisible && info) {
      updateInfoState(info.id, true);
      opacity.value = withTiming(1, {
        duration: 180,
        easing: Easing.out(Easing.quad),
      });
      scale.value = withSpring(1, {
        mass: 0.5,
        damping: 15,
        stiffness: 140,
        velocity: 1,
      });
      translateY.value = withRepeat(
        withSpring(0.2, {
          mass: 1,
          damping: 30,
          stiffness: 15,
        }),
        -1,
        true
      );
    } else {
      opacity.value = withTiming(0, {
        duration: 80,
        easing: Easing.in(Easing.quad),
      });
      scale.value = withTiming(0.95, {
        duration: 80,
      });
      translateY.value = 0;
    }
  }, [isVisible, info]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  //* THERE IS CODE HERE TO ANIMATE A SUBTLE BOB IDLE ANIMATION, FOR NOW I WILL SET IT TO 0
  //* THIS IS BECAUSE I WANT TO IMPLEMENT THESE IDLE ANIMATIONS ALL AT ONCE,
  //* WHEN I HAVE SET IT UP GLOBALLY WITH A TOGGLE IN THE SETTINGS TO TURN IT ON/OFF

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value * -0 }],
    opacity: opacity.value,
  }));

  if (!isVisible || !info) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
      pointerEvents="box-none"
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          overlayStyle,
        ]}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={onClose}
        />
      </Animated.View>

      <Animated.View style={[modalStyle]} className="w-5/6">
        <TouchableOpacity activeOpacity={1} onPress={onClose}>
          {/* Info Card */}
          <View className="relative">
            {/* Bottom shadow layer */}
            <View className="absolute inset-0 translate-y-1 bg-accent-dark rounded-2xl opacity-80" />

            {/* Main content layer */}
            <View className="bg-accent-surface border-2 border-accent-muted rounded-2xl">
              {/* Centered Icon Container */}
              <View className="absolute -top-5 left-0 w-full flex items-center">
                <View className="w-10 h-10 rounded-xl bg-accent-surface border-2 border-accent-muted items-center justify-center">
                  <InfoIcon width={24} height={24} fill="#4FEDE2" />
                </View>
              </View>

              {/* Content Container */}
              <View className="pt-8 pb-5 px-5">
                {/* Title */}
                <Text className="text-center text-accent-bright font-montserrat-alt-bold text-lg uppercase tracking-[6px] mb-1">
                  {info.name}
                </Text>

                {/* Subtle Separator */}
                <View className="w-1/4 h-0.5 rounded-lg bg-accent-dark mx-auto mb-4 opacity-80" />

                {/* Description Container */}
                <View className="bg-bg-surface border-t border-b border-accent-muted -mx-5 px-5 py-3 mb-8">
                  <Text className="text-text-muted font-montserrat text-sm leading-5 text-center">
                    {info.description}
                  </Text>
                </View>

                {/* Footer Text */}
                <View className="relative -mb-8 mx-10">
                  <View className="bg-accent-surface p-1 rounded-lg border border-accent-muted">
                    <Text className="text-center text-text-muted font-montserrat-alt-light text-xs">
                      tap anywhere to close
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default InfoModal;
