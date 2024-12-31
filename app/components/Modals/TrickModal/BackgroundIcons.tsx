import React from "react";
import { View } from "react-native";
import Gyroscope from "../../../../assets/icons/gyroscope.svg";
import Emerald from "../../../../assets/icons/emerald.svg";
import Gems from "../../../../assets/icons/gems.svg";
import Minerals from "../../../../assets/icons/minerals.svg";
import FireGem from "../../../../assets/icons/fire-gem.svg";
import { ModalTheme } from "./useModalTheme";

const ICON_CONFIG = {
  SIZE: 300,
  OFFSET: 150,
};

const difficultyMap = {
  basic: 1,
  enhanced: 3,
  advanced: 5,
  expert: 7,
  master: 9,
  king: 11,
};

const BackgroundIcons = ({ theme }: { theme: ModalTheme }) => {
  const getIconForLevel = () => {
    const difficultyNum =
      difficultyMap[theme.animationVariant as keyof typeof difficultyMap] || 0;

    switch (true) {
      case difficultyNum === 11:
        return FireGem;
      case difficultyNum >= 9:
        return Minerals;
      case difficultyNum >= 7:
        return Gems;
      case difficultyNum >= 5:
        return Emerald;
      case difficultyNum >= 3:
        return Gyroscope;
      default:
        return null;
    }
  };

  const Icon = getIconForLevel();
  if (!Icon) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          opacity: theme.iconOpacity,
        }}
      >
        <View
          style={{
            position: "absolute",
            left: -ICON_CONFIG.OFFSET,
            top: 100,
          }}
        >
          <Icon
            width={ICON_CONFIG.SIZE}
            height={ICON_CONFIG.SIZE}
            fill={theme.iconColor}
            style={{ transform: [{ scaleX: -1 }] }}
          />
        </View>
        <View
          style={{
            position: "absolute",
            right: -ICON_CONFIG.OFFSET,
            top: 300,
          }}
        >
          <Icon
            width={ICON_CONFIG.SIZE}
            height={ICON_CONFIG.SIZE}
            fill={theme.iconColor}
          />
        </View>
      </View>
    </View>
  );
};

export default React.memo(BackgroundIcons);
