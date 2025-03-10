import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import DraggableModal from "../Generic/DraggableModal";

interface GenericModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode | string;
  zIndex?: number;
}

const GenericModal: React.FC<GenericModalProps> = React.memo(
  ({ isVisible, onClose, title, content, zIndex = 1 }) => {
    const renderContent = React.useCallback(() => {
      if (typeof content === "string") {
        return (
          <Text className="text-text-dim font-montserrat leading-6">
            {content.split("\n").map((text, index, array) => (
              <React.Fragment key={index}>
                {text}
                {index !== array.length - 1 && "\n"}
              </React.Fragment>
            ))}
          </Text>
        );
      }
      return content;
    }, [content]);

    if (!isVisible) return null;

    return (
      <DraggableModal
        isVisible={isVisible}
        onClose={onClose}
        zIndex={zIndex}
        dragFromHandle
      >
        <View className="p-6 flex-1">
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
              {title}
            </Text>
          </View>
          <ScrollView
            className="flex-1 px-2 mb-6"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
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
            {renderContent()}
          </ScrollView>
        </View>
      </DraggableModal>
    );
  }
);

GenericModal.displayName = "GenericModal";

export default GenericModal;
