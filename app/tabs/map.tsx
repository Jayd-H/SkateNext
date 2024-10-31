import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ChevronRight from "../../assets/icons/chevron-right.svg";
import Act1Grid from "../components/Acts/Act1";
import TrickModal from "../components/Modals/TrickModal";
import InfoModal from "../components/Modals/InfoModal";
import FolderModal from "../components/Modals/FolderModal";

const PAGES = ["1", "2", "3", "4"];

export default function Map() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTrickId, setSelectedTrickId] = useState<string | null>(null);
  const [selectedInfoId, setSelectedInfoId] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [trickCompletionStates, setTrickCompletionStates] = useState<
    Record<string, number>
  >({});
  const [infoCompletionStates, setInfoCompletionStates] = useState<
    Record<string, boolean>
  >({});

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
    setInfoCompletionStates((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const handleBossPress = (id: string) => {
    console.log(`Boss pressed: ${id}`);
  };

  const handleFolderPress = (id: string) => {
    setSelectedFolderId(id);
  };

  const handleTrickCompletion = (trickId: string, state: number) => {
    setTrickCompletionStates((prev) => ({
      ...prev,
      [trickId]: state,
    }));
  };

  return (
    <View className="flex-1">
      <View className="flex-1 items-center bg-background">
        <View className="bg-background z-20 pb-4">
          <Text className="text-xl text-text font-montserrat-light mt-10 z-30 text-center">
            M A P
          </Text>
          <View className=" flex-row w-full bg-background">
            <View className="flex-row items-center justify-between mt-2 w-48 z-30">
              <TouchableOpacity
                onPress={() => changePage(-1)}
                disabled={currentPage === 0}
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
        <View className="flex-1 w-full">
          {currentPage === 0 && (
            <Act1Grid
              onBossPress={handleBossPress}
              onTrickPress={handleTrickPress}
              onInfoPress={handleInfoPress}
              onFolderPress={handleFolderPress}
              trickCompletionStates={trickCompletionStates}
              infoCompletionStates={infoCompletionStates}
            />
          )}
        </View>
      </View>

      {/* Modals */}
      <FolderModal
        isVisible={selectedFolderId !== null}
        onClose={() => setSelectedFolderId(null)}
        folderId={selectedFolderId || ""}
        trickCompletionStates={trickCompletionStates}
        onTrickSelect={handleTrickPress}
      />
      <TrickModal
        isVisible={selectedTrickId !== null}
        onClose={() => setSelectedTrickId(null)}
        trickId={selectedTrickId || ""}
        completionState={
          selectedTrickId ? trickCompletionStates[selectedTrickId] || 0 : 0
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
