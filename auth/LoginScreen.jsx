import React, { useEffect, useState } from "react";
import { Input } from "react-native-elements";
import Toast from "react-native-toast-message";
import auth from "@react-native-firebase/auth";
import { useAppContext } from "../context/AppContext";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { emailRegex } from "../utils/helpers";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsBiometricAvailable } from "../hooks/useIsBiometricAvailable";

export const LoginScreen = ({ navigation }) => {
  const { setAuthData } = useAppContext();
  const allowFingerprint = useIsBiometricAvailable();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginDataAvailable, setLoginDataAvailable] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const emailData = await AsyncStorage.getItem("pass-manager-email");
        const passwordData = await AsyncStorage.getItem(
          "pass-manager-password"
        );

        if (emailData !== null && passwordData !== null) {
          setEmail(JSON.parse(emailData));
          setPassword(JSON.parse(passwordData));
          setLoginDataAvailable({
            email: JSON.parse(emailData),
            password: JSON.parse(passwordData),
          });
        }
      } catch (error) {
        console.log("Error retrieving data:", error);
      }
    };

    getData();
  }, []);

  const handleLogin = async () => {
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return;
    }
    try {
      setIsLoading(true);
      const response = await auth().signInWithEmailAndPassword(email, password);
      if (!response.user.emailVerified) {
        Toast.show({
          type: "error",
          text1: "Please verify your email first",
        });
        setIsLoading(false);
        return;
      }
      await AsyncStorage.setItem("pass-manager-email", JSON.stringify(email));
      await AsyncStorage.setItem(
        "pass-manager-password",
        JSON.stringify(password)
      );

      setAuthData({
        uid: response.user.uid,
        email: response.user.email,
        records: [],
      });
      navigation.navigate("Root");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      let errMessage = "Oops, please check your form and try again";

      if (error.code === "auth/wrong-password") {
        errMessage = "Wrong password.";
      } else if (error.code === "auth/user-not-found") {
        errMessage = "User not found.";
      }
      Toast.show({
        type: "error",
        text1: errMessage,
      });
      setIsLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    const { success, error } = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with your biometric",
    });
    if (success) {
      setIsLoading(true);
      const response = await auth().signInWithEmailAndPassword(
        isLoginDataAvailable.email,
        isLoginDataAvailable.password
      );
      setAuthData({
        uid: response.user.uid,
        email: response.user.email,
        records: [],
      });
      navigation.navigate("Root");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      console.error("Authentication failed:", error);
    }
  };

  useEffect(() => {
    if (allowFingerprint && isLoginDataAvailable) {
      handleBiometricLogin();
    }
  }, [allowFingerprint, isLoginDataAvailable]);

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
          disabled={!email || !password || isLoading || emailError !== ""}
          style={{
            width: "95%",
            padding: 10,
            marginTop: 20,
            borderRadius: 4,
            alignSelf: "center",
            alignItems: "center",
            backgroundColor:
              !email || !password || isLoading || emailError !== ""
                ? "grey"
                : "#158CB6",
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={{ color: "white", fontSize: 16 }}>Login</Text>
          )}
        </TouchableOpacity>
        <Text style={{ alignSelf: "center", marginTop: 10 }}>
          Don't have an account?
          <Text
            style={{ color: "#158CB6" }}
            onPress={() => navigation.navigate("SignUp")}
          >
            {" "}
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};
