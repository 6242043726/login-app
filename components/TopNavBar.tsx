import React from "react";
import { TouchableOpacity } from "react-native";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Header from "./Header";
import { router } from "expo-router";
interface TopNavBarProps {
  title?: string;
  description?: string;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({ title, description }) => {
  return (
    <SafeAreaView edges={["top"]}>
      <TouchableOpacity onPress={() => router.back()} style={tw`my-6`}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {title && description && (
        <Header title={title} description={description} />
      )}
    </SafeAreaView>
  );
};

export default TopNavBar;
