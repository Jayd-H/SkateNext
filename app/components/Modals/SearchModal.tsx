import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import MagnifyingGlass from "../../../assets/icons/magnifying-glass.svg";
import { TRICK_DATA, Trick } from "../Data/trickData";
import ModalTrickButton from "../Generic/ModalTrickButton";
import DraggableModal from "../Generic/DraggableModal";

interface SearchModalProps {
  isVisible: boolean;
  onClose: () => void;
  onTrickSelect: (trickId: string) => void;
  trickCompletionStates: Record<string, number>;
}

const calculateLevenshteinDistance = (str1: string, str2: string): number => {
  const matrix: number[][] = [];
  for (let i = 0; i <= str1.length; i++) matrix[i] = [i];
  for (let j = 0; j <= str2.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str1.length][str2.length];
};

const hasExactMatch = (
  searchStr: string,
  name: string,
  altNames: string | undefined
): boolean => {
  const search = searchStr.toLowerCase().trim();
  const mainName = name.toLowerCase().trim();

  if (mainName === search) return true;

  if (altNames) {
    const altNamesList = altNames.split(",").map((n) => n.toLowerCase().trim());
    return altNamesList.includes(search);
  }

  return false;
};

const calculateSimilarity = (str1: string, str2: string): number => {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();

  const distance = calculateLevenshteinDistance(s1, s2);
  const maxLength = Math.max(s1.length, s2.length);

  return 1 - distance / maxLength;
};

const scoreTrick = (trick: Trick, query: string): number => {
  if (hasExactMatch(query, trick.name, trick.alt_names)) {
    return 1000;
  }

  let maxScore = calculateSimilarity(trick.name, query);

  if (trick.alt_names) {
    const altNamesList = trick.alt_names.split(",");
    for (const altName of altNamesList) {
      const score = calculateSimilarity(altName, query);
      maxScore = Math.max(maxScore, score);
    }
  }

  return maxScore;
};

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

  useEffect(() => {
    if (!isVisible) {
      setSearchQuery("");
    }
  }, [isVisible]);

  useEffect(() => {
    const filterTricks = () => {
      if (searchQuery.trim() === "") {
        setSearchResults(TRICK_DATA.slice(0, 6));
        return;
      }

      const scoredTricks = TRICK_DATA.map((trick) => ({
        trick,
        score: scoreTrick(trick, searchQuery.trim()),
      }));

      const filteredTricks = scoredTricks
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(({ trick }) => trick);

      setSearchResults(filteredTricks);
    };

    filterTricks();
  }, [searchQuery]);

  if (!isVisible) return null;

  return (
    <DraggableModal isVisible={isVisible} onClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <View className="px-6 pt-4 flex-1">
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
              {searchResults.length > 0 ? (
                searchResults.map((trick) => (
                  <ModalTrickButton
                    key={trick.id}
                    name={trick.name}
                    altNames={trick.alt_names}
                    difficulty={trick.difficulty}
                    completionState={trickCompletionStates[trick.id]}
                    onPress={() => onTrickSelect(trick.id)}
                  />
                ))
              ) : (
                <View>
                  <Text className="text-text-muted font-montserrat text-2xl text-center mt-4">
                    :/
                  </Text>
                  <Text className="text-text-dim font-montserrat-medium text-center mt-4">
                    No tricks found, try another search
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </DraggableModal>
  );
};

export default SearchModal;
