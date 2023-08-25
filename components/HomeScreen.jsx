import React, { useState } from "react";
import { SearchBar } from "react-native-elements";
import { useAppContext } from "../context/AppContext";
import { DeleteConfirmationModal } from "./DeleteModal";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

export const HomeScreen = ({ navigation }) => {
  const { globalState, setGlobalState } = useAppContext();

  const [searchText, setSearchText] = useState("");
  const [selectedData, setSelectedData] = useState(undefined);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    try {
      let data = [...globalState];
      const updatedItems = data.filter((it) => it.id !== selectedData.id);

      setGlobalState([...updatedItems]);
      AsyncStorage.setItem("passwords-array", JSON.stringify(updatedItems));
      setModalVisible(false);
    } catch (error) {
      console.log("Error storing data:", error);
    }
  };

  const handleEdit = (item) => {
    navigation.navigate("Edit", { item });
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
          <TouchableOpacity onPress={() => handleEdit(item)}>
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

  if (globalState.length === 0) {
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
            data={globalState
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
        onDelete={handleDelete}
        visible={isModalVisible}
        onCancel={() => setModalVisible(false)}
      />
    </>
  );
};
