import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import { TRICK_DATA } from "../Data/trickData";
import ModalTrickButton from "../Generic/ModalTrickButton";
import DraggableModal from "../Generic/DraggableModal";

interface RecommendationsModalProps {
  isVisible: boolean;
  onClose: () => void;
  onTrickSelect: (trickId: string) => void;
  recommendations: string[];
  trickCompletionStates: Record<string, number>;
}

const RecommendationsModal: React.FC<RecommendationsModalProps> = ({
  isVisible,
  onClose,
  onTrickSelect,
  recommendations,
  trickCompletionStates,
}) => {
  if (!isVisible) return null;

  return (
    <DraggableModal isVisible={isVisible} onClose={onClose}>
      <View className="p-6">
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
            Recommended Tricks
          </Text>
        </View>
        <Text className="text-text-dim font-montserrat text-center mb-6">
          Recommendations get progressively more challenging as you go down
        </Text>
        <View className="relative">
          {/* Background glow effect */}
          <View
            className="absolute inset-0 rounded-3xl opacity-10"
            style={{
              backgroundColor: "#183C36",
              shadowColor: "#34CDB3",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
            }}
          />
          <View className="space-y-4">
            {recommendations.map((trickId) => {
              const trick = TRICK_DATA.find((t) => t.id === trickId);
              if (!trick) return null;
              return (
                <ModalTrickButton
                  key={trickId}
                  name={trick.name}
                  altNames={trick.alt_names}
                  difficulty={trick.difficulty}
                  completionState={trickCompletionStates[trickId]}
                  onPress={() => onTrickSelect(trickId)}
                />
              );
            })}
          </View>
        </View>
      </View>
    </DraggableModal>
  );
};

export default RecommendationsModal;
