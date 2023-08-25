import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { Input } from "react-native-elements";
import { useAppContext } from "../context/AppContext";
import { View, Text, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SignUpScreen = ({ navigation }) => {
  const { auth, setAuth } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = () => {
    navigation.navigate("Login");
  };
  const handleSignup = async () => {
    await AsyncStorage.setItem("pass-manager-email", JSON.stringify(email));
    await AsyncStorage.setItem(
      "pass-manager-password",
      JSON.stringify(password)
    );
    setAuth({
      ...auth,
      email,
      password,
    });
    navigation.navigate("Login");
    Toast.show({
      type: "success",
      text1: "Signup success",
    });
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
          width: 150,
          height: 150,
          resizeMode: "contain",
        }}
        source={require("../assets/logo-2.jpg")}
      />
      <View style={{ width: "90%" }}>
        <Input
          placeholder="Email"
          value={email}
          autoCapitalize="none"
          errorMessage={emailError}
          keyboardType="email-address"
          onBlur={() => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
              setEmailError("Invalid email format");
            }
          }}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError("");
          }}
        />
        <Input
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        <Input
          placeholder="Confirm Password"
          value={confirmPassword}
          secureTextEntry
          errorMessage={passwordError}
          onChangeText={(text) => {
            if (password !== text) {
              setPasswordError("Password not matched");
            } else {
              setPasswordError("");
            }
            setConfirmPassword(text);
          }}
        />
        <TouchableOpacity
          onPress={handleSignup}
          disabled={
            !email ||
            !password ||
            !confirmPassword ||
            emailError !== "" ||
            passwordError !== ""
          }
          style={{
            width: "95%",
            padding: 10,
            borderRadius: 4,
            alignSelf: "center",
            alignItems: "center",
            backgroundColor:
              !email ||
              !password ||
              !confirmPassword ||
              emailError !== "" ||
              passwordError !== ""
                ? "grey"
                : "#158CB6",
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={{ alignSelf: "center", marginTop: 10 }}>
          Already have an account?
          <Text style={{ color: "#158CB6" }} onPress={handleLogin}>
            {" "}
            Sign In
          </Text>
        </Text>
      </View>
      {/* <Text
        style={{
          fontSize: 20,
          fontWeight: 500,
          color: "#158CB6",
          marginBottom: 10,
        }}
      >
        Setup your pin code
      </Text>
      <KeycodeInput
        numeric
        autoFocus
        tintColor="#158CB6"
        style={{ fontSize: 20, color: "#158CB6" }}
        onComplete={(value) => setPin(value)}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 500,
          color: "#158CB6",
          marginTop: 20,
        }}
      >
        Confirm Pin
      </Text>
      <KeycodeInput
        numeric
        tintColor="#158CB6"
        autoFocus={false}
        style={{ fontSize: 20, color: "#158CB6" }}
        onComplete={(value) => handlePinSetup(value)}
      /> */}
    </View>
  );
};
