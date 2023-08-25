import React, { useLayoutEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import { View, Text, Image, TouchableOpacity } from "react-native";

export const AuthScreen = () => {
  const navigation = useNavigation();
  const { auth, setAuth } = useAppContext();

  const checkIsBiometric = async () => {
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (isBiometricAvailable && isEnrolled) {
      // Biometric authentication is available and user has enrolled.
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with your biometric",
      });
      if (result.success) {
        setAuth({ ...auth, isLoggedIn: true });
        navigation.navigate("Root");
      }
    } else {
      // Biometric authentication is not available or user is not enrolled.
    }
  };

  useLayoutEffect(() => {
    checkIsBiometric();
  }, [auth]);

  const handleLogin = () => {
    navigation.navigate("Login");
  };
  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

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
        onPress={handleLogin}
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
        <Text style={{ fontSize: 16 }}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSignUp}
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
