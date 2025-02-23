import { TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { router, useLocalSearchParams } from "expo-router";
import CustomPinKeyboard from "@/components/CustomPinKeyboard";
import CustomPinCode from "@/components/CustomPinCode";
import { useEffect, useRef, useState } from "react";
import { Text } from "@/components/CustomText";
import * as LocalAuthentication from "expo-local-authentication";
import { pinMode } from "@/constants/Enum";
import * as SecureStore from "expo-secure-store";

export default function PinCodePage() {
  //*states
  const [pin, setPin] = useState("");
  const [isConfirmPin, setIsConfirmPin] = useState<boolean>(false);
  const [setPinMode, setSetPinMode] = useState<boolean>(false);

  const [hasBiometric, setHasBiometric] = useState(false);
  const [biometricType, setBiometricType] = useState("");
  const [validPin, setValidPin] = useState("pin");

  //*utils
  const { t } = useTranslation("", { keyPrefix: "pinCodePage" });
  const { type } = useLocalSearchParams();
  const pinRef = useRef<any>(null);

  let pinText = "enterPin";

  if (setPinMode) {
    pinText = isConfirmPin ? "confirmPinHeader" : "setPinHeader";
  }

  const nextHome = () => {
    router.navigate("./HomePage");
  };

  //*effects
  useEffect(() => {
    if (type === pinMode.SET_Pin) {
      setSetPinMode(true);
    }

    const fetchPin = async () => {
      try {
        const value = await SecureStore.getItemAsync("pinValue");
        if (value) {
          setValidPin(value);
        }
      } catch (error) {
        console.error("Error fetching validPin", error);
      }
    };

    fetchPin();

    const checkForBiometric = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setHasBiometric(compatible);

      if (compatible) {
        const supportedTypes =
          await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (
          supportedTypes.includes(
            LocalAuthentication.AuthenticationType.FINGERPRINT
          )
        ) {
          setBiometricType("TouchID");
        } else if (
          supportedTypes.includes(
            LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
          )
        ) {
          setBiometricType("FaceID");
        }
      }
    };

    checkForBiometric();
  }, []);

  //*handlers
  const handleAuthentication = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Touch ID for “CGS Application”",
        fallbackLabel: "Use PinCode",
      });

      if (result.success) {
        nextHome();
      } else {
        console.log("authentication failed");
      }
    } catch (error) {
      console.log("Authentication error:", error);
    }
  };

  const handleKeyPress = (value: string) => {
    if (pinRef.current) {
      pinRef.current.setValue((prevValue: string) => {
        const newValue = prevValue.length < 6 ? prevValue + value : prevValue;
        if (setPinMode) {
          if (!isConfirmPin) {
            if (newValue.length === 6) {
              setTimeout(() => {
                setPin(newValue);
                setIsConfirmPin(true);
              }, 0);
              return "";
            }
          } else if (newValue === pin) {
            setTimeout(() => {
              setIsConfirmPin(false);
              console.log("pin is matched");
              SecureStore.setItemAsync("pinValue", newValue);
              router.navigate("./TouchIdPage");
            }, 0);
            return "";
          } else if (newValue.length < 6) {
            return newValue;
          } else {
            setTimeout(() => {
              console.log("error pin not match");
              setIsConfirmPin(false);
            }, 0);
            return "";
          }
        } else if (newValue.length === 6 && newValue === validPin) {
          setTimeout(() => {
            nextHome();
          }, 0);
        } else if (newValue.length < 6) {
          return newValue;
        } else {
          setTimeout(() => {
            console.log("error pin is wrong");
          }, 0);
          return "";
        }

        return newValue;
      });
    }
  };

  const handleDelete = () => {
    if (pinRef.current) {
      pinRef.current.setValue((prevValue: string) => prevValue.slice(0, -1));
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center px-6 pb-24`}>
      <View style={tw`flex-3`} />
      <Text style={tw`text-base mb-4`}>{t(pinText)}</Text>
      <CustomPinCode
        ref={pinRef}
        onKeyPress={handleKeyPress}
        onDelete={handleDelete}
      />
      <CustomPinKeyboard
        onKeyPress={handleKeyPress}
        onDelete={handleDelete}
        disable={setPinMode || !hasBiometric}
        bioType={!setPinMode ? biometricType : null}
        enableBio={handleAuthentication}
      />
      <TouchableOpacity onPress={() => {}}>
        <Text style={tw`text-base mt-4`}>{t("forgotPin")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
