import React, { useState, useContext, createContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  return (
    <AppContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
