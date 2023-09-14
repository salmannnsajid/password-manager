import React from "react";
import Spinner from "react-native-loading-spinner-overlay";

export const LoadingSpinner = ({ isLoading }) => {
  return <Spinner visible={isLoading} color="#158CB6" animation="fade" />;
};
