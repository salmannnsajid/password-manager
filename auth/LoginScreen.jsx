import React, { useEffect, useState } from "react";
import { Input } from "react-native-elements";
import Toast from "react-native-toast-message";
import { useAppContext } from "../context/AppContext";
import { View, Text, Image, TouchableOpacity } from "react-native";

export const LoginScreen = ({ navigation }) => {
  const { auth, setAuth } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSignup = () => {
    navigation.navigate("SignUp");
  };

  const handleLogin = () => {
    if (email === auth.email && password === auth.password) {
      setAuth({ ...auth, isLoggedIn: true });
      navigation.navigate("Root");
    } else {
      Toast.show({
        type: "error",
        text1: "Incorrect email or password",
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
        <View>
          <Input
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
          <Text
            style={{ color: "#158CB6", marginTop: -25, marginLeft: 9 }}
            onPress={() => navigation.navigate("ForgetPassword")}
          >
            Forgot Password?
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          disabled={!email || !password}
          style={{
            width: "95%",
            padding: 10,
            marginTop: 20,
            borderRadius: 4,
            alignSelf: "center",
            alignItems: "center",
            backgroundColor: !email || !password ? "grey" : "#158CB6",
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Sign In</Text>
        </TouchableOpacity>
        <Text style={{ alignSelf: "center", marginTop: 10 }}>
          Don't have an account?
          <Text style={{ color: "#158CB6" }} onPress={handleSignup}>
            {" "}
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};
