import React from "react";
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import Sparkles from "../../../assets/icons/sparkles.svg";

interface LuckyModalProps {
  isVisible: boolean;
  onClose: () => void;
  onTrickSelect: (trickId: string) => void;
}

const LuckyModal: React.FC<LuckyModalProps> = ({
  isVisible,
  onClose,
  onTrickSelect,
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
    justifyContent: "flex-end",
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
        className="bg-background rounded-t-3xl h-full pt-8"
      >
        <View className="p-6">
          <View className="w-12 h-1 bg-accent-2 rounded-full mb-2 self-center" />
          <View className="flex-row justify-between items-center mb-6">
            <TouchableOpacity onPress={onClose} className="p-2">
              <ChevronRight
                width={24}
                height={24}
                style={{ transform: [{ rotate: "180deg" }] }}
                fill="#EBEFEF"
              />
            </TouchableOpacity>
            <Text className="text-xl text-text font-montserrat-alt flex-1 ml-4">
              Feeling Lucky?
            </Text>
          </View>

          <TouchableOpacity
            className="bg-buttonbg border-2 border-accent rounded-xl p-6 pt-4 mb-8 shadow-lg items-center"
            style={{
              shadowColor: "#34CDB3",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            }}
          >
            <Sparkles width={20} height={20} fill="#34CDB3" className="mb-2" />
            <Text className="text-xl text-accent font-montserrat-alt-light mb-1 tracking-widest">
              What's Next?
            </Text>
            <Text className="text-sm text-accent-2 font-montserrat text-center">
              Let's find something new to learn
            </Text>
          </TouchableOpacity>

          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-[1px] bg-accent-2 opacity-30" />
            <Text className="text-lg text-text font-montserrat-alt-light mx-4">
              Get a trick
            </Text>
            <View className="flex-1 h-[1px] bg-accent-2 opacity-30" />
          </View>

          <TouchableOpacity className="bg-buttonbg border border-accent-2 rounded-xl p-4 mb-3">
            <Text className="text-base text-text font-montserrat-alt text-center">
              All Tricks
            </Text>
            <Text className="text-sm text-grey text-center font-montserrat">
              Get a trick from all available tricks
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-buttonbg border border-accent-2 rounded-xl p-4 mb-3">
            <Text className="text-base text-center text-text font-montserrat-alt">
              Mastered Only
            </Text>
            <Text className="text-sm text-grey text-center font-montserrat">
              Get a trick you've already mastered
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-buttonbg border border-accent-2 rounded-xl p-4 mb-3">
            <Text className="text-base text-center text-text font-montserrat-alt">
              In Progress
            </Text>
            <Text className="text-sm text-grey text-center font-montserrat">
              Get a trick you've landed once or twice
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-buttonbg border border-accent-2 rounded-xl p-4 mb-3">
            <Text className="text-base text-center text-text font-montserrat-alt">
              Not Started
            </Text>
            <Text className="text-sm text-grey text-center font-montserrat">
              Get a trick you've never landed
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  );
};

export default LuckyModal;
