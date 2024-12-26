import { useEffect, useState } from "react";
import * as Haptics from "expo-haptics";
import { StorageService } from "./StorageService";

export function useHaptics() {
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    loadHapticsState();
  }, []);

  const loadHapticsState = async () => {
    const enabled = await StorageService.getHapticsEnabled();
    setIsEnabled(enabled);
  };

  const triggerHaptic = async (
    type: "light" | "medium" | "heavy" = "light"
  ) => {
    const enabled = await StorageService.getHapticsEnabled();
    if (!enabled) return;

    switch (type) {
      case "light":
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case "medium":
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case "heavy":
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
    }
  };

  const toggleHaptics = async () => {
    const newState = !isEnabled;
    await StorageService.setHapticsEnabled(newState);
    setIsEnabled(newState);
  };

  return { isEnabled, triggerHaptic, toggleHaptics };
}
