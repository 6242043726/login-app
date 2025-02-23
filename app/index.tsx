import { Redirect } from "expo-router";

export default function Index() {
  const isFirst = true;

  if (isFirst) {
    return <Redirect href="/SelectLanguagePage" />;
  } else {
    return <Redirect href="/PinCodePage" />;
  }
}
