import { ImageBackground, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";

export default function PlayerRoleChoices() {
  const headerHeight = useHeaderHeight();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <SafeAreaView
          style={[styles.safeContent, { paddingTop: headerHeight / 1.5 }]}
        >
          <View style={styles.choosing_player}>
            <View style={styles.select_number_player}>
              <Text style={styles.h4}>Total de joueurs</Text>
              <View style={styles.changing_number}>
                <Image
                  source={require("../assets/minus.png")}
                  style={{ width: 40, height: 48 }}
                />
                <Text style={styles.h1}>12</Text>
                <Image
                  source={require("../assets/plus.png")}
                  style={{ width: 40, height: 48 }}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  safeContent: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 20,
  },
  choosing_player: {
    borderColor: "#CF000A",
    borderWidth: 0.5,
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 44,
    paddingVertical: 24,
  },
  select_number_player: {
    flexDirection: "column",
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  h4: {
    color: "#CF000A",
    fontFamily: "SpecialElite",
    fontSize: 12,
    width: "100%",
  },
  changing_number: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  h1: {
    color: "#FF000C",
    fontFamily: "SpecialElite",
    fontSize: 56,
  },
});
