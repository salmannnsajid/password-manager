import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { View, Text, Modal } from "react-native";

export const DeleteConfirmationModal = ({
  loading,
  visible,
  onCancel,
  onDelete,
}) => {
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
            {loading ? (
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  backgroundColor: "grey",
                }}
              >
                <ActivityIndicator color="white" size="small" />
              </TouchableOpacity>
            ) : (
              <>
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
                  disabled={loading}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    alignItems: "center",
                    backgroundColor: loading ? "grey" : "red",
                  }}
                >
                  <Text style={{ color: "white" }}>Delete</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
