import { sharedStyle } from "@/constants/SharedStyle";
import { TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import TopNavBar from "@/components/TopNavBar";
import tw from "twrnc";
import { Text } from "@/components/CustomText";
import { COLORS } from "@/constants/Colors";
import OTPTextInput from "react-native-otp-textinput";
import { useEffect, useState } from "react";
import { router } from "expo-router";

export default function OtpPage() {
  const { t } = useTranslation("", { keyPrefix: "otpPage" });
  const [timeLeft, setTimeLeft] = useState(60);
  const [timeUp, setTimeUp] = useState(false);
  const [otpToken, setOtpToken] = useState<string | null>(null);

  useEffect(() => {
    const timer = startTimer();
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (otpToken?.length === 6) {
      router.navigate("./PinCodePage");
    }
  }, [otpToken]);

  const startTimer = () => {
    setTimeLeft(60);
    setTimeUp(true);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setTimeUp(false);
          return 60;
        }
        return prevTime - 1;
      });
    }, 1000);

    return timer;
  };
  const resend = async () => {
    startTimer();
  };

  return (
    <View style={sharedStyle.container}>
      <View style={sharedStyle.topSection}>
        <TopNavBar
          title={t("title")}
          description={t("description") + "\n082-XXX-8998"}
        />
        <View style={tw`mt-16 items-center`}>
          <OTPTextInput
            inputCount={6}
            containerStyle={tw`w-full`}
            textInputStyle={tw`border-b-2 text-center text-2xl`}
            tintColor={COLORS.green}
            handleTextChange={(text) => setOtpToken(text)}
            autoFocus
          />

          <Text style={tw`text-[${COLORS.gray}] mt-32`}>{t("notReceive")}</Text>
          {timeUp ? (
            <View style={tw`flex-row justify-center items-center gap-1`}>
              <Text style={tw`text-[${COLORS.green}]`}>{t("resend")}</Text>
              <Text style={tw`text-[${COLORS.green}]`}>({timeLeft})</Text>
            </View>
          ) : (
            <View style={tw`flex-row justify-center items-center`}>
              <TouchableOpacity onPress={resend} disabled={timeUp}>
                <Text style={tw`text-[${COLORS.green}]`}>{t("resend")}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
