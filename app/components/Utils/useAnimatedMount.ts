import { useCallback, useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  WithSpringConfig,
  runOnJS,
} from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";

//* there is some jank to this file, but its pretty cool cos i love animations and making super generic hooks like this lol

interface UseAnimatedMountProps {
  delay?: number;
  duration?: number;
  springConfig?: WithSpringConfig;
  translateY?: number;
  playOnFocus?: boolean;
  mountOnly?: boolean;
}

export const mountConfigs = {
  fast: {
    duration: 200,
    springConfig: {
      damping: 8,
      mass: 0.5,
      stiffness: 100,
    },
  },
  normal: {
    duration: 300,
    springConfig: {
      damping: 10,
      mass: 0.7,
      stiffness: 100,
    },
  },
  bouncy: {
    duration: 400,
    springConfig: {
      damping: 5,
      mass: 0.5,
      stiffness: 100,
    },
  },
} as const;

export const useAnimatedMount = ({
  delay = 0,
  duration = 300,
  springConfig = {
    damping: 8,
    mass: 0.5,
    stiffness: 100,
  },
  translateY = 20,
  playOnFocus = false,
  mountOnly = false,
}: UseAnimatedMountProps = {}) => {
  const opacity = useSharedValue(mountOnly ? 1 : 0);
  const translation = useSharedValue(mountOnly ? 0 : translateY);

  const resetAnimation = useCallback(() => {
    if (!mountOnly) {
      opacity.value = 0;
      translation.value = translateY;

      requestAnimationFrame(() => {
        setTimeout(() => {
          opacity.value = withTiming(1, { duration });
          translation.value = withSpring(0, springConfig);
        }, delay);
      });
    }
  }, [delay, duration, mountOnly]);

  useEffect(() => {
    if (!mountOnly) {
      resetAnimation();
    }
  }, []);

  const animateOut = useCallback(
    (onComplete?: () => void) => {
      opacity.value = withTiming(0, { duration: duration / 2 });
      translation.value = withSpring(translateY, springConfig, (finished) => {
        if (finished && onComplete) {
          runOnJS(onComplete)();
        }
      });
    },
    [duration, translateY]
  );

  useFocusEffect(
    useCallback(() => {
      if (playOnFocus && !mountOnly) {
        resetAnimation();
      }
      return () => {
        if (playOnFocus) {
          opacity.value = 0;
          translation.value = translateY;
        }
      };
    }, [playOnFocus, mountOnly])
  );

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translation.value }],
  }));

  return {
    animatedStyle: {
      ...animatedStyle,
      ...(!mountOnly && !playOnFocus ? { opacity: 0 } : {}),
    },
    resetAnimation,
    animateOut,
  };
};
