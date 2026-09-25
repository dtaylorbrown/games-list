import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return(
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: "HTML5 Games" }} />
        <Stack.Screen
          name="game/[id]"
          options={{
            headerShown: false,
            animation: 'fade',
            presentation: 'fullScreenModal'
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
