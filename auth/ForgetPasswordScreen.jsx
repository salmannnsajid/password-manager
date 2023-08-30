import React, { useState } from "react";
import { Input } from "react-native-elements";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { forgetPasswordError } from "../utils/helpers";

export const ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleForgetPassword = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
    } else {
      try {
        setLoading(true);
        await auth().sendPasswordResetEmail(email);
        Toast.show({
          type: "success",
          text1: "Please check your email",
        });
        setLoading(false);
        navigation.navigate("Login");
      } catch (error) {
        setLoading(false);
        let errorMessage = forgetPasswordError(error);
        Toast.show({
          type: "error",
          text1: errorMessage,
        });
      }
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
          onChangeText={(text) => {
            setEmail(text);
            setEmailError("");
          }}
        />

        <TouchableOpacity
          onPress={handleForgetPassword}
          disabled={!email || emailError !== "" || loading}
          style={{
            width: "95%",
            padding: 10,
            borderRadius: 4,
            alignSelf: "center",
            alignItems: "center",
            backgroundColor:
              !email || emailError !== "" || loading ? "grey" : "#158CB6",
          }}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={{ color: "white", fontSize: 16 }}>
              Request Reset Password
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "95%",
            padding: 10,
            borderRadius: 4,
            alignSelf: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            style={{
              color: "black",
              fontSize: 18,
              fontWeight: 600,
              color: "#158CB6",
            }}
          >
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
