import { COLORS } from "@/constants/Colors";
import { sharedStyle } from "@/constants/SharedStyle";
import { View } from "react-native";
import tw from "twrnc";
import CustomButton from "@/components/CustomButton";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import TopNavBar from "@/components/TopNavBar";
import DisclaimerIcon from "@/assets/svg/DisclaimerIcon";
import { Text } from "@/components/CustomText";

const Line = () => {
  return <View style={tw`h-0.25 bg-gray-300 my-2`}></View>;
};

export default function DisclaimerPage() {
  const { t } = useTranslation("", { keyPrefix: "disclaimerPage" });

  const renderDisclaimer = () => {
    return (
      <View style={tw`bg-white rounded-t-2xl h-[70%] shadow-2xl p-6`}>
        <View style={tw`flex-row gap-4`}>
          <View style={tw`border border-dashed w-[26px] h-[26px]`}>
            <DisclaimerIcon />
          </View>
          <Text
            style={[tw`text-2xl text-[${COLORS.black}]`, sharedStyle.fontBold]}
          >
            {t("title")}
          </Text>
        </View>
        <Line />
        <View style={tw`flex-grow`} />
        <View style={tw`justify-end flex-row gap-4`}>
          <View style={tw`flex-1`}>
            <CustomButton
              onPress={() => {
                router.back();
              }}
              title={t("reject")}
              type={"second"}
            />
          </View>
          <View style={tw`flex-1`}>
            <CustomButton
              onPress={() => {
                router.navigate("./LoginPage");
              }}
              title={t("accept")}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={sharedStyle.container}>
      <View style={sharedStyle.topSection}>
        <TopNavBar />
      </View>
      {renderDisclaimer()}
    </View>
  );
}
