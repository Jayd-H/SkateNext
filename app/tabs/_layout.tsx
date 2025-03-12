import React, { useEffect } from "react";
import { Tabs, useRouter } from "expo-router";
import { BackHandler } from "react-native";
import FireIcon from "../../assets/icons/fire.svg";
import MapIcon from "../../assets/icons/map.svg";
import SettingsIcon from "../../assets/icons/settings.svg";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { useHaptics } from "../components/Utils/useHaptics";
import { useNavigationHistory } from "../components/Utils/navigationHistoryContext";

export default function TabLayout(): React.ReactElement {
  const iconSize: number = 28;
  const { triggerHaptic } = useHaptics();
  const router = useRouter();
  const { goBack } = useNavigationHistory();

  const handleTabPress = async () => {
    await triggerHaptic("light");
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        const previousTab = goBack();
        if (previousTab) {
          if (previousTab === "fitness") {
            router.replace("/tabs/fitness");
          } else if (previousTab === "map") {
            router.replace("/tabs/map");
          } else if (previousTab === "settings") {
            router.replace("/tabs/settings");
          }
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [router, goBack]);

  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: "#131918",
      borderTopWidth: 1,
      borderTopColor: "#1B2524",
      height: 50,
      position: "relative" as const,
    },
    tabBarShowLabel: false,
    tabBarItemStyle: {
      paddingVertical: 8,
    },
  };

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="fitness"
        options={{
          tabBarIcon: ({ focused }) => (
            <FireIcon
              width={iconSize}
              height={iconSize}
              fill={focused ? "#2A9E8A" : "#7A9E9B"}
            />
          ),
        }}
        listeners={{
          tabPress: handleTabPress,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: ({ focused }) => (
            <MapIcon
              width={iconSize}
              height={iconSize}
              fill={focused ? "#2A9E8A" : "#7A9E9B"}
            />
          ),
        }}
        listeners={{
          tabPress: handleTabPress,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <SettingsIcon
              width={iconSize}
              height={iconSize}
              fill={focused ? "#2A9E8A" : "#7A9E9B"}
            />
          ),
        }}
        listeners={{
          tabPress: handleTabPress,
        }}
      />
    </Tabs>
  );
}
