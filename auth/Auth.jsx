import React, { useState, useLayoutEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import { View, Text, Image, TouchableOpacity } from "react-native";

export const AuthScreen = () => {
  const navigation = useNavigation();
  const { authData, setAuthData } = useAppContext();
  const [allowFingerPrint, setAllowFingerPrint] = useState(false);

  const checkIsBiometric = async () => {
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (isBiometricAvailable && isEnrolled) {
      setAllowFingerPrint(true);
    } else {
      setAllowFingerPrint(false);
    }
  };

  useLayoutEffect(() => {
    checkIsBiometric();
  }, [authData]);

  const handleLogin = () => {
    navigation.navigate("Login");
  };
  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleBiometricLogin = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with your biometric",
    });
    if (result.success) {
      setAuthData({ ...authData, isLoggedIn: true });
      navigation.navigate("Root");
    }
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
        <Text style={{ fontSize: 16 }}>Login</Text>
      </TouchableOpacity>
      {allowFingerPrint && authData?.email ? (
        <TouchableOpacity
          style={{
            padding: 10,
            width: "80%",
            marginTop: 10,
            borderWidth: 2,
            borderRadius: 4,
            alignItems: "center",
            borderColor: "#158CB6",
          }}
          onPress={handleBiometricLogin}
        >
          <Text style={{ fontSize: 16 }}>Biometric Login</Text>
        </TouchableOpacity>
      ) : (
        ""
      )}
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
