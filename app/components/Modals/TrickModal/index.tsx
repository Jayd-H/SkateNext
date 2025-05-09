import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Network from "expo-network";
import { TRICK_DATA } from "../../Data/trickData";
import { useHaptics } from "../../Utils/useHaptics";
import DraggableModal from "../../Generic/DraggableModal";
import VideoModal from "./VideoModal";
import ContentSection from "./ContentSection";
import TrickModalHeader from "./TrickModalHeader";
import TrickModalInfo from "./TrickModalInfo";
import TrickModalProgress from "./TrickModalProgress";
import BackgroundIcons from "./BackgroundIcons";
import { useModalTheme } from "./useModalTheme";
import { useAnimations } from "./useAnimations";
import { TrickModalProps } from "./types";

import { shouldShowSafetyPopup } from "../../Utils/safetyUtils";
import { useSafetyPopupPreferences } from "../../Utils/StorageService";
import SafetyPopup from "../SafetyPopup";

const TrickModal: React.FC<TrickModalProps> = ({
  isVisible,
  onClose,
  trickId,
  completionState,
  onCompletionChange,
}) => {
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const { triggerHaptic } = useHaptics();
  const trick = TRICK_DATA.find((t: any) => t.id === trickId);
  const theme = useModalTheme(trick?.difficulty || "1");
  const { waveValues, glowOpacity } = useAnimations(theme, isVisible);

  const [showSafetyPopup, setShowSafetyPopup] = useState(false);
  const [safetyReason, setSafetyReason] = useState("");
  const { safetyPopupPrefs, updateSafetyPopupPreferences } =
    useSafetyPopupPreferences();

  useEffect(() => {
    if (isVisible && trickId) {
      checkSafetyPopup();
    }
  }, [isVisible, trickId]);

  // Function to check if safety popup should be shown
  const checkSafetyPopup = async () => {
    const { shouldShow, reason } = await shouldShowSafetyPopup(trickId);

    if (shouldShow) {
      setSafetyReason(reason);
      setShowSafetyPopup(true);

      // Update timestamp of when popup was last shown
      updateSafetyPopupPreferences({
        lastShownTimestamp: Date.now(),
      });
    }
  };

  // Handlers for the safety popup
  const handleCloseSafetyPopup = () => {
    setShowSafetyPopup(false);
  };

  const handleDontShowSafetyPopupAgain = () => {
    // Disable all safety popups permanently
    updateSafetyPopupPreferences({ dontShowAgain: true });
    setShowSafetyPopup(false);
  };

  useEffect(() => {
    const checkConnection = async () => {
      const networkState = await Network.getNetworkStateAsync();
      setIsConnected(networkState.isConnected || false);
    };

    const interval = setInterval(checkConnection, 5000);
    checkConnection();

    return () => clearInterval(interval);
  }, []);

  if (!isVisible || !trick) return null;

  const handleButtonSelection = async (value: "yes" | "sometimes" | "no") => {
    const stateMap = { yes: 2, sometimes: 1, no: 0 };
    const newState = completionState === stateMap[value] ? 0 : stateMap[value];
    onCompletionChange(trickId, newState);
  };

  const handleVHSPress = async () => {
    if (!isConnected || trick.video_link === "") return;
    await triggerHaptic("light");
    setIsVideoModalVisible(true);
  };

  const renderCommonMistakes = (mistakes: string) => {
    return mistakes.split(/\[([^\]]+)\]/).map((part, index) => {
      if (index % 2 === 0) {
        return part.trim() ? (
          <Text
            key={index}
            className="text-text-dim font-montserrat mb-2 px-4 leading-6 text-sm"
          >
            {part.trim()}
          </Text>
        ) : null;
      } else {
        return (
          <Text
            key={index}
            className="text-accent-muted font-montserrat-alt-medium px-4 text-sm"
          >
            {part}
          </Text>
        );
      }
    });
  };

  const modalContent = (
    <View className="flex-1 bg-bg-card relative">
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        {theme.hasGradient && (
          <LinearGradient
            colors={theme.colors as unknown as [string, string, string]}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        )}

        {theme.hasBackgroundIcons && (
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <BackgroundIcons theme={theme} />
          </View>
        )}
      </View>

      <View className="flex-1 relative z-1">
        <View className="p-6 -mt-2">
          <TrickModalHeader
            onClose={onClose}
            onVHSPress={handleVHSPress}
            isConnected={isConnected}
            videoLink={trick.video_link}
            theme={theme}
            waveValues={waveValues}
          />

          <TrickModalInfo
            name={trick.name}
            altNames={trick.alt_names}
            difficulty={trick.difficulty}
            theme={theme}
            waveValues={waveValues}
          />

          <TrickModalProgress
            name={trick.name}
            completionState={completionState}
            onButtonSelection={handleButtonSelection}
            theme={theme}
            glowOpacity={glowOpacity}
          />
        </View>

        <View className="flex-1 -mt-4">
          <ContentSection
            description={trick.description}
            commonMistakes={trick.common_mistakes}
            renderCommonMistakes={renderCommonMistakes}
          />
        </View>
      </View>
    </View>
  );

  return (
    <DraggableModal
      isVisible={isVisible}
      onClose={onClose}
      zIndex={10}
      overlay={
        <VideoModal
          isVisible={isVideoModalVisible}
          onClose={() => setIsVideoModalVisible(false)}
          videoUrl={trick?.video_link || ""}
        />
      }
    >
      {modalContent}
      <SafetyPopup
        isVisible={showSafetyPopup}
        trickId={trickId}
        reason={safetyReason}
        onClose={handleCloseSafetyPopup}
        onDontShowAgain={handleDontShowSafetyPopupAgain}
      />
    </DraggableModal>
  );
};

export default TrickModal;
