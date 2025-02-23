import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "@/config/language/i18n";
SplashScreen.preventAutoHideAsync();

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
        <Stack.Screen
          name="SelectLanguagePage"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="DisclaimerPage" options={{ headerShown: false }} />
        <Stack.Screen name="LoginPage" options={{ headerShown: false }} />
        <Stack.Screen name="OtpRequestPage" options={{ headerShown: false }} />
        <Stack.Screen name="OtpPage" options={{ headerShown: false }} />
        <Stack.Screen name="PinCodePage" options={{ headerShown: false }} />
        <Stack.Screen name="TouchIdPage" options={{ headerShown: false }} />
        <Stack.Screen name="HomePage" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
