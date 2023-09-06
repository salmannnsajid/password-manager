import React from "react";
import auth from "@react-native-firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => navigation.navigate("Login"));
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
      <Ionicons name="log-out" size={24} color="white" />
    </TouchableOpacity>
  );
};
