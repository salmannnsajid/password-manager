import React, { useState } from "react";
import uuid from "react-native-uuid";
import { useAppContext } from "../context/AppContext";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CryptoJS from "react-native-crypto-js";
import db from "@react-native-firebase/database";

export const CreateScreen = ({ navigation }) => {
  const { authData, setAuthData } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    account: "",
    password: "",
    details: "",
  });
  const [validation, setValidation] = useState({
    name: false,
    account: false,
    password: false,
  });

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setValidation((prevValidation) => ({
      ...prevValidation,
      [field]: value.trim() !== "",
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const uniqueId = uuid.v4();
    const secretKey = process.env.EXPO_PUBLIC_SECRET_KEY;

    let updatedData = [];
    let updatedLocalData = [];
    let encryptedFormData = {
      ...formData,
      name: CryptoJS.AES.encrypt(formData.name, secretKey).toString(),
      account: CryptoJS.AES.encrypt(formData.account, secretKey).toString(),
      password: CryptoJS.AES.encrypt(formData.password, secretKey).toString(),
    };

    if (authData?.records?.length) {
      updatedData = [
        ...authData.encryptedRecords,
        { ...encryptedFormData, id: uniqueId },
      ];
      updatedLocalData = [...authData.records, { ...formData, id: uniqueId }];
    } else {
      updatedData = [{ ...encryptedFormData, id: uniqueId }];
      updatedLocalData = [{ ...formData, id: uniqueId }];
    }
    db()
      .ref(`/users/${authData.uid}`)
      .update({ records: updatedData })
      .then(() => {
        setAuthData({
          ...authData,
          records: updatedLocalData,
          encryptedRecords: updatedData,
        });
        setFormData({ name: "", account: "", password: "", details: "" });
        navigation.navigate("Home");
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error adding new record:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={formData.name}
        placeholder="Enter name"
        onChangeText={(value) => handleChange("name", value)}
      />
      <Text style={styles.label}>Account:</Text>
      <TextInput
        style={styles.input}
        value={formData.account}
        placeholder="Enter account"
        onChangeText={(value) => handleChange("account", value)}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={formData.password}
        placeholder="Enter password"
        onChangeText={(value) => handleChange("password", value)}
      />
      <Text style={styles.label}>Detail:</Text>
      <TextInput
        multiline
        value={formData.details}
        style={styles.input}
        placeholder="Enter details"
        onChangeText={(value) => handleChange("details", value)}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
          backgroundColor:
            !validation.name ||
            !validation.account ||
            !validation.password ||
            isLoading
              ? "grey"
              : "#158CB6",
        }}
        disabled={
          !validation.name ||
          !validation.account ||
          !validation.password ||
          isLoading
        }
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text style={{ color: "white" }}>Create</Text>
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
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 4,
  },
});
