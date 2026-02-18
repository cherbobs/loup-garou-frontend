import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { usePathname, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, StyleSheet, Text, Image } from "react-native";
import { useEffect } from "react";
import {
  useFonts,
  SpecialElite_400Regular,
} from "@expo-google-fonts/special-elite";
import CustomHeader from "../components/CustomHeader";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    SpecialElite: SpecialElite_400Regular,
    Cotton: require("../assets/fonts/Cotton-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="PlayerRoleChoices"
            options={{
              headerShown: true,
              headerTransparent: true,
              headerShadowVisible: false,
              header: () => <CustomHeader title="Nombre de joueurs" />,
            }}
          />

          <Stack.Screen
            name="CardsChoices"
            options={{
              headerShown: true,
              headerTransparent: true,
              headerShadowVisible: false,
              header: () => <CustomHeader title="Choix des cartes" />,
            }}
          />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
