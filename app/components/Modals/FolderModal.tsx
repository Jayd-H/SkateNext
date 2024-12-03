import React from "react";
import { View, Text, TouchableOpacity, Modal, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import { TRICK_DATA, Trick } from "../Data/trickData";
import { FOLDER_DATA } from "../Data/folderData";
import ModalTrickButton from "../Generic/ModalTrickButton";

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

  const handleClose = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
  };

  const handleTrickSelect = async (trickId: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onTrickSelect(trickId);
  };

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
  };

  const getModalHeight = () => {
    const baseHeight = 55;
    const additionalHeight = Math.max(0, tricks.length - 2) * 13;
    return Math.min(90, baseHeight + additionalHeight);
  };

  return (
    <BlurView intensity={30} tint="dark" style={blurViewStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleClose}
        className="flex-1"
      />
      <Animated.View
        style={[
          animatedStyle,
          {
            minHeight: `${getModalHeight()}%`,
            maxHeight: "90%",
          },
        ]}
        className="bg-bg-card rounded-t-3xl"
      >
        <View className="p-6 flex-1">
          <View className="w-12 h-1 bg-accent-bright rounded-full mb-2 self-center opacity-50" />
          <View className="flex-row justify-between items-center mb-2">
            <TouchableOpacity
              onPress={handleClose}
              className="bg-bg-elevated p-3 rounded-2xl"
            >
              <ChevronRight
                width={24}
                height={24}
                style={{ transform: [{ rotate: "180deg" }] }}
                fill="#4FEDE2"
              />
            </TouchableOpacity>
            <Text className="text-xl text-text font-montserrat-alt-medium flex-1 ml-4">
              {folder.title}
            </Text>
          </View>
          {folder.description && (
            <Text className="text-text-dim font-montserrat text-sm mb-6">
              {folder.description}
            </Text>
          )}
          <View className="flex-1">
            <View className="space-y-4">
              {tricks.map((trick) => (
                <ModalTrickButton
                  key={trick.id}
                  name={trick.name}
                  altNames={trick.alt_names}
                  difficulty={trick.difficulty}
                  completionState={trickCompletionStates[trick.id]}
                  onPress={() => handleTrickSelect(trick.id)}
                />
              ))}
            </View>
          </View>
        </View>
      </Animated.View>
    </BlurView>
  );
};

export default FolderModal;
