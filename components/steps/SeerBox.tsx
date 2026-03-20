import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGameStore } from "../../store/gameStore";
import { Player } from "../../store/types";

export default function SeerBox() {
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const players = useGameStore((s) => s.players);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const usePoison = useGameStore((s) => s.usePoison);
  const [killBox, setKillBox] = useState(false);
  const [killSomeoneBox, setKillSomeoneBox] = useState(false);
  const nextStep = useGameStore((state) => state.nextStep);
  const useResurrection = useGameStore((state) => state.useResurrection);
  const hasResurrection = useGameStore(
    (state) => state.witchPotions.hasResurrection,
  );
  const hasPoison = useGameStore((state) => state.witchPotions.hasPoison);
  const [isSleeping, setIsSleeping] = useState(false);
  const witchPotions = useGameStore((state) => state.witchPotions);

  const targetedPlayer = useGameStore((state) =>
    state.players.find((p) => p.isTargetedByWerewolves),
  );
  const handleSave = () => {
    if (targetedPlayer && hasResurrection) {
      useResurrection(targetedPlayer.id);
      console.log(hasResurrection);
      nextStep();
    }
  };

  const handleNoSave = () => {
    console.log("witchPotions depuis le composant :", witchPotions);
    nextStep();
  };

  const handleFinalizeAction = () => {
    setSelectedPlayer(null);
    setIsSleeping(true);
    console.log("witchPotions depuis le composant :", witchPotions);
    nextStep();
  };
  const handleConfirmVote = () => {
    console.log(selectedPlayer);
    console.log(hasPoison);

    if (selectedPlayer && hasPoison) {
      usePoison(selectedPlayer.id);

      console.log(hasPoison);
      handleFinalizeAction();
    }
  };
  const SequenceText = ["La sorcière se réveille"];

  useEffect(() => {
    if (activeMessageIndex < SequenceText.length) {
      const timer = setTimeout(() => {
        setActiveMessageIndex((prevIndex) => prevIndex + 1);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [activeMessageIndex]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <SafeAreaView style={styles.safeContent}>
          <View style={styles.textcontainer}>
            {isSleeping ? (
              <Text style={styles.text}>La sorcière se rendort...</Text>
            ) : activeMessageIndex < SequenceText.length ? (
              <Text style={styles.text}>
                {SequenceText[activeMessageIndex]}
              </Text>
            ) : (
              <View style={styles.box}>
                <View style={styles.textBox}>
                  <Text style={styles.playerName}>{targetedPlayer?.name}</Text>
                  <Text style={styles.h1}>
                    a été tué par les loups. Voulez vous sauver cette personne ?
                  </Text>
                </View>
                <View style={{ flexDirection: "row", gap: 20 }}>
                  <TouchableOpacity
                    onPress={handleSave}
                    style={[styles.closeButton, { borderColor: "#FDE4C5" }]}
                  >
                    <Text
                      style={[styles.closeButtonText, { color: "#FDE4C5" }]}
                    >
                      Oui
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                      setKillBox(true);
                    }}
                  >
                    <Text style={styles.closeButtonText}>Non</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          {killBox && (
            <View style={styles.overlay}>
              <ImageBackground
                source={require("../../assets/background.png")}
                resizeMode="cover"
                style={styles.backgroundBox}
              >
                <View style={styles.box}>
                  <View style={styles.textBox}>
                    <Text style={styles.h1}>
                      Voulez-vous éliminer quelqu'un ?
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: 20 }}>
                    <TouchableOpacity
                      onPress={() => {
                        setKillSomeoneBox(true);
                      }}
                      style={[styles.closeButton, { borderColor: "#FDE4C5" }]}
                    >
                      <Text
                        style={[styles.closeButtonText, { color: "#FDE4C5" }]}
                      >
                        Oui
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={handleNoSave}
                    >
                      <Text style={styles.closeButtonText}>Non</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            </View>
          )}
          {killSomeoneBox && (
            <View style={styles.overlay}>
              <ImageBackground
                source={require("../../assets/background.png")}
                resizeMode="cover"
                style={styles.backgroundBox}
              >
                <View style={styles.box}>
                  <FlatList
                    data={players}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }: { item: Player }) => {
                      const isDisabled =
                        !!item.isTargetedByWerewolves ||
                        item.status === "dead" ||
                        item.role === "witch";
                      const isFilled = !!item.name;
                      const isWitch = item.role === "witch";

                      return (
                        <TouchableOpacity
                          style={[
                            styles.card,
                            isDisabled && { opacity: 0.4 },
                            isWitch && styles.witchBorder,
                          ]}
                          disabled={isDisabled}
                          onPress={() => {
                            setSelectedPlayer(item);
                          }}
                        >
                          <ImageBackground
                            source={require("../../assets/background-card.png")}
                            style={styles.cardBackground}
                            imageStyle={{ borderRadius: 12 }}
                          >
                            {isFilled && (
                              <Text style={styles.CardPlayerName}>
                                {item.name}
                              </Text>
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
                  />
                </View>
              </ImageBackground>
            </View>
          )}
          {selectedPlayer && (
            <View style={styles.overlay}>
              <ImageBackground
                source={require("../../assets/background.png")}
                resizeMode="cover"
                style={styles.backgroundBox}
              >
                <Text style={styles.h1}>
                  Etes-vous sûr de vouloir voter pour {selectedPlayer.name}
                </Text>
                <View style={{ flexDirection: "row", gap: 20 }}>
                  <TouchableOpacity
                    style={[styles.closeButton, { borderColor: "#FDE4C5" }]}
                    onPress={() => {
                      handleConfirmVote();
                      console.log("click");
                    }}
                  >
                    <Text
                      style={[styles.closeButtonText, { color: "#FDE4C5" }]}
                    >
                      Confirmer
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setSelectedPlayer(null)}
                  >
                    <Text style={styles.closeButtonText}>Annuler</Text>
                  </TouchableOpacity>
                </View>
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
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  textcontainer: {
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  h1: {
    color: "#FDE4C5",
    fontFamily: "Cotton",
    fontSize: 32,
    textTransform: "uppercase",
    textAlign: "center",
  },
  playerName: {
    color: "#FF000C",
    fontFamily: "Cotton",
    fontSize: 32,
  },
  text: {
    color: "#CDB496",
    fontFamily: "SpecialElite",
    fontSize: 16,
    textAlign: "center",
  },
  textBox: {
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
  box: {
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
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
  backgroundBox: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
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
  CardPlayerName: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    color: "#fff",
    fontSize: 18,
    fontFamily: "SpecialElite",
    textAlign: "center",
  },
  witchBorder: {
    borderColor: "#CF000A", // Rouge
    borderWidth: 5,
  },
});
