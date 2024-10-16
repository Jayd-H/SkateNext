import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ChevronRight from "../../assets/icons/chevron-right.svg";

const PAGES = ["1", "2", "3", "4"];

export default function Map() {
  const [currentPage, setCurrentPage] = useState(0);

  const changePage = (direction: number) => {
    setCurrentPage((prevPage) =>
      Math.max(0, Math.min(prevPage + direction, PAGES.length - 1))
    );
  };

  let white: string = "#EBEFEF";
  let grey: string = "#183C36";
  let iconsize: number = 18;

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
              width={iconsize}
              height={iconsize}
              style={{ transform: [{ rotate: "180deg" }] }}
              fill={currentPage === 0 ? grey : white}
              stroke={currentPage === 0 ? grey : white}
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
              width={iconsize}
              height={iconsize}
              fill={currentPage === PAGES.length - 1 ? grey : white}
              stroke={currentPage === PAGES.length - 1 ? grey : white}
              strokeWidth={1}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
