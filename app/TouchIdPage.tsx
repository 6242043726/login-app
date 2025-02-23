import Header from "@/components/Header";
import { TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { useTranslation } from "react-i18next";
import FingerPrintIcon from "@/assets/svg/FingerPrintIcon";
import { Text } from "@/components/CustomText";
import { router } from "expo-router";
import { pinMode } from "@/constants/Enum";

export default function TouchIdPage() {
  const { t } = useTranslation("", { keyPrefix: "touchIdPage" });

  const next = () => {
    router.navigate({
      pathname: "/PinCodePage",
      params: { type: pinMode.ENTER_PIN },
    });
  };

  return (
    <SafeAreaView style={tw`flex-1 items-center px-6 gap-48 pt-16`}>
      <Header title={t("title")} description={t("description")} />

      <View
        style={tw`bg-white rounded-full w-24 h-24 items-center justify-center shadow-md`}
      >
        <FingerPrintIcon />
      </View>

      <View style={tw`gap-6 w-full`}>
        <CustomButton onPress={next} title={t("setTouchId")} />
        <TouchableOpacity style={tw`items-center`} onPress={next}>
          <Text>{t("skip")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
