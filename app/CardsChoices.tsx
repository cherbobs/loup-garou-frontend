import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React from "react";

export default function CardsChoices() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <Text>CardsChoices</Text>
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
});
