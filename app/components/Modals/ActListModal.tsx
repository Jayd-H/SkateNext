import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import { TRICK_DATA } from "../Data/trickData";
import ModalTrickButton from "../Generic/ModalTrickButton";
import DraggableModal from "../Generic/DraggableModal";

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
  const tricksList = useMemo(() => {
    return trickIds
      .map((trickId) => {
        const trick = TRICK_DATA.find((t) => t.id === trickId);
        if (!trick) return null;

        return {
          id: trick.id,
          name: trick.name,
          altNames: trick.alt_names,
          difficulty: trick.difficulty,
          completionState: trickCompletionStates[trickId] || 0,
        };
      })
      .filter((trick) => trick !== null);
  }, [trickIds, trickCompletionStates]);

  if (!isVisible) return null;

  return (
    <DraggableModal
      isVisible={isVisible}
      onClose={onClose}
      dragFromHandle={true}
    >
      <View className="px-6 pt-4">
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
          {tricksList.map(
            (trick) =>
              trick && (
                <ModalTrickButton
                  key={trick.id}
                  name={trick.name}
                  altNames={trick.altNames}
                  difficulty={trick.difficulty}
                  completionState={trick.completionState}
                  onPress={() => onTrickSelect(trick.id)}
                />
              )
          )}
        </View>
      </ScrollView>
    </DraggableModal>
  );
};

export default ActListModal;
