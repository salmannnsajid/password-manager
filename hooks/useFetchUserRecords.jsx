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
        const secretKey = process.env.EXPO_PUBLIC_SECRET_KEY;

        let decryptedRecordsArray = [];
        if (snapshot.val()?.records?.length) {
          decryptedRecordsArray = snapshot.val()?.records.map((item) => {
            return {
              ...item,
              name: CryptoJS.AES.encrypt(item.name, secretKey).toString(),
              account: CryptoJS.AES.encrypt(item.account, secretKey).toString(),
              password: CryptoJS.AES.encrypt(
                item.password,
                secretKey
              ).toString(),
            };
          });
        }
        setAuthData({ ...authData, records: decryptedRecordsArray });
        setIsLoading(false);
      } else {
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
