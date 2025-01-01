import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import DraggableModal from "../Generic/DraggableModal";
import { useHaptics } from "../Utils/useHaptics";
import TrophyItem from "../Generic/TrophyItem";
import { TROPHY_DATA } from "../Data/trophyData";

interface AllTrophiesModalProps {
  isVisible: boolean;
  onClose: () => void;
  onTrophyPress: (trophyId: string) => void;
  trophyProgress: Record<string, number>;
  zIndex?: number;
}

const AllTrophiesModal: React.FC<AllTrophiesModalProps> = ({
  isVisible,
  onClose,
  onTrophyPress,
  trophyProgress,
  zIndex = 1,
}) => {
  const { triggerHaptic } = useHaptics();

  const handleClose = async () => {
    await triggerHaptic("light");
    onClose();
  };

  const sortedTrophies = React.useMemo(
    () =>
      TROPHY_DATA.map((trophy) => ({
        trophy,
        progress: trophyProgress[trophy.id] || 0,
      })).sort((a, b) => b.progress - a.progress),
    [trophyProgress]
  );

  return (
    <DraggableModal
      isVisible={isVisible}
      onClose={handleClose}
      zIndex={zIndex}
      dragFromHandle
    >
      <View className="px-6 flex-1">
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
            All Trophies
          </Text>
        </View>

        <View className="flex-1">
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View className="space-y-4 mb-12">
              {sortedTrophies.map(({ trophy, progress }) => (
                <TrophyItem
                  key={trophy.id}
                  title={trophy.title}
                  description={trophy.description}
                  progress={progress}
                  onPress={() => onTrophyPress(trophy.id)}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </DraggableModal>
  );
};

export default AllTrophiesModal;
