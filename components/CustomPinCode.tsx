import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { COLORS } from "@/constants/Colors";

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
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={styles.pinDotsContainer}>
            {Array.from({ length: maxPinLength }, (_, index) => (
              <View
                key={index}
                style={[
                  styles.pinDot,
                  { backgroundColor: pin[index] ? COLORS.green : "transparent", borderColor: pin[index] ? COLORS.green : COLORS.gray },
                ]}
              />
            ))}
          </View>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  pinDotsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
  },
  pinDot: {
    width: 14,
    height: 14,
    borderRadius: 10,
    borderWidth: 2,
  }
});

export default PincodeComponent;
