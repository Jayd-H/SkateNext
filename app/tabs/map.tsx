import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import ChevronRight from "../../assets/icons/chevron-right.svg";
import Sparkles from "../../assets/icons/sparkles.svg";
import Telescope from "../../assets/icons/telescope.svg";
import Act1 from "../components/Acts/Act1";
import Act2 from "../components/Acts/Act2";
import Act3 from "../components/Acts/Act3";
import Act4 from "../components/Acts/Act4";
import TrickModal from "../components/Modals/TrickModal";
import InfoModal from "../components/Modals/InfoModal";
import FolderModal from "../components/Modals/FolderModal";
import LuckyModal from "../components/Modals/LuckyModal";
import SearchModal from "../components/Modals/SearchModal";
import RecommendationsModal from "../components/Modals/RecommendationsModal";
import { useTrickStates, useInfoStates } from "../components/StorageService";

const PAGES = ["1", "2", "3", "4"];

export default function Map() {
  const {
    trickStates,
    isLoading: tricksLoading,
    updateTrickState,
  } = useTrickStates();
  const {
    infoStates,
    isLoading: infoLoading,
    updateInfoState,
  } = useInfoStates();

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTrickId, setSelectedTrickId] = useState<string | null>(null);
  const [selectedInfoId, setSelectedInfoId] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [isLuckyModalVisible, setIsLuckyModalVisible] = useState(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [isRecommendationsVisible, setIsRecommendationsVisible] =
    useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const changePage = (direction: number) => {
    setCurrentPage((prevPage) =>
      Math.max(0, Math.min(prevPage + direction, PAGES.length - 1))
    );
  };

  const handleTrickPress = (id: string) => {
    setSelectedTrickId(id);
  };

  const handleInfoPress = (id: string) => {
    setSelectedInfoId(id);
    updateInfoState(id, true);
  };

  const handleBossPress = (id: string) => {
    setSelectedTrickId(id);
  };

  const handleFolderPress = (id: string) => {
    setSelectedFolderId(id);
  };

  const handleTrickCompletion = (trickId: string, state: number) => {
    updateTrickState(trickId, state);
  };

  const handleRecommendations = (recommendedTricks: string[]) => {
    setRecommendations(recommendedTricks);
    setIsRecommendationsVisible(true);
  };

  const handleRecommendationsClose = () => {
    setIsRecommendationsVisible(false);
  };

  const iconSize: number = 24;

  if (tricksLoading || infoLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View className="flex-1 items-center bg-background">
        {/* Header */}
        <View className="bg-background z-20 pb-4">
          <View className="flex-row items-center justify-between mt-10 px-4 w-full">
            <TouchableOpacity
              onPress={() => setIsLuckyModalVisible(true)}
              className="p-2 -mb-4"
            >
              <Sparkles width={iconSize} height={iconSize} fill="#EBEFEF" />
            </TouchableOpacity>
            <Text className="text-xl text-text font-montserrat-light">
              M A P
            </Text>
            <TouchableOpacity
              onPress={() => setIsSearchModalVisible(true)}
              className="p-2 -mb-4"
            >
              <Telescope width={iconSize} height={iconSize} fill="#EBEFEF" />
            </TouchableOpacity>
          </View>

          {/* Page Navigation */}
          <View className="absolute left-0 right-0 -bottom-8 flex items-center justify-center">
            <View className="flex-row items-center px-4 py-2">
              <TouchableOpacity
                onPress={() => changePage(-1)}
                disabled={currentPage === 0}
                className="p-4"
              >
                <ChevronRight
                  width={18}
                  height={18}
                  style={{ transform: [{ rotate: "180deg" }] }}
                  fill={currentPage === 0 ? "#183C36" : "#EBEFEF"}
                  stroke={currentPage === 0 ? "#183C36" : "#EBEFEF"}
                  strokeWidth={1}
                />
              </TouchableOpacity>
              <View className="w-20 items-center">
                <Text className="text-text font-montserrat-bold">
                  {PAGES[currentPage]}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => changePage(1)}
                disabled={currentPage === PAGES.length - 1}
                className="p-4"
              >
                <ChevronRight
                  width={18}
                  height={18}
                  fill={
                    currentPage === PAGES.length - 1 ? "#183C36" : "#EBEFEF"
                  }
                  stroke={
                    currentPage === PAGES.length - 1 ? "#183C36" : "#EBEFEF"
                  }
                  strokeWidth={1}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Acts */}
        <View className="flex-1 w-full mt-6">
          {currentPage === 0 && (
            <Act1
              onBossPress={handleBossPress}
              onTrickPress={handleTrickPress}
              onInfoPress={handleInfoPress}
              onFolderPress={handleFolderPress}
              trickCompletionStates={trickStates}
              infoCompletionStates={infoStates}
            />
          )}
          {currentPage === 1 && (
            <Act2
              onBossPress={handleBossPress}
              onTrickPress={handleTrickPress}
              onInfoPress={handleInfoPress}
              onFolderPress={handleFolderPress}
              trickCompletionStates={trickStates}
              infoCompletionStates={infoStates}
            />
          )}
          {currentPage === 2 && (
            <Act3
              onBossPress={handleBossPress}
              onTrickPress={handleTrickPress}
              onInfoPress={handleInfoPress}
              onFolderPress={handleFolderPress}
              trickCompletionStates={trickStates}
              infoCompletionStates={infoStates}
            />
          )}
          {currentPage === 3 && (
            <Act4
              onBossPress={handleBossPress}
              onTrickPress={handleTrickPress}
              onInfoPress={handleInfoPress}
              onFolderPress={handleFolderPress}
              trickCompletionStates={trickStates}
              infoCompletionStates={infoStates}
            />
          )}
        </View>
      </View>

      {/* Modals */}
      <FolderModal
        isVisible={selectedFolderId !== null}
        onClose={() => setSelectedFolderId(null)}
        folderId={selectedFolderId || ""}
        trickCompletionStates={trickStates}
        onTrickSelect={handleTrickPress}
      />
      <SearchModal
        isVisible={isSearchModalVisible}
        onClose={() => setIsSearchModalVisible(false)}
        onTrickSelect={handleTrickPress}
        trickCompletionStates={trickStates}
      />
      <LuckyModal
        isVisible={isLuckyModalVisible}
        onClose={() => setIsLuckyModalVisible(false)}
        onTrickSelect={handleTrickPress}
        trickStates={trickStates}
        onShowRecommendations={handleRecommendations}
      />
      <RecommendationsModal
        isVisible={isRecommendationsVisible}
        onClose={handleRecommendationsClose}
        onTrickSelect={(trickId) => {
          handleTrickPress(trickId);
          setIsRecommendationsVisible(false);
          setIsLuckyModalVisible(false);
        }}
        recommendations={recommendations}
        trickCompletionStates={trickStates}
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
      <InfoModal
        isVisible={selectedInfoId !== null}
        onClose={() => setSelectedInfoId(null)}
        infoId={selectedInfoId || ""}
      />
    </View>
  );
}
