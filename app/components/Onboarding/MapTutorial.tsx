import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { StorageService } from "../Utils/StorageService";
import { useHaptics } from "../Utils/useHaptics";
import InfoIcon from "../../../assets/icons/info.svg";

interface TutorialStep {
  spotlightPosition: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  textBoxPosition: {
    x: number;
    y: number;
  };
  isCircle: boolean;
  title: string;
  description: string;
  scrollToBottom?: boolean;
}

//! this file is quite a mess, could be cleaned up but life is too short

const tutorialSteps: TutorialStep[] = [
  {
    spotlightPosition: { x: 51, y: 8, width: 48, height: 6 },
    textBoxPosition: { x: 50, y: 30 },
    isCircle: false,
    title: "Act Navigation",
    description:
      "Trick groups are split into acts that you can navigate through, each with its own set of tricks harder than the last set.",
  },
  {
    spotlightPosition: { x: 10, y: 8, width: 12, height: 6 },
    textBoxPosition: { x: 40, y: 30 },
    isCircle: true,
    title: "Recommendations",
    description:
      "Tap this button to get personalised trick recommendations based on the ones you can already do.",
  },
  {
    spotlightPosition: { x: 93, y: 8, width: 14, height: 7 },
    textBoxPosition: { x: 60, y: 30 },
    isCircle: true,
    title: "Trick Search",
    description: "Search for specific tricks to learn or track your progress.",
  },
  {
    spotlightPosition: { x: 23.5, y: 32, width: 24, height: 16 },
    textBoxPosition: { x: 50, y: 50 },
    isCircle: true,
    title: "Info Button",
    description:
      "Relays general information related to this point in progression.",
  },
  {
    spotlightPosition: { x: 25, y: 82, width: 32, height: 16 },
    textBoxPosition: { x: 40, y: 50 },
    isCircle: false,
    title: "Trick Nodes",
    description:
      "Tap on any trick button on the map to see details on that trick and to track your progress with it.",
  },
  {
    spotlightPosition: { x: 75, y: 70, width: 32, height: 16 },
    textBoxPosition: { x: 40, y: 40 },
    isCircle: false,
    title: "Folder Nodes",
    description:
      "Collections of related tricks grouped together for navigation within the map.",
  },
  {
    spotlightPosition: { x: 50, y: 85, width: 90, height: 20 },
    textBoxPosition: { x: 50, y: 50 },
    isCircle: false,
    title: "Boss Tricks",
    description:
      "A difficult trick that is the penultimate challenge of the act and serves as the final trick to complete for the section.",
    scrollToBottom: true,
  },
];

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface MapTutorialProps {
  actScrollViewRef?: React.RefObject<any>;
}

