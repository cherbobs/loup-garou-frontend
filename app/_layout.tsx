import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { usePathname, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, StyleSheet, Text, Image } from "react-native";
import { useEffect } from "react";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/"); // fallback vers l'accueil
    }
  };

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
              headerTitleAlign: "center",

              headerStyle: {
                backgroundColor: colorScheme === "dark" ? "#0A0000" : "#fff",
              },
              header: () => (
                <View
                  style={{
                    height: 120,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 24,
                    paddingVertical: 10,
                    marginTop: 24,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                    }}
                  >
                    <Pressable onPress={handleBack} style={{ marginRight: 12 }}>
                      <Ionicons
                        name="arrow-back-outline"
                        size={20}
                        color={"#FDE4C5"}
                      />
                    </Pressable>
                    <Text
                      style={{
                        color: "#FDE4C5",
                        fontSize: 18,
                        fontFamily: "SpecialElite",
                      }}
                    >
                      Nombre de joueurs
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 44,
                        height: 44,
                        borderColor: "#CF000A",
                        borderWidth: 0.5,
                        borderRadius: 60,
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 49.55,
                        shadowRadius: 4.79,
                        elevation: 5, // Android
                      }}
                    >
                      <Image
                        source={require("../assets/settings-icon.png")}
                        style={{ width: 18, height: 18 }}
                      />
                    </View>
                  </View>
                </View>
              ),
            }}
          />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
