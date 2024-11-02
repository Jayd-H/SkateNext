import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import MagnifyingGlass from "../../../assets/icons/magnifying-glass.svg";
import { TRICK_DATA, Trick } from "../Data/trickData";

interface SearchModalProps {
  isVisible: boolean;
  onClose: () => void;
  onTrickSelect: (trickId: string) => void;
  trickCompletionStates: Record<string, number>;
}

const SearchModal: React.FC<SearchModalProps> = ({
  isVisible,
  onClose,
  onTrickSelect,
  trickCompletionStates,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Trick[]>(
    TRICK_DATA.slice(0, 6)
  );
  const translateY = useSharedValue(1000);

  useEffect(() => {
    if (isVisible) {
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.exp),
      });
    } else {
      translateY.value = withTiming(1000, {
        duration: 300,
        easing: Easing.in(Easing.exp),
      });
      setSearchQuery("");
    }
  }, [isVisible]);

  useEffect(() => {
    const filterTricks = () => {
      if (searchQuery.trim() === "") {
        setSearchResults(TRICK_DATA.slice(0, 5));
        return;
      }

      const query = searchQuery.toLowerCase();
      const filtered = TRICK_DATA.filter(
        (trick) =>
          trick.name.toLowerCase().includes(query) ||
          (trick.alt_names && trick.alt_names.toLowerCase().includes(query))
      ).slice(0, 5);

      setSearchResults(filtered);
    };

    filterTricks();
  }, [searchQuery]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  if (!isVisible) return null;

  const blurViewStyle: ViewStyle = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  const handleTrickPress = (trickId: string) => {
    onTrickSelect(trickId);
  };

  return (
    <BlurView intensity={30} tint="dark" style={blurViewStyle}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Animated.View
          style={[animatedStyle]}
          className="bg-background h-full pt-12"
        >
          <View className="px-6 flex-1">
            <View className="flex-row justify-between items-center mb-6">
              <TouchableOpacity onPress={onClose} className="p-2">
                <ChevronRight
                  width={24}
                  height={24}
                  style={{ transform: [{ rotate: "180deg" }] }}
                  fill="#EBEFEF"
                />
              </TouchableOpacity>
              <Text className="text-xl text-text font-montserrat-alt flex-1 ml-4">
                Search a Trick
              </Text>
            </View>

            <View className="flex-row items-center border-b border-accent-2 rounded-xl mx-4 py-1 px-4 mb-6">
              <MagnifyingGlass width={16} height={16} />
              <TextInput
                className="flex-1 text-text font-montserrat px-3"
                placeholder="Enter a trick name"
                placeholderTextColor="#A5ABAB"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
            </View>

            <View className="flex-1">
              {searchResults.map((trick) => (
                <TouchableOpacity
                  key={trick.id}
                  onPress={() => handleTrickPress(trick.id)}
                  className={`bg-buttonbg border h-[72px] justify-center ${
                    trickCompletionStates[trick.id] === 2
                      ? "border-green shadow-green"
                      : trickCompletionStates[trick.id] === 1
                      ? "border-yellow shadow-yellow"
                      : "border-red shadow-red"
                  } rounded-xl p-4 mb-3`}
                >
                  <Text className="text-base text-text font-montserrat-alt">
                    {trick.name}
                  </Text>
                  <Text className="text-xs text-grey font-montserrat mt-1">
                    {trick.alt_names || " "}
                    {""}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </BlurView>
  );
};

export default SearchModal;
