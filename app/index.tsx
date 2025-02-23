import Header from "@/components/Header";
import { View } from "react-native";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { changeLanguage } from "@/config/language/i18n";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
export default function SelectLanguagePage() {
  const { t } = useTranslation("", { keyPrefix: "selectLanguagePage" });

  const handleChangeLang = (lang: string) => {
    return () => {
      changeLanguage(lang);
      router.navigate("./DisclaimerPage");
    };
  };
  return (
    <SafeAreaView
      style={tw`flex-1 items-center justify-center px-6 gap-24 pb-16`}
    >
      <Header title={t("title")} description={t("description")} />
      <View style={tw`gap-6 w-full`}>
        <CustomButton onPress={handleChangeLang("en")} title={"English"} />
        <CustomButton onPress={handleChangeLang("th")} title={"ไทย"} />
      </View>
    </SafeAreaView>
  );
}
