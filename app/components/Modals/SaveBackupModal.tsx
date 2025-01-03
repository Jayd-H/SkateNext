import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as Clipboard from "expo-clipboard";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import Folder from "../../../assets/icons/full-folder.svg";
import Button from "../Generic/Button";
import DraggableModal from "../Generic/DraggableModal";
import { useHaptics } from "../Utils/useHaptics";

interface SaveBackupModalProps {
  isVisible: boolean;
  onClose: () => void;
  backupString: string;
  onLoadPress: () => void;
  zIndex?: number;
}

const SaveBackupModal: React.FC<SaveBackupModalProps> = ({
  isVisible,
  onClose,
  backupString,
  onLoadPress,
  zIndex = 1,
}) => {
  const { triggerHaptic } = useHaptics();
  const [copied, setCopied] = useState(false);

  const handleClose = async () => {
    await triggerHaptic("light");
    setCopied(false);
    onClose();
  };

  const handleCopyToClipboard = async () => {
    await triggerHaptic("light");
    await Clipboard.setStringAsync(backupString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadPress = async () => {
    await triggerHaptic("light");
    onLoadPress();
  };

  if (!isVisible) return null;

  return (
    <DraggableModal isVisible={isVisible} onClose={handleClose} zIndex={zIndex}>
      <View className="flex-1 flex-col justify-between">
        <ScrollView
          className="flex-1 px-6"
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row items-center justify-between mb-6">
            <TouchableOpacity
              onPress={handleClose}
              className="bg-bg-elevated p-3 rounded-2xl z-10"
            >
              <ChevronRight
                width={24}
                height={24}
                style={{ transform: [{ rotate: "180deg" }] }}
                fill="#4FEDE2"
              />
            </TouchableOpacity>
            <View className="absolute w-full">
              <Text className="text-xl text-text font-montserrat-alt-medium -mb-2 text-center">
                Save Progress
              </Text>
            </View>
          </View>

          <Text className="text-text-dim font-montserrat text-xs text-center mb-6">
            Save your progress by keeping this code safe, or screenshotting the
            QR code.
          </Text>

          <View className="items-center mb-6">
            <View className="bg-bg-surface p-4 rounded-2xl">
              <QRCode
                value={backupString}
                size={200}
                backgroundColor="#162120"
                color="#EEFFFE"
                ecl="H"
              />
            </View>
          </View>

          <View className="bg-bg-surface p-4 rounded-xl mb-6">
            <Text className="text-text-dim font-montserrat text-center mb-2">
              Backup Code
            </Text>
            <ScrollView
              horizontal
              className="mb-2"
              showsHorizontalScrollIndicator={false}
            >
              <Text className="text-text font-montserrat text-sm px-2">
                {backupString}
              </Text>
            </ScrollView>
            <View className="flex-row justify-center items-center mt-2">
              <TouchableOpacity
                onPress={handleCopyToClipboard}
                className="bg-bg-elevated px-4 py-2 rounded-lg flex-row items-center space-x-2"
              >
                <Folder
                  width={20}
                  height={20}
                  fill={copied ? "#22C55E" : "#4FEDE2"}
                />
                <Text className="text-text font-montserrat-medium">
                  {copied ? "Copied!" : "Copy Code"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View className="px-6 pb-12 pt-2 mt-auto">
          <Text className="text-text-dim font-montserrat text-xs text-center mb-2">
            Already have a backup? Restore your progress:
          </Text>
          <Button
            topText="LOAD FROM BACKUP"
            size="medium"
            onPress={handleLoadPress}
          />
        </View>
      </View>
    </DraggableModal>
  );
};

export default SaveBackupModal;
