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
import { useGameStore } from "../../store/gameStore";
import { router } from "expo-router";

export default function SeerBox() {
  const headerHeight = useHeaderHeight();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <SafeAreaView
          style={[styles.safeContent, { paddingTop: headerHeight / 2 }]}
        >
          <View style={styles.textcontainer}>
            <Text style={styles.text}>Seer</Text>
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
