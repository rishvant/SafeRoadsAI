import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SnackbarProvider } from "@/context/SnackbarContext";
import { AuthService } from "@/services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const pathname = usePathname();

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [pathname]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SnackbarProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {isLoggedIn && (
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          )}
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="report" options={{ headerShown: false }} />
          <Stack.Screen
            name="registerReport"
            options={{ title: "Register a New Report", headerShown: true }}
          />
          <Stack.Screen
            name="reportHistory"
            options={{ title: "Report History", headerShown: true }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
