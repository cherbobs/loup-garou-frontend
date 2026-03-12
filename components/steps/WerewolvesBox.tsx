//components.steps/WerewolvesBox.tsx
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { useGameStore } from "../../store/gameStore";
import { router } from "expo-router";
import { Player } from "../../store/types";

export default function WerewolvesBox() {
  const headerHeight = useHeaderHeight();

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const nextStep = useGameStore((s) => s.nextStep);
  const players = useGameStore((s) => s.players);
  const setTargetedPlayer = useGameStore((s) => s.setTargetedPlayer);
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);

  const SequenceText = [
    "Le village s'endort...",
    "Les loups-garoups se réveillent",
    "Qui voulez-vous éliminer cette nuit ?",
  ];
  useEffect(() => {
    if (activeMessageIndex < SequenceText.length) {
      const timer = setTimeout(() => {
        setActiveMessageIndex((prevIndex) => prevIndex + 1);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [activeMessageIndex]);

  const handleConfirmVote = () => {
    if (selectedPlayer) {
      setTargetedPlayer(selectedPlayer.id);

      setSelectedPlayer(null);

      nextStep();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.textcontainer}>
        {activeMessageIndex < SequenceText.length ? (
          <Text style={styles.text}>{SequenceText[activeMessageIndex]}</Text>
        ) : (
          <FlatList
            data={players}
            keyExtractor={(item) => item.id}
            renderItem={({ item }: { item: Player }) => {
              const isFilled = !!item.name;

              return (
                <TouchableOpacity
                  style={[styles.card]}
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
          />
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
                  style={[styles.closeButton, { borderColor: "#00CF0A" }]}
                  onPress={handleConfirmVote}
                >
                  <Text style={[styles.closeButtonText, { color: "#00CF0A" }]}>
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
      </View>
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
  text: {
    color: "#CDB496",
    fontFamily: "SpecialElite",
    fontSize: 16,
    textAlign: "center",
  },
  h1: {
    color: "#FF000C",
    fontFamily: "Cotton",
    fontSize: 48,
    textTransform: "uppercase",
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

  closeButton: {
    backgroundColor: "#1A0100",
    borderColor: "#CF000A",
    borderWidth: 0.5,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 12,
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
  closeButtonText: {
    color: "#CF000A",
    fontFamily: "SpecialElite",
    fontSize: 12,
  },
});
