import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Slider from "@react-native-community/slider";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import ProgressIndicator from "./ProgressIndicator";
import BackgroundWave from "./BackgroundWave";
import WelcomeAnimation from "./WelcomeAnimation";
import LoadBackupModal from "../Modals/LoadBackupModal";
import Button from "../Generic/Button";

interface AgeSelectorProps {
  onComplete: (age: number) => void;
  onBack?: () => void;
  initialAge?: number;
}

class WelcomeState {
  static hasShownWelcome = false;
}

const AgeSelector: React.FC<AgeSelectorProps> = ({
  onComplete,
  onBack,
  initialAge = 18,
}) => {
  const [age, setAge] = useState<number>(initialAge);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(initialAge.toString());
  const [showWelcome, setShowWelcome] = useState(!WelcomeState.hasShownWelcome);
  const [showLoadBackup, setShowLoadBackup] = useState(false);
  const scale = useSharedValue(1);
  const router = useRouter();

  const handleInputComplete = () => {
    const newValue = parseInt(inputValue);
    if (!isNaN(newValue) && newValue >= 8 && newValue <= 80) {
      setAge(newValue);
    } else {
      setInputValue(age.toString());
    }
    setIsEditing(false);
  };

  const handleWelcomeComplete = () => {
    WelcomeState.hasShownWelcome = true;
    setShowWelcome(false);
  };

  const handleNext = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 300,
    });
    setTimeout(() => {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 300,
      });
    }, 100);
    onComplete(age);
  };

  const handleSliderChange = (value: number) => {
    const roundedValue = Math.round(value);
    if (roundedValue !== age) {
      setAge(roundedValue);
    }
  };

  const handleBackupLoad = async (backupString: string) => {
    setShowLoadBackup(false);
    router.replace("/tabs/map");
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View className="flex-1 bg-background">
      <BackgroundWave variant="age" />
      <View className="mt-8">
        <ProgressIndicator
          currentStep="age"
          onStepPress={(step) => {
            if (step === "age" && onBack) {
              onBack();
            }
          }}
        />
      </View>

      <View className="absolute top-24 w-full px-8">
        <Button
          topText="LOAD BACKUP"
          size="medium"
          variant="default"
          onPress={() => setShowLoadBackup(true)}
        />
      </View>

      <View className="flex-1 justify-center items-center px-8">
        <Animated.View
          style={animatedStyle}
          className="items-center -mt-12 mb-16"
        >
          <Text className="text-text-muted font-montserrat-light text-xl mb-2">
            Your age
          </Text>
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            {isEditing ? (
              <TextInput
                className="text-accent-bright font-montserrat-alt-bold text-7xl"
                value={inputValue}
                onChangeText={setInputValue}
                keyboardType="numeric"
                autoFocus
                onBlur={handleInputComplete}
                onSubmitEditing={handleInputComplete}
                maxLength={2}
              />
            ) : (
              <Text className="text-accent-bright font-montserrat-alt-bold text-7xl">
                {age}
              </Text>
            )}
          </TouchableOpacity>
        </Animated.View>
        <View className="w-full px-4">
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={8}
            maximumValue={80}
            step={1}
            value={age}
            onValueChange={handleSliderChange}
            minimumTrackTintColor="#34CDB3"
            maximumTrackTintColor="#1D7267"
            thumbTintColor="#4FEDE2"
          />
          <View className="flex-row justify-between mt-2 px-2">
            <Text className="text-text-dim font-montserrat-light text-sm">
              8
            </Text>
            <Text className="text-text-dim font-montserrat-light text-sm">
              80
            </Text>
          </View>
        </View>
        <Pressable
          onPress={handleNext}
          className="absolute bottom-12 right-8 bg-bg-elevated border-2 border-accent-bright rounded-2xl p-3"
        >
          <ChevronRight width={24} height={24} fill="#4FEDE2" />
        </Pressable>
      </View>

      <LoadBackupModal
        isVisible={showLoadBackup}
        onClose={() => setShowLoadBackup(false)}
        onLoad={handleBackupLoad}
        zIndex={2}
      />

      {showWelcome && <WelcomeAnimation onComplete={handleWelcomeComplete} />}
    </View>
  );
};

export default AgeSelector;
