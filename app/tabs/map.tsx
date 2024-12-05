import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
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
import LoadingSpinner from "../components/Generic/LoadingSpinner";
import {
  useTrickStates,
  useInfoStates,
  useModalVisitStates,
} from "../components/Utils/StorageService";

const PAGES = ["1", "2", "3", "4"];

const NotificationDot = ({ isVisible }: { isVisible: boolean }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isVisible) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1,
        true
      );
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[animatedStyle]}
      className="absolute top-0 right-0 w-2 h-2 rounded-full border-[1px] border-accent-dark bg-accent"
    />
  );
};

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
  const { modalVisitStates, updateModalVisitState } = useModalVisitStates();

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTrickId, setSelectedTrickId] = useState<string | null>(null);
  const [selectedInfoId, setSelectedInfoId] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [isLuckyModalVisible, setIsLuckyModalVisible] = useState(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [isRecommendationsVisible, setIsRecommendationsVisible] =
    useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isReadyToShow, setIsReadyToShow] = useState(false);

  const handleNavigationPress = async (action: () => void) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    action();
  };

  const handleTrickPress = (id: string) =>
    handleNavigationPress(() => setSelectedTrickId(id));
  const handleInfoPress = (id: string) =>
    handleNavigationPress(() => {
      setSelectedInfoId(id);
      updateInfoState(id, true);
    });
  const handleBossPress = (id: string) =>
    handleNavigationPress(() => setSelectedTrickId(id));
  const handleFolderPress = (id: string) =>
    handleNavigationPress(() => setSelectedFolderId(id));
  const handleSearchOpen = () =>
    handleNavigationPress(() => {
      setIsSearchModalVisible(true);
      updateModalVisitState("search", true);
    });
  const handleLuckyOpen = () =>
    handleNavigationPress(() => {
      setIsLuckyModalVisible(true);
      updateModalVisitState("lucky", true);
    });

  const handleTrickModalClose = () =>
    handleNavigationPress(() => setSelectedTrickId(null));
  const handleInfoModalClose = () =>
    handleNavigationPress(() => setSelectedInfoId(null));
  const handleFolderModalClose = () =>
    handleNavigationPress(() => setSelectedFolderId(null));
  const handleSearchModalClose = () =>
    handleNavigationPress(() => setIsSearchModalVisible(false));
  const handleLuckyModalClose = () =>
    handleNavigationPress(() => setIsLuckyModalVisible(false));
  const handleRecommendationsClose = () =>
    handleNavigationPress(() => setIsRecommendationsVisible(false));

  const handleTrickCompletion = (trickId: string, state: number) => {
    updateTrickState(trickId, state);
  };

  const handleRecommendations = (recommendedTricks: string[]) => {
    setRecommendations(recommendedTricks);
    setIsRecommendationsVisible(true);
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
    handleNavigationPress(() => {
      setCurrentPage((prevPage) =>
        Math.max(0, Math.min(prevPage + direction, PAGES.length - 1))
      );
    });
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

  useEffect(() => {
    if (!tricksLoading && !infoLoading) {
      setTimeout(() => {
        setIsReadyToShow(true);
      }, 1000);
    }
  }, [tricksLoading, infoLoading]);

  if (tricksLoading || infoLoading || !isReadyToShow) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-center text-accent-dark font-montserrat-alt text-lg tracking-widest">
          getting your map ready...
        </Text>
        <LoadingSpinner />
      </View>
    );
  }

  const iconsize: number = 28;

  return (
    <View className="flex-1 bg-background">
      <View className="w-full py-2 mt-8">
        {/* Header */}

        <View className="px-4 flex-row items-center justify-between">
          <View className="w-20 flex-row items-center">
            <TouchableOpacity
              onPress={handleLuckyOpen}
              className="w-10 h-10 items-center justify-center"
            >
              <View className="relative">
                <Sparkles width={iconsize} height={iconsize} fill="#34CDB3" />
                <NotificationDot isVisible={!modalVisitStates.lucky} />
              </View>
            </TouchableOpacity>
            <View className="flex-1 h-[1px] bg-accent-dark ml-2" />
          </View>

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

          <View className="w-20 flex-row items-center justify-end">
            <View className="flex-1 h-[1px] bg-accent-dark mr-2" />
            <TouchableOpacity
              onPress={handleSearchOpen}
              className="w-10 h-10 items-center justify-center"
            >
              <View className="relative">
                <Telescope width={iconsize} height={iconsize} fill="#34CDB3" />
                <NotificationDot isVisible={!modalVisitStates.search} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Header Button */}

      <View className="px-4 mb-12">
        <ActHeaderButton
          topText={getActInfo(currentPage).topText}
          bottomText={getActInfo(currentPage).bottomText}
          onPress={() => {}}
        />
      </View>

      {/* Acts */}

      <View className="flex-1 w-full bg-background mt-4">
        {renderCurrentAct()}
      </View>

      {/* Modals */}

      <TrickModal
        isVisible={selectedTrickId !== null}
        onClose={handleTrickModalClose}
        trickId={selectedTrickId || ""}
        completionState={
          selectedTrickId ? trickStates[selectedTrickId] || 0 : 0
        }
        onCompletionChange={handleTrickCompletion}
      />

      <InfoModal
        isVisible={selectedInfoId !== null}
        onClose={handleInfoModalClose}
        infoId={selectedInfoId || ""}
      />

      <FolderModal
        isVisible={selectedFolderId !== null}
        onClose={handleFolderModalClose}
        folderId={selectedFolderId || ""}
        trickCompletionStates={trickStates}
        onTrickSelect={handleTrickPress}
      />

      <SearchModal
        isVisible={isSearchModalVisible}
        onClose={handleSearchModalClose}
        onTrickSelect={handleTrickPress}
        trickCompletionStates={trickStates}
      />

      <LuckyModal
        isVisible={isLuckyModalVisible}
        onClose={handleLuckyModalClose}
        onTrickSelect={handleTrickPress}
        trickStates={trickStates}
        onShowRecommendations={handleRecommendations}
      />

      <RecommendationsModal
        isVisible={isRecommendationsVisible}
        onClose={handleRecommendationsClose}
        onTrickSelect={handleTrickPress}
        recommendations={recommendations}
        trickCompletionStates={trickStates}
      />
    </View>
  );
}
