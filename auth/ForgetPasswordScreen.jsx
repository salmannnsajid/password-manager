import React, { useState } from "react";
import { Input } from "react-native-elements";
import Toast from "react-native-toast-message";
import { useAppContext } from "../context/AppContext";
import { View, Text, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ForgetPasswordScreen = ({ navigation }) => {
  const { auth, setAuth } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    const emailData = await AsyncStorage.getItem("pass-manager-email");
    if (emailData !== null && JSON.parse(emailData) === email) {
      await AsyncStorage.setItem(
        "pass-manager-password",
        JSON.stringify(password)
      );
      setAuth({ ...auth, password });
      navigation.navigate("Login");
      Toast.show({
        type: "success",
        text1: "Password reset success",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "No account found",
      });
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
          placeholder="Enter New Password"
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
          onPress={handleResetPassword}
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
          <Text style={{ color: "white", fontSize: 16 }}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
