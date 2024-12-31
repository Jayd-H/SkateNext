import { useMemo } from "react";

//* theres a lot of customisability i made here, just for most things to share the same values anyways

export const useModalTheme = (difficulty: string) => {
  return useMemo(() => {
    const difficultyNum = parseInt(difficulty, 10);
    if (difficultyNum === 11) {
      return {
        colors: ["#131918", "#162120", "#131918"] as const,
        animationVariant: "king",
        accentColor: "#4FEDE2",
        backgroundColor: "#131918",
        hasGradient: true,
        hasBackgroundIcons: true,
        iconOpacity: 1,
        iconColor: "#162120",
        waveSpeed: 2400,
        glowIntensity: 1,
      };
    }

    const themeLevel = Math.floor((difficultyNum - 1) / 2);

    const iconColor: string = "#162120";

    const themes = {
      0: {
        colors: ["#131918"] as const,
        animationVariant: "basic",
        accentColor: "#4FEDE2",
        backgroundColor: "#131918",
        hasGradient: false,
        hasBackgroundIcons: false,
        iconOpacity: 0,
        iconColor: iconColor,
        waveSpeed: 0,
        glowIntensity: 0,
      },
      1: {
        colors: ["#131918", "#162120", "#131918"] as const,
        animationVariant: "enhanced",
        accentColor: "#4FEDE2",
        backgroundColor: "#131918",
        hasGradient: true,
        hasBackgroundIcons: true,
        iconOpacity: 0.5,
        iconColor: iconColor,
        waveSpeed: 3600,
        glowIntensity: 0.2,
      },
      2: {
        colors: ["#131918", "#162120", "#131918"] as const,
        animationVariant: "advanced",
        accentColor: "#4FEDE2",
        backgroundColor: "#131918",
        hasGradient: true,
        hasBackgroundIcons: true,
        iconOpacity: 1,
        iconColor: iconColor,
        waveSpeed: 800,
        glowIntensity: 0.4,
      },
      3: {
        colors: ["#131918", "#162120", "#131918"] as const,
        animationVariant: "expert",
        accentColor: "#34CDB3",
        backgroundColor: "#131918",
        hasGradient: true,
        hasBackgroundIcons: true,
        iconOpacity: 1,
        iconColor: iconColor,
        waveSpeed: 1200,
        glowIntensity: 0.6,
      },
      4: {
        colors: ["#131918", "#162120", "#131918"] as const,
        animationVariant: "master",
        accentColor: "#34CDB3",
        backgroundColor: "#131918",
        hasGradient: true,
        hasBackgroundIcons: true,
        iconOpacity: 1,
        iconColor: iconColor,
        waveSpeed: 1800,
        glowIntensity: 0.8,
      },
    };

    return themes[themeLevel as keyof typeof themes] || themes[0];
  }, [difficulty]);
};

export type ModalTheme = ReturnType<typeof useModalTheme>;
