import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import NumberPlayerRole from "../components/NumberPlayerRole";
import { router } from "expo-router";
import { useGameStore } from "../store/gameStore";

export default function PlayerRoleChoices() {
  const headerHeight = useHeaderHeight();
  const MIN = 8;
  const MAX = 18;

  const totalPlayers = useGameStore((s) => s.totalPlayers);
  const setTotalPlayers = useGameStore((s) => s.setTotalPlayers);
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
                <TouchableOpacity
                  onPress={() =>
                    setTotalPlayers(Math.max(MIN, totalPlayers - 1))
                  }
                  disabled={totalPlayers === MIN}
                >
                  <Image
                    source={require("../assets/minus.png")}
                    style={{
                      width: 40,
                      height: 48,
                      opacity: totalPlayers === MIN ? 0.4 : 1,
                    }}
                  />
                </TouchableOpacity>

                <Text style={styles.h1}>{totalPlayers}</Text>

                <TouchableOpacity
                  onPress={() =>
                    setTotalPlayers(Math.min(MAX, totalPlayers + 1))
                  }
                  disabled={totalPlayers === MAX}
                >
                  <Image
                    source={require("../assets/plus.png")}
                    style={{
                      width: 40,
                      height: 48,
                      opacity: totalPlayers === MAX ? 0.4 : 1,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <NumberPlayerRole totalPlayers={totalPlayers} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/CardsChoices")}
          >
            <Image
              source={require("../assets/right-arrow.png")}
              style={{
                width: 12,
                height: 8,
              }}
            />
            <Text style={styles.textButton}>Commencer la partie</Text>
            <Image
              source={require("../assets/left-arrow.png")}
              style={{
                width: 12,
                height: 8,
              }}
            />
          </TouchableOpacity>
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
    gap: 28,
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
  button: {
    flexDirection: "row",
    gap: 12,
    bottom: 36,
    backgroundColor: "#1A0100",
    borderColor: "#CF000A",
    borderWidth: 0.5,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  textButton: {
    color: "#CF000A",
    fontFamily: "SpecialElite",
    fontSize: 12,
  },
});
