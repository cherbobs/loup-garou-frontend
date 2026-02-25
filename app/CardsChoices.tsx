import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGameStore } from "../store/gameStore";

export default function CardsChoices() {
  const headerHeight = useHeaderHeight();

  const [showBox, setShowBox] = useState(false);
  const [showRoleBox, setShowRoleBox] = useState(false);
  const [text, setText] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const initPlayers = useGameStore((s) => s.initPlayers);
  const players = useGameStore((s) => s.players);
  const setPlayerName = useGameStore((s) => s.setPlayerName);

  useEffect(() => {
    initPlayers();
  }, []);
  console.log(players);
  const allPlayersReady = players.every(
    (player) => player.name && player.name.trim() !== ""
  );
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
            data={players}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => {
              const isFilled = !!item.name;

              return (
                <TouchableOpacity
                  style={[styles.card, isFilled && { opacity: 0.4 }]}
                  disabled={isFilled}
                  onPress={() => {
                    setSelectedIndex(index);
                    setShowBox(true);
                  }}
                >
                  <ImageBackground
                    source={require("../assets/background-card.png")}
                    style={styles.cardBackground}
                    imageStyle={{ borderRadius: 12 }}
                  >
                    {isFilled && (
                      <Text style={styles.playerName}>{item.name}</Text>
                    )}
                  </ImageBackground>
                </TouchableOpacity>
              );
            }}
            numColumns={2}
            contentContainerStyle={{
              alignItems: "center",
              paddingBottom: 120,
            }}
            ListFooterComponent={
              <TouchableOpacity
                style={[styles.button, !allPlayersReady && { opacity: 0.4 }]}
                disabled={!allPlayersReady}
                onPress={() => {
                  if (allPlayersReady) {
                    console.log("Start game");
                  }
                }}
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
            }
          />

          {showBox && (
            <View style={styles.overlay}>
              <ImageBackground
                source={require("../assets/background.png")}
                resizeMode="cover"
                style={styles.backgroundBox}
              >
                <Text style={styles.h1}>Entre ton nom</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Prénom"
                  value={text}
                  onChangeText={setText}
                  placeholderTextColor="#6F6457"
                />

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    if (selectedIndex !== null && text.trim()) {
                      setPlayerName(selectedIndex, text.trim());
                    }

                    setText("");
                    setShowBox(false); // ferme la première box
                    setShowRoleBox(true); // ouvre la RoleBox
                  }}
                >
                  <Text style={styles.closeButtonText}>Valider</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          )}
          {showRoleBox && (
            <View style={styles.overlay}>
              <ImageBackground
                source={require("../assets/background.png")}
                resizeMode="cover"
                style={styles.backgroundBox}
              >
                <Text style={styles.h1}>Choisis ton rôle</Text>

                {/* Exemple simple */}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    setShowRoleBox(false);
                  }}
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
    gap: 16,
  },

  boxText: {
    color: "white",
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#1A0100",
    borderColor: "#CF000A",
    borderWidth: 0.5,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  closeButtonText: {
    color: "#CF000A",
    fontFamily: "SpecialElite",
    fontSize: 12,
  },
  input: {
    height: 40,
    width: "75%",
    paddingHorizontal: 10,
    marginVertical: 10,
    color: "#FDE4C5",
    borderBottomWidth: 1,
    borderBottomColor: "#FDE4C5",
  },
  playerName: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    color: "#fff",
    fontSize: 18,
    fontFamily: "SpecialElite",
    textAlign: "center",
  },

  button: {
    marginTop: 30,
    marginBottom: 40,
    flexDirection: "row",
    gap: 12,
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
