import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/CustomText";
import { BackHandler } from "react-native";
import { useEffect } from "react";

export default function HomePage() {
    
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center px-6`}>
      <Text>Home Page</Text>
    </SafeAreaView>
  );
}
