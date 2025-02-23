import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "@/config/language/i18n";

export default function RootLayout() {
  const [loaded] = useFonts({
    SukhumvitSet: require("../assets/fonts/SukhumvitSet-Text.ttf"),
    SukhumvitSetBold: require("../assets/fonts/SukhumvitSet-Bold.ttf"),
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
