import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import { TRICK_DATA, Trick } from "../Data/trickData";
import { FOLDER_DATA } from "../Data/folderData";
import ModalTrickButton from "../Generic/ModalTrickButton";
import { useHaptics } from "../Utils/useHaptics";
import DraggableModal from "../Generic/DraggableModal";

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
  const folder = FOLDER_DATA.find((f) => f.id === folderId);
  const { triggerHaptic } = useHaptics();

  const handleClose = async () => {
    await triggerHaptic("light");
    onClose();
  };

  const handleTrickSelect = async (trickId: string) => {
    await triggerHaptic("light");
    onTrickSelect(trickId);
  };

  if (!isVisible || !folder) return null;

  const tricks = folder.containedTricks
    .map((id) => TRICK_DATA.find((t) => t.id === id))
    .filter((t): t is Trick => t !== undefined);

  return (
    <DraggableModal isVisible={isVisible} onClose={handleClose} height="auto">
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
            {folder.title}
          </Text>
        </View>
        {folder.description && (
          <Text className="text-text-dim font-montserrat text-sm mb-6">
            {folder.description}
          </Text>
        )}
        <View className="flex-1">
          <View className="space-y-4 mb-12">
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
    </DraggableModal>
  );
};

export default FolderModal;
