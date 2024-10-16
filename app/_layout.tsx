import React, { useCallback, useEffect } from "react";
import { View, SafeAreaView, StatusBar } from "react-native";
import { Slot } from "expo-router";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Layout(): React.ReactElement | null {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Montserrat: require("../assets/fonts/Montserrat/Montserrat-Regular.ttf"),
        "Montserrat-Light": require("../assets/fonts/Montserrat/Montserrat-Light.ttf"),
        "Montserrat-Medium": require("../assets/fonts/Montserrat/Montserrat-Medium.ttf"),
        "Montserrat-SemiBold": require("../assets/fonts/Montserrat/Montserrat-SemiBold.ttf"),
        "Montserrat-Bold": require("../assets/fonts/Montserrat/Montserrat-Bold.ttf"),
        "Montserrat-Italic": require("../assets/fonts/Montserrat/Montserrat-Italic.ttf"),
        "Montserrat-LightItalic": require("../assets/fonts/Montserrat/Montserrat-LightItalic.ttf"),
        "Montserrat-MediumItalic": require("../assets/fonts/Montserrat/Montserrat-MediumItalic.ttf"),
        "Montserrat-SemiBoldItalic": require("../assets/fonts/Montserrat/Montserrat-SemiBoldItalic.ttf"),
        "Montserrat-BoldItalic": require("../assets/fonts/Montserrat/Montserrat-BoldItalic.ttf"),
        MontserratAlternates: require("../assets/fonts/Montserrat_Alternates/MontserratAlternates-Regular.ttf"),
        "MontserratAlternates-Light": require("../assets/fonts/Montserrat_Alternates/MontserratAlternates-Light.ttf"),
        "MontserratAlternates-Medium": require("../assets/fonts/Montserrat_Alternates/MontserratAlternates-Medium.ttf"),
        "MontserratAlternates-SemiBold": require("../assets/fonts/Montserrat_Alternates/MontserratAlternates-SemiBold.ttf"),
        "MontserratAlternates-Bold": require("../assets/fonts/Montserrat_Alternates/MontserratAlternates-Bold.ttf"),
        "MontserratAlternates-Italic": require("../assets/fonts/Montserrat_Alternates/MontserratAlternates-Italic.ttf"),
        "MontserratAlternates-LightItalic": require("../assets/fonts/Montserrat_Alternates/MontserratAlternates-LightItalic.ttf"),
        "MontserratAlternates-MediumItalic": require("../assets/fonts/Montserrat_Alternates/MontserratAlternates-MediumItalic.ttf"),
        "MontserratAlternates-SemiBoldItalic": require("../assets/fonts/Montserrat_Alternates/MontserratAlternates-SemiBoldItalic.ttf"),
        "MontserratAlternates-BoldItalic": require("../assets/fonts/Montserrat_Alternates/MontserratAlternates-BoldItalic.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  useEffect(() => {
    (async () => {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return;
      }
    })();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: "#0F1413" }}
      onLayout={onLayoutRootView}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0F1413" />
      <SafeAreaView style={{ flex: 1 }}>
        <Slot />
      </SafeAreaView>
    </View>
  );
}
