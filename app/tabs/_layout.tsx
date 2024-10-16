import React from "react";
import { Tabs } from "expo-router";

// this is NOT the most optimal way to do this, but for now i will allow it
// on the plus side its slightly more performant :)
import FitnessIconActive from "../../assets/icons/fire-active.svg";
import FitnessIconInactive from "../../assets/icons/fire-inactive.svg";
import MapIconActive from "../../assets/icons/map-active.svg";
import MapIconInactive from "../../assets/icons/map-inactive.svg";
import SettingsIconActive from "../../assets/icons/settings-active.svg";
import SettingsIconInactive from "../../assets/icons/settings-inactive.svg";

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
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FitnessIconActive width={28} height={28} />
            ) : (
              <FitnessIconInactive width={28} height={28} />
            ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MapIconActive width={28} height={28} />
            ) : (
              <MapIconInactive width={28} height={28} />
            ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SettingsIconActive width={28} height={28} />
            ) : (
              <SettingsIconInactive width={28} height={28} />
            ),
        }}
      />
    </Tabs>
  );
}
