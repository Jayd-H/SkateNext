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
import ModalTrickButton from "../Generic/ModalTrickButton";

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

  return (
    <BlurView intensity={30} tint="dark" style={blurViewStyle}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Animated.View
          style={[animatedStyle]}
          className="bg-bg-card h-full rounded-t-3xl pt-12"
        >
          <View className="px-6 flex-1">
            <View className="w-12 h-1 bg-accent-bright rounded-full mb-2 self-center opacity-50" />
            <View className="flex-row justify-between items-center mb-6">
              <TouchableOpacity
                onPress={onClose}
                className="bg-bg-elevated p-3 rounded-2xl"
              >
                <ChevronRight
                  width={24}
                  height={24}
                  style={{ transform: [{ rotate: "180deg" }] }}
                  fill="#4FEDE2"
                />
              </TouchableOpacity>
              <Text className="text-xl text-text font-montserrat-alt-medium flex-1 ml-4">
                Search a Trick
              </Text>
            </View>

            <View className="flex-row items-center bg-bg-elevated border border-accent-dark rounded-2xl py-3 px-4 mb-6">
              <MagnifyingGlass width={16} height={16} fill="#4FEDE2" />
              <TextInput
                className="flex-1 text-text font-montserrat-medium px-3"
                placeholder="Enter a trick name"
                placeholderTextColor="#7A9E9B"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
            </View>

            <View className="flex-1">
              {/* Background glow effect */}
              <View
                className="absolute inset-0 rounded-3xl opacity-10"
                style={{
                  backgroundColor: "#183C36",
                  shadowColor: "#34CDB3",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.3,
                  shadowRadius: 20,
                }}
              />

              <View className="space-y-4">
                {searchResults.map((trick) => (
                  <ModalTrickButton
                    key={trick.id}
                    name={trick.name}
                    altNames={trick.alt_names}
                    difficulty={trick.difficulty}
                    completionState={trickCompletionStates[trick.id]}
                    onPress={() => onTrickSelect(trick.id)}
                  />
                ))}
              </View>
            </View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </BlurView>
  );
};

export default SearchModal;
