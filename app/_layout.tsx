import { Stack } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  useEffect(() => {
    const initializeAppData = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");
        if (hasLaunched === null) {
          await AsyncStorage.setItem("hasLaunched", "true");
          await AsyncStorage.setItem(
            "appData",
            JSON.stringify({
              lastUpdated: new Date().toISOString(),
            })
          );
        }
      } catch (error) {
        console.error("Error initializing app data:", error);
      }
    };

    initializeAppData();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
    </Stack>
  );
}
