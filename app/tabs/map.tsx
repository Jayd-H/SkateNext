import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import Animated from "react-native-reanimated";
import ChevronRight from "../../assets/icons/chevron-right.svg";
import Sparkles from "../../assets/icons/sparkles.svg";
import Telescope from "../../assets/icons/telescope.svg";
import { NotificationDot } from "../components/Generic/NotificationDot";
import { ActHeaderButton } from "../components/Acts/NodeButtons/ActHeaderButton";
import { getActTricks } from "../components/Utils/actTricks";
import { useHaptics } from "../components/Utils/useHaptics";
import { useAnimatedMount } from "../components/Utils/useAnimatedMount";
import {
  useTrickStates,
  useInfoStates,
  useModalVisitStates,
} from "../components/Utils/StorageService";

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
import ActListModal from "../components/Modals/ActListModal";

import { ScrollView } from "react-native";
import MapTutorial from "../components/Onboarding/MapTutorial";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../components/Utils/StorageService";
import { getRecommendedTricks } from "../components/Utils/trickRecommender";

const PAGES = ["1", "2", "3", "4"];
const STAGGER_DELAY = 100;
const ICON_SIZE = 28;

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
  const { triggerHaptic } = useHaptics();

  const [currentPage, setCurrentPage] = useState(0);
  const [currentActTricks, setCurrentActTricks] = useState<string[]>([]);
  const [isReadyToShow, setIsReadyToShow] = useState(false);

  const [selectedTrickId, setSelectedTrickId] = useState<string | null>(null);
  const [selectedInfoId, setSelectedInfoId] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  const [isLuckyModalVisible, setIsLuckyModalVisible] = useState(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [isRecommendationsVisible, setIsRecommendationsVisible] =
    useState(false);
  const [isActListModalVisible, setIsActListModalVisible] = useState(false);

  const [recommendations, setRecommendations] = useState<string[]>([]);

  const actScrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!tricksLoading && !infoLoading) {
      setTimeout(() => setIsReadyToShow(true), 100);
    }
  }, [tricksLoading, infoLoading]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      closeActiveModal
    );
    return () => backHandler.remove();
  }, [
    selectedTrickId,
    selectedInfoId,
    selectedFolderId,
    isLuckyModalVisible,
    isSearchModalVisible,
    isRecommendationsVisible,
    isActListModalVisible,
  ]);

  const handleNavigationPress = async (action: () => void) => {
    await triggerHaptic("light");
    action();
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
  const handleActListOpen = () =>
    handleNavigationPress(() => {
      const tricks = getActTricks(currentPage + 1);
      setCurrentActTricks(tricks);
      setIsActListModalVisible(true);
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
  const handleActListClose = () =>
    handleNavigationPress(() => setIsActListModalVisible(false));

  const getActiveModal = () => {
    if (selectedTrickId !== null) return "trick";
    if (selectedInfoId !== null) return "info";
    if (selectedFolderId !== null) return "folder";
    if (isSearchModalVisible) return "search";
    if (isRecommendationsVisible) return "recommendations";
    if (isActListModalVisible) return "actList";
    if (isLuckyModalVisible) return "lucky";
    return null;
  };

  const closeActiveModal = () => {
    const activeModal = getActiveModal();
    if (!activeModal) return false;

    switch (activeModal) {
      case "trick":
        handleTrickModalClose();
        break;
      case "info":
        handleInfoModalClose();
        break;
      case "folder":
        handleFolderModalClose();
        break;
      case "lucky":
        handleLuckyModalClose();
        break;
      case "search":
        handleSearchModalClose();
        break;
      case "recommendations":
        handleRecommendationsClose();
        break;
      case "actList":
        handleActListClose();
        break;
    }
    return true;
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

    return (
      <View className="flex-1">
        {currentPage === 0 ? (
          <Act1 {...commonProps} scrollViewRef={actScrollViewRef} />
        ) : currentPage === 1 ? (
          <Act2 {...commonProps} scrollViewRef={actScrollViewRef} />
        ) : currentPage === 2 ? (
          <Act3 {...commonProps} scrollViewRef={actScrollViewRef} />
        ) : (
          <Act4 {...commonProps} scrollViewRef={actScrollViewRef} />
        )}
      </View>
    );
  };

  const handleTrickCompletion = (trickId: string, state: number) => {
    updateTrickState(trickId, state);
  };

  const handleRecommendations = async (recommendedTricks: string[]) => {
    setRecommendations(recommendedTricks);
    setIsRecommendationsVisible(true);
  };

  const headerAnim = useAnimatedMount({ delay: 0 });
  const navigationAnim = useAnimatedMount({ delay: STAGGER_DELAY });
  const actHeaderAnim = useAnimatedMount({ delay: STAGGER_DELAY * 2 });
  const contentAnim = useAnimatedMount({ delay: STAGGER_DELAY * 3 });

  if (tricksLoading || infoLoading || !isReadyToShow) {
    return <View className="flex-1 bg-background" />;
  }

  return (
    <View className="flex-1 bg-background">
      <MapTutorial actScrollViewRef={actScrollViewRef} />
      <Animated.View
        style={[headerAnim.animatedStyle]}
        className="w-full py-2 mt-8"
      >
        <View className="px-4 flex-row items-center justify-between">
          <View className="w-20 flex-row items-center">
            <TouchableOpacity
              onPress={handleLuckyOpen}
              className="w-10 h-10 items-center justify-center"
            >
              <View className="relative">
                <Sparkles width={ICON_SIZE} height={ICON_SIZE} fill="#34CDB3" />
                <NotificationDot isVisible={!modalVisitStates.lucky} />
              </View>
            </TouchableOpacity>
            <View className="flex-1 h-[1px] bg-accent-dark ml-2" />
          </View>

          <Animated.View
            style={[navigationAnim.animatedStyle]}
            className="w-44 flex-row items-center justify-center"
          >
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
          </Animated.View>

          <View className="w-20 flex-row items-center justify-end">
            <View className="flex-1 h-[1px] bg-accent-dark mr-2" />
            <TouchableOpacity
              onPress={handleSearchOpen}
              className="w-10 h-10 items-center justify-center"
            >
              <View className="relative">
                <Telescope
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  fill="#34CDB3"
                />
                <NotificationDot isVisible={!modalVisitStates.search} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <Animated.View
        style={[actHeaderAnim.animatedStyle]}
        className="px-4 mb-12"
      >
        <ActHeaderButton
          topText={getActInfo(currentPage).topText}
          bottomText={getActInfo(currentPage).bottomText}
          onPress={handleActListOpen}
        />
      </Animated.View>

      <Animated.View
        style={[contentAnim.animatedStyle]}
        className="flex-1 w-full bg-background mt-4"
      >
        {renderCurrentAct()}
      </Animated.View>

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
        onRefreshRecommendations={async () => {
          const age = await AsyncStorage.getItem(STORAGE_KEYS.USER_AGE);
          const userAge = age ? parseInt(age) : 25;
          const newRecommendations = await getRecommendedTricks(
            trickStates,
            userAge
          );
          setRecommendations(newRecommendations);
        }}
      />

      <ActListModal
        isVisible={isActListModalVisible}
        onClose={handleActListClose}
        onTrickSelect={handleTrickPress}
        trickIds={currentActTricks}
        trickCompletionStates={trickStates}
        actTitle={getActInfo(currentPage).topText}
      />
    </View>
  );
}
