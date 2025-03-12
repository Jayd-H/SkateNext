import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { CameraView, Camera } from "expo-camera";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import CameraIcon from "../../../assets/icons/photo-camera.svg";
import Button from "../Generic/Button";
import DraggableModal from "../Generic/DraggableModal";
import { useHaptics } from "../Utils/useHaptics";
import { StorageService } from "../Utils/StorageService";

interface LoadBackupModalProps {
  isVisible: boolean;
  onClose: () => void;
  onLoad: (backupString: string) => void | Promise<void>;
  zIndex?: number;
}

const LoadBackupModal: React.FC<LoadBackupModalProps> = ({
  isVisible,
  onClose,
  onLoad,
  zIndex = 1,
}) => {
  const { triggerHaptic } = useHaptics();
  const [backupCode, setBackupCode] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScannerPress = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
    if (status === "granted") {
      setShowScanner(true);
    }
  };

  const handleBarcodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    await triggerHaptic("light");
    setBackupCode(data);
    setShowScanner(false);
    setError(null);
  };

  const handleClose = async () => {
    await triggerHaptic("light");
    setBackupCode("");
    setShowScanner(false);
    setError(null);
    onClose();
  };

  const handleLoad = async () => {
    if (!backupCode.trim()) {
      setError("Please enter a backup code");
      return;
    }

    try {
      await triggerHaptic("light");
      if (!StorageService.validateBackupString(backupCode)) {
        setError("Invalid backup code format");
        return;
      }
      setError(null);
      await onLoad(backupCode);
      setBackupCode("");
    } catch (error) {
      await triggerHaptic("heavy");
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to load backup");
      }
    }
  };

  const handlePaste = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      if (text) {
        setBackupCode(text);
        setError(null);
      }
    } catch (error) {
      console.error("Failed to paste from clipboard:", error);
    }
  };

  if (!isVisible) return null;

  if (showScanner) {
    return (
      <DraggableModal
        isVisible={isVisible}
        onClose={() => setShowScanner(false)}
        dragFromHandle={true}
        zIndex={zIndex}
      >
        <View className="flex-1">
          <CameraView
            onBarcodeScanned={handleBarcodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            style={{ flex: 1 }}
          />
          <View className="absolute bottom-0 w-full p-6">
            <Button
              topText="CANCEL SCAN"
              size="medium"
              onPress={() => setShowScanner(false)}
            />
          </View>
        </View>
      </DraggableModal>
    );
  }

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
                Load Progress
              </Text>
            </View>
          </View>

          <Text className="text-text-dim font-montserrat text-center mb-6 mt-6 text-xs">
            Enter your backup code or scan a QR code to restore your progress.
          </Text>

          <View className="bg-bg-surface p-4 rounded-xl">
            <ScrollView
              className="bg-bg-elevated rounded-xl mb-2 max-h-84"
              keyboardShouldPersistTaps="handled"
            >
              <TextInput
                className="px-4 py-3 text-text font-montserrat text-sm min-h-[48px]"
                placeholder="Paste your backup code..."
                placeholderTextColor="#7A9E9B"
                value={backupCode}
                onChangeText={(text) => {
                  setBackupCode(text);
                  setError(null);
                }}
                autoCapitalize="none"
                multiline
              />
            </ScrollView>

            <View className="flex-row justify-center space-x-3 mb-2">
              <TouchableOpacity
                onPress={handlePaste}
                className="bg-bg-elevated px-4 py-2 rounded-lg flex-1"
              >
                <Text className="text-text font-montserrat-medium text-center">
                  Paste from Clipboard
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleScannerPress}
                className="bg-bg-elevated p-2 rounded-lg"
              >
                <CameraIcon width={24} height={24} fill="#4FEDE2" />
              </TouchableOpacity>
            </View>

            {error && (
              <Text className="text-red-500 font-montserrat text-center mt-2">
                {error}
              </Text>
            )}
          </View>
        </ScrollView>

        <View className="px-6 pb-12 pt-2 mt-auto">
          <Button
            topText="LOAD PROGRESS"
            size="medium"
            onPress={handleLoad}
            disabled={!backupCode.trim()}
          />
        </View>
      </View>
    </DraggableModal>
  );
};

export default LoadBackupModal;
