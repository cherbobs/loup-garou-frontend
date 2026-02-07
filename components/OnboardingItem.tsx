import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router } from "expo-router";

type OnboardingItemType = {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
  button: string;
};

type Props = {
  item: OnboardingItemType;
};
export default function OnboardingItem({ item }: Props) {
  const { width, height } = useWindowDimensions();

  return (
    <View style={[styles.container, { width, height }]}>
      <View style={styles.logoText}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          {item.description ? (
            <Text style={styles.text}>{item.description}</Text>
          ) : null}
          {item.id === "3" && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.replace("/PlayerRoleChoices")}
            >
              <Text style={styles.buttonText}>{item.button}</Text>
              <Image
                source={require("../assets/get-started.png")}
                style={{ width: 16, height: 12 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative", // chaque item prend toute la place
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    resizeMode: "cover",
  },
  logoText: {
    position: "absolute",
    bottom: 100,
    gap: 24,
    alignItems: "center",
  },
  title: {
    color: "#FF000C",
    fontFamily: "SpecialElite",
    fontSize: 24,
  },
  text: {
    color: "#CDB496",
    fontFamily: "SpecialElite",
    fontSize: 20,
  },
  textContainer: {
    gap: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row", // ⚡ aligne les enfants sur une ligne
    alignItems: "center", // ⚡ centre verticalement
    justifyContent: "center",
    gap: 10,
  },
  buttonText: {
    color: "#CDB496",
    fontFamily: "SpecialElite",
    fontSize: 18,
  },
});
