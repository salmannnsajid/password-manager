import React, { useState } from "react";
import { Input } from "react-native-elements";
import Toast from "react-native-toast-message";
import auth from "@react-native-firebase/auth";
import db from "@react-native-firebase/database";
import { useAppContext } from "../context/AppContext";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export const LoginScreen = ({ navigation }) => {
  const { setAuthData } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = () => {
    navigation.navigate("SignUp");
  };

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return;
    }
    try {
      setIsLoading(true);
      const response = await auth().signInWithEmailAndPassword(email, password);
      const userRef = db().ref(`users/${response.user.uid}`);

      const onDataChanged = (snapshot) => {
        if (snapshot.exists()) {
          setAuthData({
            uid: response.user.uid,
            email: response.user.email,
            records: snapshot.val()?.records || [],
          });
          navigation.navigate("Root");
          setIsLoading(false);
        }
      };

      userRef.on("value", onDataChanged);
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
          <Text style={{ color: "#158CB6" }} onPress={handleSignup}>
            {" "}
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};
