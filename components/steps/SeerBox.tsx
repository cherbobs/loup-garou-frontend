import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import roleAssignmentData from "../../data/data-role-assignement";
import RoleAssignmentItem from "../RoleAssignmentItem";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGameStore } from "../../store/gameStore";
import { Player } from "../../store/types";

export default function SeerBox() {
  const [showRoleBox, setShowRoleBox] = useState(false);

  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const nextStep = useGameStore((s) => s.nextStep);
  const players = useGameStore((s) => s.players);
  const [isSleeping, setIsSleeping] = useState(false);
  const SequenceText = ["La voyante se réveille", "Qui veux-tu sonder ?"];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedPlayer = selectedIndex !== null ? players[selectedIndex] : null;

  const handleSave = () => {};
  useEffect(() => {
    if (activeMessageIndex < SequenceText.length) {
      const timer = setTimeout(() => {
        setActiveMessageIndex((prevIndex) => prevIndex + 1);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [activeMessageIndex]);

  const handleFinalizeAction = () => {
    setIsSleeping(true);

    setTimeout(() => {
      nextStep();
    }, 5000);
  };
  const roleItem = selectedPlayer?.role
    ? roleAssignmentData.find((item) => item.key === selectedPlayer.role)
    : null;

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
              <Text style={styles.text}>La voyante se rendort...</Text>
            ) : activeMessageIndex < SequenceText.length ? (
              <Text style={styles.text}>
                {SequenceText[activeMessageIndex]}
              </Text>
            ) : (
              <FlatList
                data={players}
                keyExtractor={(item) => item.id}
                renderItem={({
                  item,
                  index,
                }: {
                  item: Player;
                  index: number;
                }) => {
                  const isFilled = !!item.name;
                  const isDisabled =
                    item.status === "dead" || item.role === "seer";
                  const isSeer = item.role === "seer";

                  return (
                    <TouchableOpacity
                      style={[
                        styles.card,
                        isDisabled && { opacity: 0.4 },
                        isSeer && styles.seerBorder,
                      ]}
                      disabled={isDisabled}
                      onPress={() => {
                        setSelectedIndex(index);
                        setShowRoleBox(true);
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
            {showRoleBox && (
              <View style={styles.overlay}>
                <ImageBackground
                  source={require("../../assets/background.png")}
                  resizeMode="cover"
                  style={styles.backgroundBox}
                >
                  {roleItem && <RoleAssignmentItem item={roleItem} />}

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                      setShowRoleBox(false);
                      setSelectedIndex(null);
                      handleFinalizeAction();
                    }}
                  >
                    <Text style={styles.closeButtonText}>Fermer</Text>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            )}
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  textcontainer: {
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
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
  h1: {
    color: "#FDE4C5",
    fontFamily: "Cotton",
    fontSize: 32,
    textTransform: "uppercase",
    textAlign: "center",
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
  seerBorder: {
    borderColor: "#CF000A",
    borderWidth: 3,
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
});
