import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View, StyleProp, ViewStyle } from 'react-native';

interface DismissKeyboardWrapperProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const DismissKeyboardWrapper: React.FC<DismissKeyboardWrapperProps> = ({ children, style }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[{ flex: 1 }, style]}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboardWrapper;
