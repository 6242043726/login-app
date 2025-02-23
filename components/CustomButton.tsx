import { COLORS } from "@/constants/Colors";
import { sharedStyle } from "@/constants/SharedStyle";
import React from "react";
import { TouchableOpacity, GestureResponderEvent } from "react-native";
import { Text } from "./CustomText";
import tw from "twrnc";

type ButtonType = "first" | "second";

interface CustomButtonProps {
  type?: ButtonType | null;
  onPress: (event: GestureResponderEvent) => void;
  title: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  type = "first",
  onPress,
  title,
}) => {
  const buttonType = type ?? "first";

  const buttonStyles =
    buttonType === "first"
      ? tw`h-12 bg-[${COLORS.green}] justify-center items-center rounded-md`
      : tw`h-12 bg-transparent border border-[${COLORS.green}] justify-center items-center rounded-md`;

  const textStyles =
    buttonType === "first"
      ? tw`text-base text-white`
      : tw`text-base text-[${COLORS.green}]`;

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={[textStyles, sharedStyle.fontBold]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
