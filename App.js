import React, { useEffect } from "react";
import { Navigation } from "./routes";
import Toast from "react-native-toast-message";
import { AppProvider } from "./context/AppContext";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";

export default App = () => {
  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
  }, []);
  return (
    <AppProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
      <Toast />
    </AppProvider>
  );
};
