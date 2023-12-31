import React, { useEffect, useState } from "react";
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

export const EditScreen = ({ route, navigation }) => {
  const { item } = route.params;

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

  useEffect(() => {
    setFormData(item);
    setValidation({
      name: item.name ? true : false,
      account: item.account ? true : false,
      password: item.password ? true : false,
    });
  }, [route]);

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

    const updatedData = authData.records.map((it) => {
      if (it.id === item.id) {
        return { ...formData };
      }
      return item;
    });
    const updatedEncryptedData = authData.records.map((it) => {
      if (it.id === item.id) {
        return {
          ...formData,
          password: CryptoJS.AES.encrypt(
            formData.password,
            process.env.EXPO_PUBLIC_SECRET_KEY
          ).toString(),
        };
      }
      return item;
    });
    db()
      .ref(`/users/${authData.uid}`)
      .update({ records: updatedEncryptedData })
      .then(() => {
        setAuthData({ ...authData, records: updatedData });
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
          <Text style={{ color: "white" }}>Update</Text>
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
