import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/CustomText";

export default function HomePage() {
  return (
    <SafeAreaView
      style={tw`flex-1 items-center justify-center px-6`}
    >
      <Text>Home Page</Text>
    </SafeAreaView>
  );
}
