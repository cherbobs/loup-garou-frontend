import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGameStore } from "../store/gameStore";
import StepRenderer from "../components/StepRenderer";

export default function CardsChoices() {
  const headerHeight = useHeaderHeight();
  const phase = useGameStore((state) => state.phase);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <SafeAreaView
          style={[styles.safeContent, { paddingTop: headerHeight / 2 }]}
        >
          <StepRenderer />
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
    flexDirection: "column",
  },
});
