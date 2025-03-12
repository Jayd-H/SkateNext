import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import { TRICK_DATA } from "../Data/trickData";
import DraggableModal from "../Generic/DraggableModal";
import ModalTrickButton from "../Generic/ModalTrickButton";
import Button from "../Generic/Button";
import { useBlacklistedTricks } from "../Utils/StorageService";

interface BlacklistedTricksModalProps {
  isVisible: boolean;
  onClose: () => void;
  trickCompletionStates: Record<string, number>;
}

const BlacklistedTricksModal: React.FC<BlacklistedTricksModalProps> = ({
  isVisible,
  onClose,
  trickCompletionStates,
}) => {
  const {
    blacklistedTricks,
    isLoading,
    removeTrickFromBlacklist,
    refreshBlacklistedTricks,
  } = useBlacklistedTricks();

  const [localBlacklistedTricks, setLocalBlacklistedTricks] = useState<
    string[]
  >([]);

  useEffect(() => {
    if (isVisible) {
      refreshBlacklistedTricks();
    }
  }, [isVisible]);

  useEffect(() => {
    setLocalBlacklistedTricks(blacklistedTricks);
  }, [blacklistedTricks]);

  const handleRemoveFromBlacklist = async (trickId: string) => {
    await removeTrickFromBlacklist(trickId);
    setLocalBlacklistedTricks((prev) => prev.filter((id) => id !== trickId));
  };

  const handleClearAll = async () => {
    for (const trickId of localBlacklistedTricks) {
      await removeTrickFromBlacklist(trickId);
    }
    setLocalBlacklistedTricks([]);
  };

  if (!isVisible) return null;

  return (
    <DraggableModal
      isVisible={isVisible}
      onClose={onClose}
      dragFromHandle={true}
    >
      <View className="px-6 pt-4 pb-6 flex-1 flex flex-col">
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
            Blacklisted Tricks
          </Text>
        </View>

        <Text className="text-text-dim font-montserrat text-center mb-4">
          These tricks will not appear in your recommendations
        </Text>

        {/* Main content with flex-1 to push footer button to bottom */}
        <View className="flex-1 mb-4">
          {/* Background glow effect */}
          <View className="absolute inset-0 rounded-3xl opacity-10" />

          {isLoading ? (
            <View className="h-40 items-center justify-center">
              <Text className="text-text-dim">Loading...</Text>
            </View>
          ) : localBlacklistedTricks.length === 0 ? (
            <View className="h-40 items-center justify-center p-4">
              <Text className="text-text-dim font-montserrat-light text-center">
                You haven't blacklisted any tricks yet. When viewing
                recommendations, you can blacklist tricks you don't want to see.
              </Text>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 8 }}
            >
              {localBlacklistedTricks.map((trickId) => {
                const trick = TRICK_DATA.find((t) => t.id === trickId);
                if (!trick) return null;

                return (
                  <View key={trickId} className="px-2">
                    <ModalTrickButton
                      name={trick.name}
                      altNames={trick.alt_names}
                      difficulty={trick.difficulty}
                      completionState={trickCompletionStates[trickId] || 0}
                      onPress={() => {}}
                      showBlacklistButton={true}
                      onBlacklist={() => handleRemoveFromBlacklist(trickId)}
                    />
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>

        {/* Footer with clear button */}
        {localBlacklistedTricks.length > 0 && (
          <View>
            <Button
              topText="CLEAR ALL"
              bottomText="Remove all tricks from blacklist"
              warning={true}
              onPress={handleClearAll}
            />
          </View>
        )}
      </View>
    </DraggableModal>
  );
};

export default BlacklistedTricksModal;
