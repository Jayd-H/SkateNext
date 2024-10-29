import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ChevronRight from "../../assets/icons/chevron-right.svg";
import Act1Grid from "../components/Act1Grid";
import TrickModal from "../components/TrickModal";
import InfoModal from "../components/InfoModal";

const PAGES = ["1", "2", "3", "4"];

export default function Map() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTrickId, setSelectedTrickId] = useState<string | null>(null);
  const [selectedInfoId, setSelectedInfoId] = useState<string | null>(null);
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
    // TODO: this modal will be the same as the trick modal but maybe with like a fire svg in the background or something
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
        <Text className="text-xl text-text font-montserrat-light mt-10">
          M A P
        </Text>
        <View className="flex-row items-center justify-between mt-2 w-48">
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
              fill={currentPage === PAGES.length - 1 ? "#183C36" : "#EBEFEF"}
              stroke={currentPage === PAGES.length - 1 ? "#183C36" : "#EBEFEF"}
              strokeWidth={1}
            />
          </TouchableOpacity>
        </View>
        <View className="flex-1 w-full mt-4">
          {currentPage === 0 && (
            <Act1Grid
              onBossPress={handleBossPress}
              onTrickPress={handleTrickPress}
              onInfoPress={handleInfoPress}
              trickCompletionStates={trickCompletionStates}
              infoCompletionStates={infoCompletionStates}
            />
          )}
        </View>
      </View>
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
