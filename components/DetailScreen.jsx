import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const DetailScreen = ({ route }) => {
  const { item } = route.params;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.HeadingText}>{item.name}</Text>
      <Text style={styles.label}>Account:</Text>
      <Text style={styles.infoText}>{item.account}</Text>
      <Text style={styles.label}>Password:</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.infoTextPassword}>
          {showPassword ? item.password : "•".repeat(item.password.length)}
        </Text>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon
            size={20}
            color="gray"
            name={showPassword ? "eye" : "eye-slash"}
          />
        </TouchableOpacity>
      </View>

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
  HeadingText: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  infoTextPassword: {
    flex: 1,
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
});
