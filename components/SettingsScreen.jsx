import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/FontAwesome";

export const SettingsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleSubmit = async () => {
    if (
      formData.oldPassword === "" ||
      formData.newPassword === "" ||
      formData.confirmPassword === ""
    ) {
      alert("Please fill in all fields.");
    } else if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match.");
    } else {
      try {
        setIsLoading(true);
        const user = auth().currentUser;
        const credential = auth.EmailAuthProvider.credential(
          user.email,
          formData.oldPassword
        );

        // Reauthenticate the user with their current password
        await user.reauthenticateWithCredential(credential);

        // Change the password
        await user.updatePassword(formData.newPassword);
        setIsLoading(false);
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        Toast.show({
          type: "success",
          text1: "Password Changed",
        });
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        let errorMessage = "";
        switch (error.code) {
          case "auth/wrong-password":
            errorMessage = "Invalid old password. Please try again.";
            break;
          case "auth/weak-password":
            errorMessage = "Password is weak choose a stronger password.";
            break;
          default:
            errorMessage = "An error occurred. Please try again later.";
            break;
        }
        Toast.show({
          type: "error",
          text1: errorMessage,
        });
      }
    }
  };

  const handleShowPassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !showPassword[field],
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Old Password:</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.input}
          value={formData.oldPassword}
          placeholder="Enter Old Password"
          secureTextEntry={!showPassword.oldPassword}
          onChangeText={(value) => handleChange("oldPassword", value)}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => handleShowPassword("oldPassword")}
        >
          <Icon
            name={showPassword.oldPassword ? "eye" : "eye-slash"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>New Password:</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.input}
          value={formData.newPassword}
          placeholder="Enter New Password"
          secureTextEntry={!showPassword.newPassword}
          onChangeText={(value) => handleChange("newPassword", value)}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => handleShowPassword("newPassword")}
        >
          <Icon
            name={showPassword.newPassword ? "eye" : "eye-slash"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Confirm Password:</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.input}
          value={formData.confirmPassword}
          placeholder="Enter Confirm Password"
          secureTextEntry={!showPassword.confirmPassword}
          onChangeText={(value) => handleChange("confirmPassword", value)}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => handleShowPassword("confirmPassword")}
        >
          <Icon
            name={showPassword.confirmPassword ? "eye" : "eye-slash"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
          backgroundColor: isLoading ? "grey" : "#158CB6",
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text style={{ color: "white" }}>Change Password</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f7f7",
    padding: 16,
    borderRadius: 8,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 4,
  },
  icon: {
    position: "absolute",
    right: 0,
  },
});
