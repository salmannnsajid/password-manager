import React from "react";
import { Navigation } from "./routes";
import Toast from "react-native-toast-message";
import { AppProvider } from "./context/AppContext";
import { NavigationContainer } from "@react-navigation/native";

export default App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
      <Toast />
    </AppProvider>
  );
};
