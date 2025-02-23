import { COLORS } from "@/constants/Colors";
import { TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import CustomTextInput from "@/components/CustomTextInput";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { Text } from "@/components/CustomText";
import DismissKeyboardWrapper from "@/components/DismissKeyboardWrapper";

export default function LoginPage() {
  const { t } = useTranslation("", { keyPrefix: "loginPage" });

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const [isRememberMe, setIsRememberMe] = useState(false);

  const updateFormState = (field: string, value: any) =>
    setFormState((prev) => ({ ...prev, [field]: value }));

  const renderTextInputs = () => {
    return (
      <View style={tw`gap-8`}>
        <CustomTextInput
          placeholder={t("username")}
          value={formState.username}
          onChangeText={(text) => {
            updateFormState("username", text);
          }}
        />
        <CustomTextInput
          placeholder={t("password")}
          value={formState.password}
          onChangeText={(text) => {
            updateFormState("password", text);
          }}
          type="password"
        />
      </View>
    );
  };

  const renderButtonGroup = () => {
    return (
      <>
        <View style={tw`flex-row items-center justify-between mt-4`}>
          <View style={tw`flex-row items-center`}>
            <Checkbox
              style={tw`m-2 w-4 h-4`}
              value={isRememberMe}
              onValueChange={setIsRememberMe}
              color={isRememberMe ? COLORS.green : undefined}
            />
            <Text>{t("rememberMe")}</Text>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Text>{t("forgotPassword")}</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`mt-12`}>
          <CustomButton
            title={t("login")}
            onPress={() => {
              router.navigate("./OtpRequestPage");
            }}
          />
        </View>

        <View style={tw`flex-row items-center my-8`}>
          <View style={tw`flex-1 h-0.25 bg-[${COLORS.gray}]`} />
          <Text style={tw`text-base text-[${COLORS.gray}] mx-2`}>
            {t("noAccount")}
          </Text>
          <View style={tw`flex-1 h-0.25 bg-[${COLORS.gray}]`} />
        </View>

        <CustomButton
          title={t("openAccount")}
          onPress={() => {}}
          type={"second"}
        />
      </>
    );
  };

  return (
    <DismissKeyboardWrapper>
      <SafeAreaView style={tw`flex-1 px-6 items-center justify-center`}>
        <View style={tw`flex-0.25`} />
        <View style={tw`w-full`}>
          {renderTextInputs()}
          {renderButtonGroup()}
        </View>
      </SafeAreaView>
    </DismissKeyboardWrapper>
  );
}
