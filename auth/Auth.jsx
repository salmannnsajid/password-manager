import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";

export const AuthScreen = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Image
        style={{
          width: 250,
          height: 250,
          resizeMode: "contain",
        }}
        source={require("../assets/logo-2.jpg")}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{
          padding: 10,
          width: "80%",
          marginTop: 20,
          borderWidth: 2,
          borderRadius: 4,
          alignItems: "center",
          borderColor: "#158CB6",
        }}
      >
        <Text style={{ fontSize: 16 }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("SignUp")}
        style={{
          padding: 10,
          width: "80%",
          marginTop: 10,
          borderRadius: 4,
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};
