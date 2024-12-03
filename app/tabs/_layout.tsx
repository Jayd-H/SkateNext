import React from "react";
import { Tabs } from "expo-router";
import { ViewStyle } from "react-native";
import * as Haptics from "expo-haptics";
import FireIcon from "../../assets/icons/fire.svg";
import MapIcon from "../../assets/icons/map.svg";
import SettingsIcon from "../../assets/icons/settings.svg";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

export default function TabLayout(): React.ReactElement {
  const iconSize: number = 28;

  const handleTabPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

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
          unmountOnBlur: true,
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