const MapTutorial: React.FC<MapTutorialProps> = ({ actScrollViewRef }) => {
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const { triggerHaptic } = useHaptics();
  const [currentStep, setCurrentStep] = useState(0);

  const opacity = useSharedValue(0);
  const spotlightX = useSharedValue(0);
  const spotlightY = useSharedValue(0);
  const spotlightWidth = useSharedValue(0);
  const spotlightHeight = useSharedValue(0);

  useEffect(() => {
    checkTutorialStatus();
  }, []);

  const checkTutorialStatus = async () => {
    try {
      const isCompleted = await StorageService.isMapTutorialCompleted();
      setShowTutorial(!isCompleted);
      setIsLoading(false);
    } catch (error) {
      console.error("Error checking tutorial status:", error);
      setIsLoading(false);
    }
  };

  const completeTutorial = async () => {
    try {
      await StorageService.completeMapTutorial();
      setShowTutorial(false);
    } catch (error) {
      console.error("Error completing tutorial:", error);
    }
  };

  useEffect(() => {
    if (showTutorial && !isLoading) {
      opacity.value = withTiming(1, { duration: 300 });
      moveToStep(currentStep);
    }
  }, [showTutorial, isLoading]);

  useEffect(() => {
    handleScrollForStep();
  }, [currentStep]);

  const handleScrollForStep = () => {
    const step = tutorialSteps[currentStep];
    if (!step) return;

    if (actScrollViewRef?.current) {
      if (step.scrollToBottom) {
        opacity.value = withTiming(0, { duration: 200 });

        setTimeout(() => {
          actScrollViewRef.current?.scrollToEnd({ animated: true });

          setTimeout(() => {
            opacity.value = withTiming(1, { duration: 300 });
          }, 500);
        }, 300);
      } else if (
        currentStep > 0 &&
        tutorialSteps[currentStep - 1]?.scrollToBottom
      ) {
        opacity.value = withTiming(0, { duration: 200 });

        setTimeout(() => {
          actScrollViewRef.current?.scrollTo({ y: 0, animated: true });

          setTimeout(() => {
            opacity.value = withTiming(1, { duration: 300 });
          }, 500);
        }, 300);
      }
    }
  };

  const moveToStep = (stepIndex: number) => {
    const step = tutorialSteps[stepIndex];
    if (!step) return;

    const { x, y, width, height } = step.spotlightPosition;

    const newX = (x / 100) * SCREEN_WIDTH - ((width / 100) * SCREEN_WIDTH) / 2;
    const newY =
      (y / 100) * SCREEN_HEIGHT - ((height / 100) * SCREEN_HEIGHT) / 2;
    const newWidth = (width / 100) * SCREEN_WIDTH;
    const newHeight = (height / 100) * SCREEN_HEIGHT;

    spotlightX.value = withTiming(newX, {
      duration: 400,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    spotlightY.value = withTiming(newY, {
      duration: 400,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    spotlightWidth.value = withTiming(newWidth, {
      duration: 400,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    spotlightHeight.value = withTiming(newHeight, {
      duration: 400,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  const handleFinishTutorial = () => {
    if (actScrollViewRef?.current) {
      actScrollViewRef.current.scrollTo({ y: 0, animated: true });
    }

    setTimeout(() => {
      completeTutorial();
    }, 300);
  };

  const handleNextStep = async () => {
    await triggerHaptic("light");

    if (currentStep < tutorialSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      moveToStep(nextStep);
    } else {
      opacity.value = withTiming(0, { duration: 300 }, () => {
        runOnJS(handleFinishTutorial)();
      });
    }
  };

  const handleSkipTutorial = async () => {
    await triggerHaptic("light");

    opacity.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(handleFinishTutorial)();
    });
  };

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const topMaskStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: spotlightY.value,
      backgroundColor: "rgba(15, 20, 19, 0.85)",
      zIndex: 9,
    };
  });

  const bottomMaskStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: spotlightY.value + spotlightHeight.value,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(15, 20, 19, 0.85)",
      zIndex: 9,
    };
  });

  const leftMaskStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: spotlightY.value,
      left: 0,
      width: spotlightX.value,
      height: spotlightHeight.value,
      backgroundColor: "rgba(15, 20, 19, 0.85)",
      zIndex: 9,
    };
  });

  const rightMaskStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: spotlightY.value,
      left: spotlightX.value + spotlightWidth.value,
      right: 0,
      height: spotlightHeight.value,
      backgroundColor: "rgba(15, 20, 19, 0.85)",
      zIndex: 9,
    };
  });

  const spotlightStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: spotlightX.value,
      top: spotlightY.value,
      width: spotlightWidth.value,
      height: spotlightHeight.value,
      borderWidth: 2,
      borderColor: "#34CDB3",
      backgroundColor: "transparent",
      zIndex: 10,
      borderRadius: tutorialSteps[currentStep]?.isCircle ? 1000 : 12,
    };
  });

  const getTextBoxPosition = () => {
    const step = tutorialSteps[currentStep];
    if (!step) return {};

    const { x, y } = step.textBoxPosition;

    return {
      position: "absolute" as const,
      top: (y / 100) * SCREEN_HEIGHT - 60,
      left: (x / 100) * SCREEN_WIDTH - 125,
      width: 250,
    };
  };

  if (!showTutorial || isLoading) return null;

  const step = tutorialSteps[currentStep];

  const iconSize = 22;

  return (
    <View style={styles.fullScreenContainer}>
      <Animated.View style={[styles.fullScreenContainer, containerStyle]}>
        <Animated.View style={topMaskStyle} />
        <Animated.View style={bottomMaskStyle} />
        <Animated.View style={leftMaskStyle} />
        <Animated.View style={rightMaskStyle} />

        <Animated.View style={spotlightStyle} />

        <View style={[styles.textBox, getTextBoxPosition()]}>
          <View className="flex-row justify-between">
            <Text className="font-montserrat-alt-medium tracking-widest text-base text-text mb-2">
              {step.title}
            </Text>
            <InfoIcon width={iconSize} height={iconSize} fill="#2A9E8A" />
          </View>
          <Text className="font-montserrat text-sm text-text-muted mb-4">
            {step.description}
          </Text>

          <View className="flex-row justify-between items-center">
            <TouchableOpacity
              onPress={handleSkipTutorial}
              className="bg-bg-elevated py-2 px-3 rounded-lg"
            >
              <Text className="font-montserrat-medium text-sm text-text-dim">
                Skip Tutorial
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNextStep}
              className="bg-accent-dark py-2 px-4 rounded-lg"
            >
              <Text className="font-montserrat-medium text-sm text-text">
                {currentStep < tutorialSteps.length - 1 ? "Next" : "Done"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.touchArea}
          activeOpacity={1}
          onPress={handleNextStep}
        >
          <View />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: 9999,
  },
  textBox: {
    backgroundColor: "#162120",
    borderWidth: 2,
    borderColor: "#1D7267",
    borderRadius: 16,
    padding: 16,
    zIndex: 30,
  },
  touchArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
  },
});

export default MapTutorial;
