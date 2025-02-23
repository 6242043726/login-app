import { COLORS } from '@/constants/Colors';
import React from 'react';
import { Text as RNText, StyleSheet, TextProps } from 'react-native';

export const Text: React.FC<TextProps> = (props) => {
  return (
    <RNText style={[styles.defaultText, props.style]} onPress={props.onPress} suppressHighlighting>
      {props.children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    color: COLORS.black,
    fontFamily: 'SukhumvitSet',
  },
});
