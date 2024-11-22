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
import { ActHeaderButton } from "../components/Acts/NodeButtons/ActHeaderButton";
import {
  useTrickStates,
  useInfoStates,
} from "../components/Utils/StorageService";

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

  const getActInfo = (page: number) => {
    switch (page) {
      case 0:
        return {
          topText: "Act 1",
          bottomText: "No-Complys, Shuvs, and Ollies",
        };
      case 1:
        return {
          topText: "Act 2",
          bottomText: "Bigspins, Nollies, and Kickflips",
        };
      case 2:
        return {
          topText: "Act 3",
          bottomText: "Heelflips, Varials, and Tres",
        };
      case 3:
        return {
          topText: "Act 4",
          bottomText: "Biggerflips, Doubles, and Lasers",
        };
      default:
        return {
          topText: "Unknown Act",
          bottomText: "Mystery Tricks",
        };
    }
  };

  const changePage = (direction: number) => {
    setCurrentPage((prevPage) =>
      Math.max(0, Math.min(prevPage + direction, PAGES.length - 1))
    );
  };

  const renderCurrentAct = () => {
    const commonProps = {
      onTrickPress: handleTrickPress,
      onInfoPress: handleInfoPress,
      onBossPress: handleBossPress,
      onFolderPress: handleFolderPress,
      trickCompletionStates: trickStates,
      infoCompletionStates: infoStates,
    };

    switch (currentPage) {
      case 0:
        return <Act1 {...commonProps} />;
      case 1:
        return <Act2 {...commonProps} />;
      case 2:
        return <Act3 {...commonProps} />;
      case 3:
        return <Act4 {...commonProps} />;
      default:
        return null;
    }
  };

  if (tricksLoading || infoLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const iconSize = 28;

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="w-full py-2 mt-8">
        <View className="px-4 flex-row items-center justify-between">
          {/* Left Side */}
          <View className="w-20 flex-row items-center">
            <TouchableOpacity
              onPress={() => setIsLuckyModalVisible(true)}
              className="w-10 h-10 items-center justify-center"
            >
              <Sparkles width={iconSize} height={iconSize} fill="#34CDB3" />
            </TouchableOpacity>
            <View className="flex-1 h-[1px] bg-accent-dark ml-2" />
          </View>

          {/* Center Navigation */}
          <View className="w-44 flex-row items-center justify-center">
            <TouchableOpacity
              onPress={() => changePage(-1)}
              disabled={currentPage === 0}
              className="w-10 h-10 items-center justify-center"
            >
              <ChevronRight
                width={20}
                height={20}
                style={{ transform: [{ rotate: "180deg" }] }}
                fill={currentPage === 0 ? "#183C36" : "#34CDB3"}
              />
            </TouchableOpacity>

            <View className="w-24 flex-row items-center justify-center">
              <Text className="text-text font-montserrat-semibold text-lg">
                {currentPage + 1}
              </Text>
              <Text className="text-text-dim font-montserrat-regular text-lg mx-2">
                of
              </Text>
              <Text className="text-text-dim font-montserrat-regular text-lg">
                {PAGES.length}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => changePage(1)}
              disabled={currentPage === PAGES.length - 1}
              className="w-10 h-10 items-center justify-center"
            >
              <ChevronRight
                width={20}
                height={20}
                fill={currentPage === PAGES.length - 1 ? "#183C36" : "#34CDB3"}
              />
            </TouchableOpacity>
          </View>

          {/* Right Side */}
          <View className="w-20 flex-row items-center justify-end">
            <View className="flex-1 h-[1px] bg-accent-dark mr-2" />
            <TouchableOpacity
              onPress={() => setIsSearchModalVisible(true)}
              className="w-10 h-10 items-center justify-center"
            >
              <Telescope width={iconSize} height={iconSize} fill="#34CDB3" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Act Header */}
      <View className="px-4 mb-12">
        <ActHeaderButton
          topText={getActInfo(currentPage).topText}
          bottomText={getActInfo(currentPage).bottomText}
          onPress={() => {}}
        />
      </View>

      {/* Current Act */}
      <View className="flex-1 w-full bg-background mt-4">
        {renderCurrentAct()}
      </View>

      {/* Modals */}
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
        }}
        recommendations={recommendations}
        trickCompletionStates={trickStates}
      />
    </View>
  );
}
