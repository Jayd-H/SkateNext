import { useEffect } from "react";
import {
  useSharedValue,
  withRepeat,
  withSpring,
  withSequence,
  withDelay,
} from "react-native-reanimated";
import { ModalTheme } from "./useModalTheme";

export const useAnimations = (theme: ModalTheme, isVisible: boolean) => {
  const waveValues = Array.from({ length: 6 }, () => useSharedValue(1));
  const glowOpacity = useSharedValue(0.2);

  useEffect(() => {
    if (isVisible && theme.waveSpeed > 0) {
      waveValues.forEach((value, index) => {
        value.value = withDelay(
          index * (theme.waveSpeed / 12),
          withRepeat(
            withSequence(
              withSpring(1.05, {
                damping: 6,
                stiffness: 40,
                mass: 1,
                restDisplacementThreshold: 0.01,
              }),
              withSpring(1, {
                damping: 6,
                stiffness: 40,
                mass: 1,
                restDisplacementThreshold: 0.01,
              })
            ),
            -1,
            true
          )
        );
      });
    }

    return () => {
      waveValues.forEach((value) => {
        value.value = 1;
      });
      glowOpacity.value = 0;
    };
  }, [isVisible, theme]);

  return {
    waveValues,
    glowOpacity,
  };
};
