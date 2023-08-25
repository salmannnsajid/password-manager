import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  useState,
  useContext,
  createContext,
  useLayoutEffect,
} from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState([]);
  const [auth, setAuth] = useState({
    email: "",
    password: "",
    isLoggedIn: false,
  });

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const emailData = await AsyncStorage.getItem("pass-manager-email");
        const passwordData = await AsyncStorage.getItem(
          "pass-manager-password"
        );

        const storedData = await AsyncStorage.getItem("passwords-array");
        if (storedData !== null) {
          let parsedData = JSON.parse(storedData);
          setGlobalState(parsedData);
        } else {
          AsyncStorage.setItem("passwords-array", JSON.stringify([]));
        }

        if (emailData !== null && passwordData !== null) {
          setAuth({
            ...auth,
            email: JSON.parse(emailData),
            password: JSON.parse(passwordData),
          });
        }
      } catch (error) {
        console.log("Error retrieving data:", error);
      }
    };

    getData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        auth,
        setAuth,
        globalState,
        setGlobalState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
