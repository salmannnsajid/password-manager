import React, { useState } from "react";
import uuid from "react-native-uuid";
import { useAppContext } from "../context/AppContext";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CreateScreen = ({ navigation }) => {
  const { globalState, setGlobalState } = useAppContext();

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
    const uniqueId = uuid.v4();
    try {
      let data = [...globalState, { ...formData, id: uniqueId }];
      setGlobalState([...data]);
      AsyncStorage.setItem("passwords-array", JSON.stringify(data));
    } catch (error) {
      console.log("Error storing data:", error);
    }
    setFormData({ name: "", account: "", password: "", details: "" });
    navigation.navigate("Home");
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
            !validation.name || !validation.account || !validation.password
              ? "grey"
              : "#158CB6",
        }}
        disabled={
          !validation.name || !validation.account || !validation.password
        }
      >
        <Text style={{ color: "white" }}>Create</Text>
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
