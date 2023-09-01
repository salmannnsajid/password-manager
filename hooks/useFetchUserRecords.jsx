import { useEffect, useState } from "react";
import CryptoJS from "react-native-crypto-js";
import db from "@react-native-firebase/database";
import { useAppContext } from "../context/AppContext";

export const useFetchUserRecords = (userUid) => {
  const [isLoading, setIsLoading] = useState(false);
  const { authData, setAuthData } = useAppContext();

  useEffect(() => {
    const userRef = db().ref(`users/${userUid}`);
    setIsLoading(true);
    const onDataChanged = (snapshot) => {
      if (snapshot.exists()) {
        let decryptedRecordsArray = [];
        if (snapshot.val()?.records?.length) {
          decryptedRecordsArray = snapshot.val()?.records.map((item) => {
            return {
              ...item,
              password: CryptoJS.AES.decrypt(
                item.password,
                process.env.EXPO_PUBLIC_SECRET_KEY
              ).toString(CryptoJS.enc.Utf8),
            };
          });
        }
        setAuthData({ ...authData, records: decryptedRecordsArray });
        setIsLoading(false);
      }
    };

    userRef.on("value", onDataChanged);

    return () => {
      userRef.off("value", onDataChanged);
    };
  }, [userUid]);

  return isLoading;
};
