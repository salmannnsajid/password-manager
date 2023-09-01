import React, { useState } from "react";
import { Input } from "react-native-elements";
import Toast from "react-native-toast-message";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import auth from "@react-native-firebase/auth";
import db from "@react-native-firebase/database";
import { emailRegex } from "../utils/helpers";

export const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      if (response.user) {
        await db().ref(`/users/${response.user.uid}`).set({ email });
      }
      navigation.navigate("Login");
      Toast.show({
        type: "success",
        text1: "Signup success",
      });
    } catch (error) {
      console.log(error.message);
      let errMessage = "Oops, please check your form and try again";
      if (error.code === "auth/email-already-in-use") {
        errMessage = "Email already exists";
      } else if (error.code === "auth/invalid-email") {
        errMessage = "Invalid email format";
      } else if (error.code === "auth/weak-password") {
        errMessage = "Weak password";
      }
      Toast.show({
        type: "error",
        text1: errMessage,
      });
    } finally {
      setIsLoading(false);
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
            passwordError !== "" ||
            isLoading
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
              passwordError !== "" ||
              isLoading
                ? "grey"
                : "#158CB6",
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={{ color: "white", fontSize: 16 }}>Sign Up</Text>
          )}
        </TouchableOpacity>
        <Text style={{ alignSelf: "center", marginTop: 10 }}>
          Already have an account?
          <Text style={{ color: "#158CB6" }} onPress={handleLogin}>
            {" "}
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};
