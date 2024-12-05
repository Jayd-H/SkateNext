import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  ScrollView,
} from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import { TRICK_DATA } from "../Data/trickData";
import ModalTrickButton from "../Generic/ModalTrickButton";
import { FOLDER_DATA } from "../Data/folderData";

interface ActListModalProps {
  isVisible: boolean;
  onClose: () => void;
  onTrickSelect: (trickId: string) => void;
  trickIds: string[];
  trickCompletionStates: Record<string, number>;
  actTitle: string;
}

const ActListModal: React.FC<ActListModalProps> = ({
  isVisible,
  onClose,
  onTrickSelect,
  trickIds,
  trickCompletionStates,
  actTitle,
}) => {
  const translateY = useSharedValue(1000);

  //! this is a bit of a mess and a temp solution
  //! ideally, this modal should be populated dynamically by passing trick ids and folder ids into it from the act components
  //! this would be faster and more maintainable
  //! currently its just cycling through folder data looking for an id, if not, it cycles through trick data
  //! i will return to this when i can be bothered

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
        className="bg-bg-card rounded-t-3xl h-full pt-12"
      >
        <View className="px-6 pb-0">
          <View className="w-12 h-1 bg-accent-bright rounded-full mb-2 self-center opacity-50" />
          <View className="flex-row justify-between items-center mb-2">
            <TouchableOpacity
              onPress={onClose}
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
              {actTitle} Tricks
            </Text>
          </View>
          <Text className="text-text-dim font-montserrat text-center mb-6">
            All tricks available in this act
          </Text>
        </View>

        <ScrollView
          className="px-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 24,
            gap: 16,
          }}
        >
          <View className="relative">
            <View className="absolute inset-0 rounded-3xl" />
            {trickIds
              .flatMap((id) => {
                const folder = FOLDER_DATA.find((f) => f.id === id);
                if (folder) {
                  return folder.containedTricks;
                }
                return [id];
              })
              .map((trickId) => {
                const trick = TRICK_DATA.find((t) => t.id === trickId);
                if (!trick) return null;
                return (
                  <ModalTrickButton
                    key={trickId}
                    name={trick.name}
                    altNames={trick.alt_names}
                    difficulty={trick.difficulty}
                    completionState={trickCompletionStates[trickId] || 0}
                    onPress={() => onTrickSelect(trickId)}
                  />
                );
              })}
          </View>
        </ScrollView>
      </Animated.View>
    </BlurView>
  );
};

export default ActListModal;
