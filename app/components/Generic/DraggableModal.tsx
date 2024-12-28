import React from "react";
import { BlurView } from "expo-blur";
import { View, Dimensions, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

//* this file is a bit of a mess and could use some refactoring, dont know if this is the very most efficient way to do this
//* in future, i might delete this and genericmodal, combining the two functionalitys or something
//* it works for now and is a good start

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const SNAP_THRESHOLD = 0.3;
const SPRING_CONFIG = {
  damping: 20,
  mass: 1,
  stiffness: 200,
};
const OPEN_SPRING_CONFIG = {
  damping: 50,
  mass: 1,
  stiffness: 600,
};

interface DraggableModalProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
  height?: number | string | "auto";
  blurIntensity?: number;
  overlay?: React.ReactNode;
  zIndex?: number;
  dragFromHandle?: boolean;
}

const Handle: React.FC<{ isFullScreen: boolean }> = ({ isFullScreen }) => (
  <View
    className={`w-full items-center ${isFullScreen ? "mt-10" : "mt-4 mb-4"}`}
  >
    <View className="w-12 h-1 bg-accent-bright rounded-full opacity-50" />
  </View>
);

export const DraggableModal: React.FC<DraggableModalProps> = ({
  children,
  isVisible,
  onClose,
  height = "100%",
  blurIntensity = 30,
  overlay,
  zIndex = 1,
  dragFromHandle = false,
}) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const context = useSharedValue(0);

  const getModalHeight = () => {
    if (height === "auto") return "auto";
    if (typeof height === "string" && height.includes("%")) {
      return (SCREEN_HEIGHT * parseInt(height)) / 100;
    }
    return typeof height === "number" ? height : SCREEN_HEIGHT;
  };

  const modalHeight = getModalHeight();
  const isFullScreen =
    height === "100%" ||
    typeof height === "number" ||
    (typeof height === "string" && height.includes("%"));

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = translateY.value;
    })
    .onUpdate((event) => {
      translateY.value = Math.max(event.translationY + context.value, 0);
    })
    .onEnd((event) => {
      const threshold =
        modalHeight === "auto"
          ? SCREEN_HEIGHT * SNAP_THRESHOLD
          : modalHeight * SNAP_THRESHOLD;
      if (event.translationY > threshold) {
        translateY.value = withTiming(
          SCREEN_HEIGHT,
          {
            duration: 200,
            easing: Easing.out(Easing.ease),
          },
          () => {
            runOnJS(onClose)();
          }
        );
      } else {
        translateY.value = withSpring(0, SPRING_CONFIG);
      }
    });

  React.useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(0, OPEN_SPRING_CONFIG);
    } else {
      translateY.value = withTiming(SCREEN_HEIGHT, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!isVisible) return null;

  const renderContent = () => (
    <Animated.View
      style={[
        {
          position: "absolute",
          bottom: isFullScreen ? 0 : -20,
          left: 0,
          right: 0,
          ...(isFullScreen ? { top: 5 } : {}),
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          height: modalHeight === "auto" ? undefined : modalHeight,
          maxHeight: modalHeight === "auto" ? "90%" : undefined,
        },
        animatedStyle,
      ]}
      className="bg-bg-card"
    >
      {dragFromHandle ? (
        <>
          <GestureDetector gesture={gesture}>
            <View>
              <Handle isFullScreen={isFullScreen} />
            </View>
          </GestureDetector>
          <View className="flex-1">{children}</View>
        </>
      ) : (
        <>
          <Handle isFullScreen={isFullScreen} />
          <View className="flex-1">{children}</View>
        </>
      )}
    </Animated.View>
  );

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex,
      }}
    >
      <BlurView intensity={blurIntensity} tint="dark" style={{ flex: 1 }}>
        <Pressable onPress={onClose} style={{ flex: 1 }} />
        {dragFromHandle ? (
          renderContent()
        ) : (
          <GestureDetector gesture={gesture}>{renderContent()}</GestureDetector>
        )}
      </BlurView>
      {overlay}
    </View>
  );
};

export default DraggableModal;