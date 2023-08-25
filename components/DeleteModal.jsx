import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Modal, Button } from "react-native";

export const DeleteConfirmationModal = ({ visible, onCancel, onDelete }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
          <Text>Are you sure you want to delete?</Text>
          <View
            style={{
              gap: 10,
              marginTop: 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={onCancel}
              style={{
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
                backgroundColor: "grey",
              }}
            >
              <Text style={{ color: "white" }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onDelete}
              style={{
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
                backgroundColor: "red",
              }}
            >
              <Text style={{ color: "white" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
