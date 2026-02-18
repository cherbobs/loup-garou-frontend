import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CardsChoices() {
  const headerHeight = useHeaderHeight();
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
          <View style={styles.liste}>
            <View style={styles.card}></View>
            <View style={styles.card}></View>
            <View style={styles.card}></View>
            <View style={styles.card}></View>
            <View style={styles.card}></View>
            <View style={styles.card}></View>
            <View style={styles.card}></View>
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
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 12,
  },
  liste: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
});
