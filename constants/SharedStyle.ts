import { StyleSheet } from "react-native";
export const sharedStyle = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  topSection: {
    flexGrow: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 24,
  },
  fontBold: {
    fontFamily: "SukhumvitSetBold",
  },
});
