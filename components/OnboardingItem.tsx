import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import React from "react";

type OnboardingItemType = {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
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
          <Text style={styles.text}>{item.description}</Text>
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
});
