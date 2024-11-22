import React from "react";
import { Tabs } from "expo-router";
import { View } from "react-native";
import FireIcon from "../../assets/icons/fire.svg";
import MapIcon from "../../assets/icons/map.svg";
import SettingsIcon from "../../assets/icons/settings.svg";

export default function TabLayout(): React.ReactElement {
  const iconSize: number = 28;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#131918",
          borderTopWidth: 1,
          borderTopColor: "#1B2524",
          height: 50,
          position: "relative",
        },
        tabBarShowLabel: false,
        tabBarItemStyle: {
          paddingVertical: 8,
        },
      }}
    >
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
      />
    </Tabs>
  );
}
