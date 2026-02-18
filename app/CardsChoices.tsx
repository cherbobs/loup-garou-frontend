import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGameStore } from "../store/gameStore";
import { router } from "expo-router";

export default function CardsChoices() {
  const [showBox, setShowBox] = useState(false);
  const headerHeight = useHeaderHeight();
  const totalPlayers = useGameStore((s) => s.totalPlayers);
  const playersArray = Array.from({ length: totalPlayers }, (_, i) => ({
    id: i.toString(),
  }));

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
          <View style={styles.textcontainer}>
            <Text style={styles.h1}>Choisis une carte</Text>
            <Text style={styles.text}>et passe à ton voisin</Text>
          </View>
          <FlatList
            data={playersArray}
            keyExtractor={(item) => item.id}
            renderItem={() => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => setShowBox(true)}
              >
                <ImageBackground
                  source={require("../assets/background-card.png")}
                  style={styles.cardBackground}
                  imageStyle={{ borderRadius: 12 }}
                ></ImageBackground>
              </TouchableOpacity>
            )}
            numColumns={2}
            contentContainerStyle={{
              alignItems: "center",
              paddingBottom: 120,
            }}
          />
          {showBox && (
            <View style={styles.overlay}>
              <ImageBackground
                source={require("../assets/background.png")}
                resizeMode="cover"
                style={styles.backgroundBox}
              >
                <Text style={styles.boxText}>Ceci est un rectangle bleu !</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowBox(false)}
                >
                  <Text style={styles.closeButtonText}>Fermer</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          )}
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
    flexDirection: "column",
    gap: 36,
  },
  textcontainer: {
    gap: 4,
  },
  h1: {
    color: "#FF000C",
    fontFamily: "Cotton",
    fontSize: 48,
    textTransform: "uppercase",
    textAlign: "center",
  },
  text: {
    color: "#CDB496",
    fontFamily: "SpecialElite",
    fontSize: 16,
    textAlign: "center",
  },
  card: {
    width: 160,
    height: 190,
    borderWidth: 3,
    borderColor: "#3A0000",
    borderRadius: 12,
    margin: 12,
  },
  cardBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  backgroundBox: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  boxText: {
    color: "white",
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 6,
  },
  closeButtonText: {
    color: "blue",
    fontWeight: "bold",
  },
});
