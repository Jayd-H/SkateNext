import React from "react";
import { Tabs } from "expo-router";
import FitnessIcon from "../../assets/icons/fire.svg";
import MapIcon from "../../assets/icons/map.svg"
import SettingsIcon from "../../assets/icons/settings.svg"

// TODO: icons dont change to the accent colour when selected

export default function TabLayout(): React.ReactElement {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0F1413",
          borderTopWidth: 0,
          height: 65,
        },
        tabBarActiveTintColor: "#34CDB3",
        tabBarInactiveTintColor: "#EBEFEF",
        tabBarLabelStyle: {
          fontFamily: "MontserratAlternates",
          fontSize: 12,
          marginBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="fitness"
        options={{
          title: "Fitness",
          tabBarIcon: ({ color }: { color: string }) => (
            <FitnessIcon height={28} width={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }: { color: string }) => (
            <MapIcon width={28} height={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }: { color: string }) => (
            <SettingsIcon height={28} width={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
