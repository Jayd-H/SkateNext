import React from "react";
import { View, Text, TouchableOpacity, Modal, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import { TRICK_DATA, Trick } from "../Data/trickData";
import { FOLDER_DATA } from "../Data/folderData";

interface FolderModalProps {
  isVisible: boolean;
  onClose: () => void;
  folderId: string;
  trickCompletionStates: Record<string, number>;
  onTrickSelect: (trickId: string) => void;
}

const FolderModal: React.FC<FolderModalProps> = ({
  isVisible,
  onClose,
  folderId,
  trickCompletionStates,
  onTrickSelect,
}) => {
  const translateY = useSharedValue(1000);
  const folder = FOLDER_DATA.find((f) => f.id === folderId);

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

  if (!isVisible || !folder) return null;

  const tricks = folder.containedTricks
    .map((id) => TRICK_DATA.find((t) => t.id === id))
    .filter((t): t is Trick => t !== undefined);

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
        className="bg-background min-h-[55%] -mb-6 rounded-t-3xl"
      >
        <View className="p-6 flex-1">
          <View className="w-12 h-1 bg-accent-2 rounded-full mb-2 self-center" />
          <View className="flex-row justify-between items-center mb-2">
            <TouchableOpacity onPress={onClose} className="p-2">
              <ChevronRight
                width={24}
                height={24}
                style={{ transform: [{ rotate: "180deg" }] }}
                fill="#EBEFEF"
              />
            </TouchableOpacity>
            <Text className="text-2xl text-text font-montserrat-alt flex-1 ml-4">
              {folder.title}
            </Text>
          </View>
          {folder.description && (
            <Text className="text-xs text-grey font-montserrat mb-6 px-2">
              {folder.description}
            </Text>
          )}

          <View className="flex-1">
            {tricks.map((trick) => (
              <TouchableOpacity
                key={trick.id}
                onPress={() => {
                  onTrickSelect(trick.id);
                }}
                className={`bg-buttonbg border ${
                  trickCompletionStates[trick.id] === 2
                    ? "border-green shadow-green"
                    : trickCompletionStates[trick.id] === 1
                    ? "border-yellow shadow-yellow"
                    : "border-red shadow-red"
                } rounded-xl p-4 mb-3`}
              >
                <Text className="text-lg text-text font-montserrat-alt">
                  {trick.name}
                </Text>
                {trick.alt_names && (
                  <Text className="text-sm text-grey font-montserrat mt-1">
                    {trick.alt_names}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.View>
    </BlurView>
  );
};

export default FolderModal;
