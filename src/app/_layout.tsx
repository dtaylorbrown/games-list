import { colours } from "@/colours";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "HTML5 Games",
            headerStyle: { backgroundColor: colours.background },
            headerTintColor: colours.primary,
            headerTitleStyle: { color: colours.text, fontWeight: "700" },
            headerShadowVisible: false,
            contentStyle: { backgroundColor: colours.background },
          }}
        />
        <Stack.Screen
          name="game/[id]"
          options={{
            headerShown: false,
            animation: "fade",
            presentation: "fullScreenModal",
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
