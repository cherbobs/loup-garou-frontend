import React, { useState, useRef } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Animated,
  ViewToken,
} from "react-native";
import data from "../data/data-player-role";
import NumberPlayerRoleItem from "./NumberPlayerRoleItem";

type Props = {
  totalPlayers: number;
};
export default function NumberPlayerRole({ totalPlayers }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <NumberPlayerRoleItem item={item} totalPlayers={totalPlayers} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
