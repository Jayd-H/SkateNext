import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ChevronRight from "../../assets/icons/chevron-right.svg";
import Act1Grid from "../components/Act1Grid";

const PAGES = ["1", "2", "3", "4"];

export default function Map() {
  const [currentPage, setCurrentPage] = useState(0);

  const changePage = (direction: number) => {
    setCurrentPage((prevPage) =>
      Math.max(0, Math.min(prevPage + direction, PAGES.length - 1))
    );
  };

  const handleTrickPress = (id: string) => {
    console.log(`Trick pressed: ${id}`);
    // TODO: Open modal with trick information from CSV
  };

  const handleInfoPress = (id: string) => {
    console.log(`Info pressed: ${id}`);
    // TODO: Open modal with manually written info
  };

  const handleBossPress = (id: string) => {
    console.log(`Boss pressed: ${id}`);
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
            />
          )}
          {/* Add other acts here when you create them */}
        </View>
      </View>
    </View>
  );
}
