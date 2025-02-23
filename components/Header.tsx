import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import { Text } from "./CustomText"
import { sharedStyle } from '@/constants/SharedStyle';

interface HeaderProps {
  title: string;
  description: string;
}

export const Header: React.FC<HeaderProps> = ({ title, description }) => {
  return (
    <View style={tw`bg-transparent w-full`}>
      <Text style={[tw`text-2xl`, sharedStyle.fontBold]} >{title}</Text>
      <Text style={tw`text-base`}>{description}</Text>
    </View>
  );
};

export default Header;
