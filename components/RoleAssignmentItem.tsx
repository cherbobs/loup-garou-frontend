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
import { PlayerRoleAssignment } from "../data/data-role-assignement";

type RoleAssignmentItemType = {
  id: string;
  key: RoleKey;
  image: any;
  name: string;
  description: string;
};

type Props = {
  item: RoleAssignmentItemType;
};
export default function RoleAssignmentItem({ item }: Props) {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.number}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  image: {
    width: 340,
    height: 440,
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    gap: 24,
    marginHorizontal: 24,
  },
  name: {
    color: "#FF000C",
    fontFamily: "SpecialElite",
    fontSize: 32,
  },
  number: {
    color: "#FDE4C5",
    fontFamily: "SpecialElite",
    fontSize: 16,
  },
});
