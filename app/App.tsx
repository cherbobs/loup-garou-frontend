import { StatusBar } from "expo-status-bar";
import { ImageBackground, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  SpecialElite_400Regular,
} from "@expo-google-fonts/special-elite";
import Onboarding from "../components/Onboarding";

export default function App() {
  const [fontsLoaded] = useFonts({
    SpecialElite: SpecialElite_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
       <ImageBackground
        source={require("../assets/intro.gif")}
        resizeMode="cover"
        style={styles.background}
      >
        <StatusBar style="auto" />
        <Onboarding/>
      </ImageBackground> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1, // 🔑 ImageBackground prend tout l'espace dispo
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    position: "absolute",
    bottom: 100,
    gap: 24,
    display: "flex",
    alignItems: "center",
  },
  text: {
    color: "#FF000C",
    fontFamily: "SpecialElite",
    fontSize: 24,
  },
});
