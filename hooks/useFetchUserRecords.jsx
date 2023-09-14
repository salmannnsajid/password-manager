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

        let recordsData = snapshot.val().records || [];
        let decryptedRecordsArray = [];
        if (recordsData.length) {
          decryptedRecordsArray = recordsData.map((item) => {
            return {
              ...item,
              name: CryptoJS.AES.decrypt(item.name, secretKey).toString(
                CryptoJS.enc.Utf8
              ),
              account: CryptoJS.AES.decrypt(item.account, secretKey).toString(
                CryptoJS.enc.Utf8
              ),
              password: CryptoJS.AES.decrypt(item.password, secretKey).toString(
                CryptoJS.enc.Utf8
              ),
            };
          });
        }

        setAuthData({
          ...authData,
          encryptedRecords: recordsData,
          records: decryptedRecordsArray,
        });
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
