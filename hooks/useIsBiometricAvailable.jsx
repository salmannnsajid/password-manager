import { useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";

export const useIsBiometricAvailable = () => {
  const [allowFingerprint, setAllowFingerprint] = useState(false);

  const checkIsBiometric = async () => {
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (isBiometricAvailable && isEnrolled) {
      setAllowFingerprint(true);
    } else {
      setAllowFingerprint(false);
    }
  };

  useEffect(() => {
    checkIsBiometric();
  }, []);

  return allowFingerprint;
};
