import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const DetailScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.infoText}>{item.name}</Text>
      <Text style={styles.label}>Account:</Text>
      <Text style={styles.infoText}>{item.account}</Text>
      <Text style={styles.label}>Password:</Text>
      <Text style={styles.infoText}>{item.password}</Text>
      <Text style={styles.label}>Detail:</Text>
      <Text style={styles.infoText}>{item.details}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f7f7",
    padding: 16,
    borderRadius: 8,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
});
