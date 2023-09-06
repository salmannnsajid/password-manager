import React, { useEffect, useState } from "react";
import { SearchBar } from "react-native-elements";
import db from "@react-native-firebase/database";
import { useAppContext } from "../context/AppContext";
import { DeleteConfirmationModal } from "./DeleteModal";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useFetchUserRecords } from "../hooks/useFetchUserRecords";

export const HomeScreen = ({ navigation }) => {
  const { authData, setAuthData } = useAppContext();
  const isLoading = useFetchUserRecords(authData.uid);

  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedData, setSelectedData] = useState(undefined);

  const handleDelete = () => {
    try {
      let data = [...authData.records];
      const updatedItems = data.filter((it) => it.id !== selectedData.id);
      setDeleteLoading(true);
      db()
        .ref(`/users/${authData.uid}`)
        .update({ records: updatedItems })
        .then(() => {
          setAuthData({ ...authData, records: updatedItems });
          setModalVisible(false);
          setDeleteLoading(false);
        })
        .catch((error) => {
          setDeleteLoading(false);
          setModalVisible(false);
          console.error("Error adding new record:", error);
        });
    } catch (error) {
      console.log("Error storing data:", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Detail", { item })}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 7,
          padding: 15,
          marginVertical: 8,
          backgroundColor: "#158CB6",
        }}
      >
        <View>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
            {item.name}
          </Text>
          <Text style={{ fontSize: 14, color: "white" }}>{item.account}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Edit", { item })}
          >
            <Icon
              name="edit"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedData(item);
              setModalVisible(true);
            }}
          >
            <Icon name="delete" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#158CB6" />
        <Text>Fetching Data</Text>
      </View>
    );
  }
  if (!authData?.records?.length && !isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No items exist</Text>
      </View>
    );
  }

  return (
    <>
      <SearchBar
        round
        lightTheme
        showCancel
        value={searchText}
        placeholder="Search..."
        onChangeText={(value) => setSearchText(value)}
        containerStyle={{
          borderTopWidth: 0,
          borderBottomWidth: 0,
          backgroundColor: "transparent",
        }}
        inputContainerStyle={{
          backgroundColor: "white",
        }}
      />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            flex: 1,
            width: "100%",
            marginTop: 20,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <FlatList
            data={authData?.records
              .filter(
                (item) =>
                  item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                  item.account.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((item) => item)}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      <DeleteConfirmationModal
        loading={deleteLoading}
        onDelete={handleDelete}
        visible={isModalVisible}
        onCancel={() => setModalVisible(false)}
      />
    </>
  );
};
