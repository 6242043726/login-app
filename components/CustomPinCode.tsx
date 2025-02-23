import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  View,
} from "react-native";
import { Colors } from "@/constants/Colors";
import tw from "twrnc";

interface PincodeComponentProps {
  onKeyPress: (value: string) => void;
  onDelete: () => void;
  onForgotPin?: () => void;
}

const PincodeComponent = forwardRef<any, PincodeComponentProps>(
  ({ onKeyPress, onDelete, onForgotPin }, ref) => {
    const [pin, setPin] = useState<string>("");
    const maxPinLength: number = 6; 

    useImperativeHandle(ref, () => ({
      setValue: (newValue: string) => {
        if (newValue.length <= maxPinLength) {
          setPin(newValue);
        }
      },
    }));

    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <View style={tw`flex-1 items-center`}>
          <View style={tw`flex-row justify-between w-[40%]`}>
            {Array.from({ length: maxPinLength }, (_, index) => (
              <View
                key={index}
                style={[
                  tw`w-[14px] h-[14px] rounded-full border`,
                  { backgroundColor: pin[index] ? Colors.green : "transparent", borderColor: pin[index] ? Colors.green : Colors.gray },
                ]}
              />
            ))}
          </View>
        </View>
      </View>
    );
  }
);

export default PincodeComponent;
