import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import SilverTrophy from "../../../assets/icons/silvertrophy.svg";
import BronzeTrophy from "../../../assets/icons/bronzetrophy.svg";
import DiamondTrophy from "../../../assets/icons/diamondtrophy.svg";
import Gems from "../../../assets/icons/gems.svg";
import { TRICK_DATA, Trick } from "../Data/trickData";
import { TROPHY_DATA } from "../Data/trophyData";
import ModalTrickButton from "../Generic/ModalTrickButton";
import { useHaptics } from "../Utils/useHaptics";
import DraggableModal from "../Generic/DraggableModal";
import { TrickState } from "../Utils/StorageService";

const ICON_CONFIG = {
  SIZE: 300,
  OFFSET: 150,
};

interface TrophyModalProps {
  isVisible: boolean;
  onClose: () => void;
  trophyId: string;
  trickCompletionStates: TrickState;
  onTrickSelect: (trickId: string) => void;
  zIndex?: number;
}

const TrophyModal: React.FC<TrophyModalProps> = ({
  isVisible,
  onClose,
  trophyId,
  trickCompletionStates,
  onTrickSelect,
  zIndex = 1,
}) => {
  const trophy = TROPHY_DATA.find((t) => t.id === trophyId);
  const { triggerHaptic } = useHaptics();

  const tricks = useMemo(() => {
    if (!trophy) return [];
    return trophy.requiredTricks
      .map((id) => TRICK_DATA.find((t) => t.id === id))
      .filter((t): t is Trick => t !== undefined);
  }, [trophy]);

  const needsScrollView = tricks.length > 4;

  const calculateProgress = useMemo(() => {
    if (!trophy) return 0;
    const totalTricks = trophy.requiredTricks.length;
    const completedTricks = trophy.requiredTricks.reduce((sum, trickId) => {
      const state = trickCompletionStates[trickId] || 0;
      return sum + (state === 2 ? 1 : state === 1 ? 0.5 : 0);
    }, 0);
    return Math.round((completedTricks / totalTricks) * 100);
  }, [trophy, trickCompletionStates]);

  const getTrophyIcon = () => {
    const iconSize = 96;
    if (calculateProgress === 100) {
      return (
        <DiamondTrophy width={iconSize} height={iconSize} fill="#82AEB3" />
      );
    } else if (calculateProgress >= 50) {
      return <SilverTrophy width={iconSize} height={iconSize} fill="#D8E3E3" />;
    }
    return <BronzeTrophy width={iconSize} height={iconSize} fill="#E5B199" />;
  };

  const handleClose = async () => {
    await triggerHaptic("light");
    onClose();
  };

  const handleTrickSelect = async (trickId: string) => {
    await triggerHaptic("light");
    onTrickSelect(trickId);
  };

  if (!isVisible || !trophy) return null;

  const renderContent = () => {
    const content = (
      <>
        {/* Trophy Icon and Progress */}
        <View className="items-center mb-4">
          <View className="mb-2">{getTrophyIcon()}</View>
          <Text className="text-accent tracking-widest font-montserrat-semibold px-2 bg-accent-surface py-1 rounded-md text-center text-lg">
            {calculateProgress}%
          </Text>
        </View>

        {/* Description */}
        <Text className="text-text-dim font-montserrat text-base mb-6 text-center">
          {trophy.description}
        </Text>

        {/* Tricks Section */}
        <Text className="text-text font-montserrat-alt-medium text-base mb-4">
          Tricks to Master for this Trophy:
        </Text>
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
      </>
    );

    if (needsScrollView) {
      return (
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {content}
        </ScrollView>
      );
    }

    return <View className="flex-1">{content}</View>;
  };

  return (
    <DraggableModal
      isVisible={isVisible}
      onClose={handleClose}
      dragFromHandle={true}
      zIndex={3}
    >
      {/* Background Icons */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            opacity: 0.05,
          }}
        >
          <View
            style={{
              position: "absolute",
              left: -ICON_CONFIG.OFFSET,
              top: 100,
            }}
          >
            <Gems
              width={ICON_CONFIG.SIZE}
              height={ICON_CONFIG.SIZE}
              fill="#82AEB3"
              style={{ transform: [{ scaleX: -1 }] }}
            />
          </View>
          <View
            style={{
              position: "absolute",
              right: -ICON_CONFIG.OFFSET,
              top: 300,
            }}
          >
            <Gems
              width={ICON_CONFIG.SIZE}
              height={ICON_CONFIG.SIZE}
              fill="#82AEB3"
            />
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View className="px-6 flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity
            onPress={handleClose}
            className="bg-bg-elevated p-3 rounded-2xl z-10"
          >
            <ChevronRight
              width={24}
              height={24}
              style={{ transform: [{ rotate: "180deg" }] }}
              fill="#4FEDE2"
            />
          </TouchableOpacity>
          <View className="absolute w-full">
            <Text className="text-xl text-text font-montserrat-alt-medium -mb-2 text-center">
              {trophy.title}
            </Text>
          </View>
        </View>

        {renderContent()}
      </View>
    </DraggableModal>
  );
};

export default TrophyModal;
