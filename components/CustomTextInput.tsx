import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Animated,
} from "react-native";
import { COLORS } from "@/constants/Colors";

interface CustomTextInputProps extends TextInputProps {
  type?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  type,
  value,
  placeholder,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const animatedLabelPosition = useRef(
    new Animated.Value(value ? 1 : 0)
  ).current;

  useEffect(() => {
    Animated.timing(animatedLabelPosition, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    top: animatedLabelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [12, 0],
    }),
    fontSize: animatedLabelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedLabelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.darkGray, COLORS.darkGray],
    }),
  };

  return (
      <View style={[styles.container]}>
        <View style={{ height: 24, width: 8 }}></View>

        <View style={styles.inputContainer}>
          <Animated.Text style={[styles.label, labelStyle]}>
            {placeholder}
          </Animated.Text>
          <TextInput
            {...props}
            value={value}
            style={styles.input}
            secureTextEntry={type === "password"}
            onFocus={(event) => {
              setIsFocused(true);
              onFocus && onFocus(event);
            }}
            onBlur={(event) => {
              setIsFocused(false);
              onBlur && onBlur(event);
            }}
            placeholder=""
            placeholderTextColor="transparent"
          />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
    height: 52,
    backgroundColor: "transparent",
  },
  inputContainer: {
    flex: 1,
    position: "relative",
  },
  label: {
    position: "absolute",
    left: 0,
    fontFamily: "SukhumvitSet",
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "SukhumvitSet",
    marginTop: 8,
    color: COLORS.darkGray,
    paddingBottom: 0
  },
});

export default CustomTextInput;
