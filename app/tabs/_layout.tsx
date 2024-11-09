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
  let iconsize: number = 28;
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
              <FitnessIconActive width={iconsize} height={iconsize} />
            ) : (
              <FitnessIconInactive width={iconsize} height={iconsize} />
            ),
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MapIconActive width={iconsize} height={iconsize} />
            ) : (
              <MapIconInactive width={iconsize} height={iconsize} />
            ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SettingsIconActive width={iconsize} height={iconsize} />
            ) : (
              <SettingsIconInactive width={iconsize} height={iconsize} />
            ),
        }}
      />
    </Tabs>
  );
}
