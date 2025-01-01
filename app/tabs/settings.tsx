import { useRouter } from "expo-router";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, BackHandler } from "react-native";
import Modal from "../components/Modals/GenericModal";
import TrophyModal from "../components/Modals/TrophyModal";
import TrickModal from "../components/Modals/TrickModal";
import AllTrophiesModal from "../components/Modals/AllTrophiesModal";
import DeleteConfirmModal from "../components/Modals/DeleteConfirmModal";
import UserStats from "../components/Generic/UserStats";
import UserTrophies from "../components/Generic/UserTrophies";
import Button from "../components/Generic/Button";
import ToggleSwitch from "../components/Generic/ToggleSwitch";
import { useTrickStates } from "../components/Utils/StorageService";
import { useHaptics } from "../components/Utils/useHaptics";
import { StorageService } from "../components/Utils/StorageService";
import { TROPHY_DATA } from "../components/Data/trophyData";

// Z-index constants for modals
const MODAL_Z_INDEXES = {
  preferences: 1,
  info: 1,
  generic: 2,
  allTrophies: 1,
  trophy: 2,
  trick: 3,
  delete: 4,
};

export default function Settings() {
  const router = useRouter();
  const { trickStates, updateTrickState } = useTrickStates();
  const { isEnabled: hapticsEnabled, toggleHaptics } = useHaptics();

  const [selectedTrophyId, setSelectedTrophyId] = useState<string | null>(null);
  const [selectedTrickId, setSelectedTrickId] = useState<string | null>(null);
  const [isAllTrophiesVisible, setIsAllTrophiesVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [preferencesModalVisible, setPreferencesModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });

  // Memoized trophy progress calculation
  const trophyProgress = useMemo(() => {
    const progress: Record<string, number> = {};
    TROPHY_DATA.forEach((trophy) => {
      const totalTricks = trophy.requiredTricks.length;
      const completedTricks = trophy.requiredTricks.reduce((sum, trickId) => {
        const state = trickStates[trickId] || 0;
        return sum + (state === 2 ? 1 : state === 1 ? 0.5 : 0);
      }, 0);
      progress[trophy.id] = Math.round((completedTricks / totalTricks) * 100);
    });
    return progress;
  }, [trickStates]);

  // Get active modal - memoized to prevent unnecessary recalculations
  const getActiveModal = useCallback(() => {
    if (modalVisible) return "generic";
    if (deleteModalVisible) return "delete";
    if (selectedTrickId !== null) return "trick";
    if (selectedTrophyId !== null) return "trophy";
    if (isAllTrophiesVisible) return "allTrophies";
    if (infoModalVisible) return "info";
    if (preferencesModalVisible) return "preferences";
    return null;
  }, [
    modalVisible,
    deleteModalVisible,
    selectedTrickId,
    selectedTrophyId,
    isAllTrophiesVisible,
    infoModalVisible,
    preferencesModalVisible,
  ]);

  // Close active modal - memoized for back handler
  const closeActiveModal = useCallback(() => {
    const activeModal = getActiveModal();
    if (!activeModal) return false;

    switch (activeModal) {
      case "trophy":
        setSelectedTrophyId(null);
        break;
      case "trick":
        setSelectedTrickId(null);
        break;
      case "allTrophies":
        setIsAllTrophiesVisible(false);
        break;
      case "delete":
        setDeleteModalVisible(false);
        break;
      case "preferences":
        setPreferencesModalVisible(false);
        break;
      case "info":
        setInfoModalVisible(false);
        break;
      case "generic":
        setModalVisible(false);
        break;
    }
    return true;
  }, [getActiveModal]);

  // Back handler setup
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      closeActiveModal
    );
    return () => backHandler.remove();
  }, [closeActiveModal]);

  // Modal handlers
  const handleTrophyPress = useCallback((trophyId: string) => {
    setSelectedTrophyId(trophyId);
  }, []);

  const handleTrickSelect = useCallback((trickId: string) => {
    setSelectedTrickId(trickId);
  }, []);

  const handleShowAllTrophies = useCallback(() => {
    setIsAllTrophiesVisible(true);
  }, []);

  const handleTrickCompletion = useCallback(
    async (trickId: string, state: number) => {
      await updateTrickState(trickId, state);
    },
    [updateTrickState]
  );

  const handleDeleteData = useCallback(async () => {
    try {
      await StorageService.clearAllData();
      router.replace("/");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }, [router]);

  const openInfoModal = useCallback((title: string, content: string) => {
    setModalContent({ title, content });
    setModalVisible(true);
  }, []);

  return (
    <View className="flex-1 bg-background px-4">
      <View className="pt-10 flex-1">
        <View className="mb-6"></View>

        <View className="mb-12">
          <UserStats />
        </View>

        <View className="mb-6">
          <UserTrophies
            onTrophyPress={handleTrophyPress}
            onShowAllTrophies={handleShowAllTrophies}
            trickCompletionStates={trickStates}
          />
        </View>
      </View>

      {/* Bottom Buttons */}
      <View className="flex-row justify-between mb-2">
        <View className="flex-1 mr-2">
          <Button
            topText="PREFERENCES"
            size="small"
            onPress={() => setPreferencesModalVisible(true)}
          />
        </View>
        <View className="flex-1 ml-2">
          <Button
            topText="INFO"
            size="small"
            onPress={() => setInfoModalVisible(true)}
          />
        </View>
      </View>

      {/* Modals */}
      <Modal
        isVisible={preferencesModalVisible}
        onClose={() => setPreferencesModalVisible(false)}
        title="Preferences"
        zIndex={MODAL_Z_INDEXES.preferences}
        content={
          <View className="space-y-4">
            <ToggleSwitch
              isEnabled={hapticsEnabled}
              onToggle={toggleHaptics}
              topText="H A P T I C S"
              bottomText="Toggle haptic feedback throughout the app"
            />
            <Button
              topText="Delete All Data"
              warning={true}
              onPress={() => setDeleteModalVisible(true)}
            />
          </View>
        }
      />

      <Modal
        isVisible={infoModalVisible}
        onClose={() => setInfoModalVisible(false)}
        title="Information"
        zIndex={MODAL_Z_INDEXES.info}
        content={
          <View className="space-y-4">
            <Button
              topText="Terms Of Service"
              onPress={() =>
                openInfoModal(
                  "Terms of Service",
                  "By using SkateNext, you agree to use the app responsibly and at your own risk. The app is designed to assist in tracking skateboarding progress and providing recommendations, but it is not a substitute for proper training, equipment, or safety precautions. \n\nYou acknowledge that skateboarding is an inherently risky activity, and you are solely responsible for your actions and safety while skateboarding.\n\nSkateNext reserves the right to modify, suspend, or terminate the app or your access to it at any time without notice. You agree not to misuse the app, attempt to access it through unauthorized means, or use it for any illegal or prohibited purpose."
                )
              }
            />
            <Button
              topText="Liability Disclaimer"
              onPress={() =>
                openInfoModal(
                  "Liability Disclaimer",
                  "SkateNext and its creators are not liable for any injuries, accidents, or damages that may occur while using the app or engaging in skateboarding activities. The calorie estimation feature is for informational purposes only and should not be considered medical advice.\n\nThe trick recommendations and progression paths provided by the app are based on general guidelines and may not be suitable for all skill levels or physical conditions. Users should always exercise caution, use proper safety equipment, and consult with a qualified instructor or medical professional when necessary.\n\nBy using SkateNext, you agree to release the app and its creators from any and all liability related to your use of the app or participation in skateboarding activities."
                )
              }
            />
            <Button
              topText="Attributions"
              onPress={() =>
                openInfoModal(
                  "Attributions",
                  "Created by Jayden Holdsworth (jaydchw).\nIcons from games-icons.net.\nFonts from Google Fonts.\nBuilt with React Native and Expo. \n\nThank you for using SkateNext! 🛹🔥"
                )
              }
            />
          </View>
        }
      />

      <Modal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalContent.title}
        zIndex={MODAL_Z_INDEXES.generic}
        content={modalContent.content}
      />

      <TrophyModal
        isVisible={selectedTrophyId !== null}
        onClose={() => setSelectedTrophyId(null)}
        trophyId={selectedTrophyId || ""}
        trickCompletionStates={trickStates}
        onTrickSelect={handleTrickSelect}
        zIndex={MODAL_Z_INDEXES.trophy}
      />

      <TrickModal
        isVisible={selectedTrickId !== null}
        onClose={() => setSelectedTrickId(null)}
        trickId={selectedTrickId || ""}
        completionState={
          selectedTrickId ? trickStates[selectedTrickId] || 0 : 0
        }
        onCompletionChange={handleTrickCompletion}
      />

      <AllTrophiesModal
        isVisible={isAllTrophiesVisible}
        onClose={() => setIsAllTrophiesVisible(false)}
        onTrophyPress={handleTrophyPress}
        trophyProgress={trophyProgress}
        zIndex={MODAL_Z_INDEXES.allTrophies}
      />

      <DeleteConfirmModal
        isVisible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleDeleteData}
        zIndex={MODAL_Z_INDEXES.delete}
      />
    </View>
  );
}
