import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { RoleKey } from "../player-roles.types";
import { roleDistribution } from "../store/roleDistribution";
import { SafeAreaView } from "react-native-safe-area-context";

type NumberPlayerRoleItemType = {
  id: string;
  name: string;
  image: ImageSourcePropType;
  key: RoleKey;
};

type Props = {
  item: NumberPlayerRoleItemType;
  totalPlayers: number;
};
export default function NumberPlayerRoleItem({ item, totalPlayers }: Props) {
  const { width } = useWindowDimensions();
  const roleCount = roleDistribution[totalPlayers][item.key];
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.number}>{roleCount}</Text>
      </View>
      <Image
        source={require("../assets/role-assignement/role-separator.png")}
        style={styles.separator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    gap: 8,
  },
  image: {
    width: 70,
    height: 70,
  },
  infoContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  name: {
    color: "#CDB496",
    fontFamily: "SpecialElite",
    fontSize: 16,
  },
  number: {
    color: "#FF000C",
    fontFamily: "SpecialElite",
    fontSize: 32,
  },
  separator: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
