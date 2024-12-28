import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import { TRICK_DATA } from "../Data/trickData";
import ModalTrickButton from "../Generic/ModalTrickButton";
import { FOLDER_DATA } from "../Data/folderData";
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
  //! this is a bit of a mess and a temp solution
  //! ideally, this modal should be populated dynamically by passing trick ids and folder ids into it from the act components
  //! this would be faster and more maintainable
  //! currently its just cycling through folder data looking for an id, if not, it cycles through trick data
  //! i will return to this when i can be bothered

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
    </DraggableModal>
  );
};

export default ActListModal;
