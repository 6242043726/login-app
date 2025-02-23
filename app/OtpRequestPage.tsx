import { sharedStyle } from "@/constants/SharedStyle";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import TopNavBar from "@/components/TopNavBar";
import tw from "twrnc";
import OtpIcon from "@/assets/svg/OtpIcon";
import { Text } from "@/components/CustomText";
import { COLORS } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

export default function OtpRequestPage() {
  const { t } = useTranslation("", { keyPrefix: "otpRequestPage" });

  return (
    <View style={sharedStyle.container}>
      <View style={sharedStyle.topSection}>
        <TopNavBar />
        <View style={tw`flex-0.25`} />
        <View style={tw`items-center`}>
          <View style={tw`border border-dashed w-[82px] h-[82px] mt-16`}>
            <OtpIcon />
          </View>

          <Text
            style={[
              tw`text-xl text-[${COLORS.black}] mt-16`,
              sharedStyle.fontBold,
            ]}
          >
            {t("title")}
          </Text>

          <Text style={tw`text-xl text-[${COLORS.green}] mt-4`}>
            082-XXX-8998
          </Text>

          <View style={tw`w-full mt-16`}>
            <CustomButton
              onPress={() => {
                router.navigate("./OtpPage");
              }}
              title={t("request")}
            />
          </View>

          <Text style={tw`text-xs text-[${COLORS.gray}] mt-8`}>
            {t("remark")}
          </Text>
        </View>
      </View>
    </View>
  );
}
